import {A} from '@solidjs/router';
import {style} from 'solid-js/web';

const FloatButton = () => {
  return (
    <a href="/upload" class="float-button">
      <img src="./assets/images/icon/paw.webp" alt="upload" />
    </a>
  );
};

export default FloatButton;
