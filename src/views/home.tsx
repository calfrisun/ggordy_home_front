import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import ImageFrame from '../components/imageFrame';
import ImageFrameList from '../components/ImageFrameList';
const imageSrc: string = './assets/images/ggordy.jpg';
import Masonry from 'masonry-layout';
import {get} from 'firebase/database';
import {getFireDatabase} from '../utils/firebase.utils';
import {ref} from 'firebase/database';
import {cachePlz} from '../utils/cache.utils';
import FloatButton from '../components/floatButton';

const Home: Component = () => {
  const [imageList, setImageList] = createSignal<any[]>([]);

  let container!: HTMLDivElement;
  let masonry: Masonry | undefined;
  const [masonryLoaded, setMasonryLoaded] = createSignal<boolean>(false);

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
          .sort((a: any, b: any) => b.uploadTime.localeCompare(a.uploadTime))
          .slice(0, limit); // limit 개수만큼 자르기

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

  const eventHandler = () => {
    setMasonryLoaded(true);
  };

  createEffect(() => {
    // console.log(imageList());
    if (imageList().length > 0) {
      cachePlz(imageList()).then(count => {
        masonry = new Masonry(container, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-item',
          percentPosition: true,
          gutter: 10,
        });
        // @ts-ignore
        masonry.on('layoutComplete', eventHandler);

        //@ts-ignore
        masonry!.layout();
      });
    }
  });

  onMount(() => {
    getPostFromDatabase();
  });

  onCleanup(() => {
    if (masonry) {
      // @ts-ignore
      masonry.off('layoutComplete', eventHandler);
    }
  });

  return (
    <div class="home">
      {/* <div class={masonryLoaded() ? '' : 'disappear'}>
        <div class="masonry-container" ref={container}>
          {imageList().length > 0 &&
            imageList().map(item => (
              <div class="masonry-item">
                <img
                  src={
                    'https://static.ggordy.site/' +
                    item.key +
                    '.' +
                    item.mimeType
                  }
                  alt="꼬디"
                />
              </div>
            ))}
        </div>
      </div> */}
      <div class="container">
        {imageList().length > 0 &&
          imageList().map(item => (
            <div class="item">
              <img
                src={
                  'https://static.ggordy.site/' + item.key + '.' + item.mimeType
                }
                alt="꼬디"
              />
            </div>
          ))}
      </div>
      {/* <FloatButton /> */}
    </div>
  );
};

export default Home;
