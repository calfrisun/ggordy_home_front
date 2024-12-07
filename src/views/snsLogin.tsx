import {Component, onMount} from 'solid-js';
import {
  getAuth,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {getFirebaseApp} from '../utils/firebase.utils';

const SnsLogin: Component = () => {
  onMount(async () => {
    const app = await getFirebaseApp();
    const auth = getAuth(app);
    auth.languageCode = 'ko';

    // FirebaseUI 초기화 및 렌더링
    const ui = new firebaseui.auth.AuthUI(auth);
    // ui.start('#firebaseui-auth-container', uiConfig);

    ui.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      signInSuccessUrl: '/auth',
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          window.alert('로그인 성공');
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function (error) {
          window.alert('로그인 실패');
          console.error(error);
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          //   document.getElementById('loader').style.display = 'none';
        },
      },
      signInOptions: [
        {
          provider: ProviderId.GOOGLE,
          requireDisplayName: false,
        },
      ],
    });
  });

  return (
    <div class="center">
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SnsLogin;
