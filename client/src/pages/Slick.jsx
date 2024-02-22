import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import one from '../assets/banner1.png';
import two from '../assets/banner2.png';
import three from '../assets/banner6.png';
import four from '../assets/banner4.png';
import five from '../assets/banner5.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const imageStyle = {
    width: '80%', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    margin: '0 auto', // Center the image horizontally
  };

  return (
    <div style={{ padding: '10px 20px' }}>
      <Slider {...settings}>
        <div style={slideStyle}>
          <img src={one} alt="Banner 1" style={imageStyle} />
        </div>
        <div style={slideStyle}>
          <img src={two} alt="Banner 2" style={imageStyle} />
        </div>
        <div style={slideStyle}>
          <img src={three} alt="Banner 3" style={imageStyle} />
        </div>
        <div style={slideStyle}>
          <img src={four} alt="Banner 4" style={imageStyle} />
        </div>
        <div style={slideStyle}>
          <img src={five} alt="Banner 5" style={imageStyle} />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
