import {Component, createSignal} from 'solid-js';

import {onMount} from 'solid-js';
import {useNavigate} from '@solidjs/router';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {
  getFirebaseApp,
  getFireDatabase,
  getLoginUser,
} from '../utils/firebase.utils';
import {generateRandomFileName} from '../utils/common.utils';
import {getDatabase, ref, set} from 'firebase/database';
import moment from 'moment';
import {IUser} from '../types';

const Upload: Component = () => {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [previewUrl, setPreviewUrl] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');
  const [uploading, setUploading] = createSignal<boolean>(false);

  const navigate = useNavigate();
  let userInfo: IUser | null = null;

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError('PNG, JPEG, JPG, WEBP 형식의 이미지만 업로드 가능합니다.');
      input.value = '';
      setSelectedFile(null);
      setPreviewUrl('');
      return;
    }

    setError('');
    setSelectedFile(file);

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 업로드 버튼 클릭 시 실행
  const handleUpload = () => {
    if (!userInfo) {
      window.alert('회원이 아닙니다.');
      localStorage.removeItem('USER_INFO');
      navigate('/login');
      return;
    }

    if (uploading()) {
      window.alert('업로드중입니다.');
      return;
    }
    // 업로드중 표시
    setUploading(true);

    if (!selectedFile()) {
      setError('업로드할 이미지를 선택해주세요.');
      return;
    }
    // TODO: 파이어베이스 스토리지 업로드 로직 구현
    console.log('업로드 시작:', selectedFile());

    // 파일 업로드
    const uploadFile = async (file: File) => {
      try {
        const newFileName = generateRandomFileName(file.name);
        const now = moment();
        const formattedDate = now.format('YYMMDD');
        const formData = new FormData();
        formData.append('image', file, newFileName);
        formData.append('key', `${formattedDate}/image`);

        // TODO: API 엔드포인트 설정 필요
        const response = await fetch(
          'https://s3-mini.ggordy.site/api/file/upload',
          //   'http://localhost:3000/api/file/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          setUploading(false);
          throw new Error('업로드에 실패했습니다.');
        }

        const result = await response.json();
        console.log('업로드 성공:', result);

        if (userInfo) {
          const [path, extension] = result.key.split('.');
          uploadToDatabase(
            userInfo.userUuid,
            userInfo.userEmail,
            path,
            extension
          );
        } else {
          window.alert('회원이 아닙니다.');
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error('업로드 중 오류 발생:', error);
        setError('파일 업로드 중 오류가 발생했습니다.');
        setUploading(false);
      }
    };

    if (selectedFile()) {
      uploadFile(selectedFile()!);
    }
  };

  // 로그인 상태 확인 및 데이터베이스 업로드 함수
  const uploadToDatabase = async (
    userUuid: string,
    userEmail: string,
    key: string,
    mimeType: string
  ) => {
    try {
      const db = await getFireDatabase();
      const uploadTime = moment().format('YYYY-MM-DD HH:mm:ss');

      const uuid = crypto.randomUUID();
      await set(ref(db, `post/${uuid}`), {
        userUuid,
        userEmail,
        key,
        uploadTime,
        mimeType,
      });
      console.log('데이터베이스 업로드 성공');
      window.alert('업로드 성공');
      navigate('/');
    } catch (error) {
      console.error('데이터베이스 업로드 실패:', error);
      setError('데이터베이스 업로드 중 오류가 발생했습니다.');
    }
  };

  onMount(async () => {
    const user = localStorage.getItem('USER_INFO');
    if (!user) {
      navigate('/login');
      return;
    }
    const decodedUser = atob(user as string);
    const juser = decodeURIComponent(decodedUser);
    if (!juser && typeof juser !== 'string') {
      navigate('/login');
    }
    userInfo = JSON.parse(juser);
  });

  return (
    <div class="upload-container">
      {/* <h2>이미지 업로드</h2> */}

      <div class="upload-form">
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileSelect}
        />

        {error() && <p class="error-message">{error()}</p>}
        {uploading() && <p class="uploading-message">업로드중입니다.</p>}

        {previewUrl() && (
          <div class="preview-container">
            <img src={previewUrl()} alt="미리보기" />
          </div>
        )}

        <button onClick={handleUpload} disabled={!selectedFile()}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default Upload;
