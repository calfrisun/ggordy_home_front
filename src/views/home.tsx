import {Component} from 'solid-js';
import ImageFrame from '../components/imageFrame';

const imageSrc: string = './assets/images/ggordy.jpg';

const Home: Component = () => {
  return (
    <div>
      <h1>Home..</h1>
      <ImageFrame src={imageSrc}></ImageFrame>
    </div>
  );
};

export default Home;
