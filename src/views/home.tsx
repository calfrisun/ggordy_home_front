import {Component} from 'solid-js';
import ImageFrame from '../components/imageFrame';
import ImageFrameList from '../components/ImageFrameList';

const imageSrc: string = './assets/images/ggordy.jpg';

const Home: Component = () => {
  const imageList = [
    {src: './assets/images/ggordy.jpg', alt: '꼬디'},
    {src: './assets/images/gg001.webp', alt: '꼬디'},
    {src: './assets/images/gg002.webp', alt: '꼬디'},
    {src: './assets/images/gg003.webp', alt: '꼬디'},
    {src: './assets/images/gg004.webp', alt: '꼬디'},
    {src: './assets/images/gg005.webp', alt: '꼬디'},
    {src: './assets/images/gg006.webp', alt: '꼬디'},
    {src: './assets/images/gg007.webp', alt: '꼬디'},
    {src: './assets/images/gg008.webp', alt: '꼬디'},
    {src: './assets/images/gg009.webp', alt: '꼬디'},
  ];
  return (
    <div class="home">
      <h1 class="title">Ggordy Gallery</h1>
      <ImageFrameList imageList={imageList}></ImageFrameList>
      {/* <ImageFrame src={imageSrc}></ImageFrame> */}
    </div>
  );
};

export default Home;
