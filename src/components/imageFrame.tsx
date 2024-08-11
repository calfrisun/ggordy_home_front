import {IimageFrame} from '../types';

const ImageFrame = (props: IimageFrame) => {
  const alt = props.alt || 'Image';
  return <img class="grid-item" src={props.src} alt={alt} />;
};

export default ImageFrame;
