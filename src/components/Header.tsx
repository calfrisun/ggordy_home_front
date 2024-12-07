import {IimageFrame} from '../types';

const Header = () => {
  //   const alt = props.alt || 'Image';
  return (
    <div class="header">
      <h1>GGordy Gallery</h1>
      <a href="/login">
        <img src="/assets/images/icon/icon_cat.svg" alt="cat" />
      </a>
    </div>
  );
};

export default Header;