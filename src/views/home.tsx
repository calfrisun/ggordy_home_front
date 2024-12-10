import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import {get} from 'firebase/database';
import {getFireDatabase} from '../utils/firebase.utils';
import {ref} from 'firebase/database';

const Home: Component = () => {
  const [imageList, setImageList] = createSignal<any[]>([]);

  const [sortType, setSortType] = createSignal<'TIME' | 'USER' | 'RANDOM'>(
    'TIME'
  );

  // 데이터베이스에서 포스트 정보 조회 함수
  const getPostFromDatabase = async (limit: number = 20) => {
    try {
      const db = await getFireDatabase();
      const postRef = ref(db, `post`);
      const snapshot = await get(postRef);

      if (snapshot.exists()) {
        const posts = snapshot.val();
        // 객체를 배열로 변환하고 최신순으로 정렬
        const postsArray = Object.entries(posts)
          .map(([key, value]) => ({id: key, ...(value as object)}))
          .sort((a: any, b: any) => {
            switch (sortType()) {
              case 'USER':
                return a.userEmail.localeCompare(b.userEmail);
              case 'RANDOM':
                return Math.random() - 0.5;
              case 'TIME':
              default:
                // uploadTime을 기준으로 내림차순 정렬
                return (
                  new Date(b.uploadTime).getTime() -
                  new Date(a.uploadTime).getTime()
                );
            }
          });

        console.log('포스트 조회 성공:', postsArray);
        setImageList(postsArray);
        return postsArray;
      } else {
        console.log('포스트가 없습니다');
        return null;
      }
    } catch (error) {
      console.error('포스트 조회 실패:', error);
      return null;
    }
  };

  const selectHandler = (e: Event) => {
    if (e.target instanceof HTMLSelectElement) {
      setSortType(e.target.value as 'TIME' | 'USER' | 'RANDOM');
      getPostFromDatabase();
    }
  };

  onMount(() => {
    getPostFromDatabase();
  });

  onCleanup(() => {
    // if (masonry) {
    // @ts-ignore
    // masonry.off('layoutComplete', eventHandler);
    // }
  });

  return (
    <div class="home">
      <div class="sort-container">
        <select value={sortType()} onChange={selectHandler}>
          <option value="TIME">최신순</option>
          <option value="USER">유저순</option>
          <option value="RANDOM">랜덤순</option>
        </select>
      </div>
      <div class="container">
        {imageList().length > 0 &&
          imageList().map(item => (
            <div class="item">
              <img
                src={
                  'https://static.ggordy.site/' + item.key + '.' + item.mimeType
                }
                alt="꼬디"
                loading="lazy"
                onLoad={async e => {
                  if (e.target instanceof HTMLImageElement) {
                    e.target.classList.add('loaded');
                  }
                }}
              />
            </div>
          ))}
      </div>
      {/* <FloatButton /> */}
    </div>
  );
};

export default Home;
