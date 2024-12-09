import {Component, onMount} from 'solid-js';
import {getLoginUser} from '../utils/firebase.utils';
import {useNavigate} from '@solidjs/router';

const Auth: Component = () => {
  console.log('auth');
  const navigate = useNavigate();

  onMount(async () => {
    const user = await getLoginUser();
    console.log('user', user);
    if (!user) {
      navigate('/login');
    }
    const juser = JSON.stringify(user);
    console.log('juser', juser);
    const enjuser = encodeURIComponent(juser);
    const encodedUser = btoa(enjuser);
    localStorage.setItem('USER_INFO', encodedUser);
    navigate('/');

    // btoa()는 Latin1 범위 밖의 문자를 처리할 수 없으므로
    // encodeURIComponent로 먼저 인코딩
    // const encodedUser = atob(encodeURIComponent(JSON.stringify(user)));
    // const decodedUser = decodeURIComponent(atob(encodedUser));
    // console.log('decoded user:', decodedUser);
    // localStorage.setItem('USER_INFO', btoa(JSON.stringify(user)));
  });
  return <div>Auth</div>;
};

export default Auth;
