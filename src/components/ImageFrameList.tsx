import {For} from 'solid-js';
import ImageFrame from './imageFrame';
import {IimageFrame} from '../types';

const ImageFrameList = (props: {imageList: IimageFrame[]}) => {
  const imageList: IimageFrame[] = props.imageList;
  return (
    <div class="grid-container">
      <For each={imageList}>
        {(item, index) => {
          return <ImageFrame src={item.src} alt={item.alt}></ImageFrame>;
        }}
      </For>
    </div>
  );
};

export default ImageFrameList;
