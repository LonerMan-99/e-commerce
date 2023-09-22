import React, { useState } from 'react';
import Slider from 'react-slick';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Styles from './banner-carousel.module.scss';
import Banner1 from 'public/images/1.webp';
import Banner2 from 'public/images/2.webp';
import Image from 'node_modules/next/image';

const BannerCarousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [load, setLoad] = useState(false);

  const imageRendered = event => {
    setLoad(true);
  };

  return (
    <Skeleton
      isLoaded={load}
      fadeDuration={1}
      className={`${Styles['BannerCarousel-container']}`}>
      <Slider {...settings} className={`${Styles['BannerCarousel-container']}`}>
        <div className={`${Styles['BannerCarousel-content']}`}>
          <Image
            src={Banner1}
            alt="banner"
            onLoad={event => imageRendered(event)}
          />
        </div>
        <div className={`${Styles['BannerCarousel-content']}`}>
          <Image src={Banner2} alt="banner" />
        </div>
      </Slider>
    </Skeleton>
  );
};

export default BannerCarousel;
