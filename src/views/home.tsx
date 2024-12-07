import {Component, createEffect, onMount} from 'solid-js';
import ImageFrame from '../components/imageFrame';
import ImageFrameList from '../components/ImageFrameList';
const imageSrc: string = './assets/images/ggordy.jpg';
import Masonry from 'masonry-layout';

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

  let container!: HTMLDivElement;
  let masonry: Masonry | undefined;

  onMount(() => {
    setTimeout(() => {
      masonry = new Masonry(container, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',
        // columnWidth: 33.33,
        percentPosition: true,
        gutter: 10,
      });
    }, 10);
  });

  return (
    <div class="home">
      {/* <h1 class="title">Ggordy Gallery</h1> */}
      <div class="masonry-container" ref={container}>
        {imageList.map(item => (
          <div class="masonry-item">
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
