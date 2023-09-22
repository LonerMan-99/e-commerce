import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { useState } from 'react';

import Styles from './product-carousel-thumb.module.scss';
import Image from 'node_modules/next/image';

const ProductCarouselThumb = ({ images = [] }) => {
  console.log(images);
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
        >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="product images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        >
        {images.map((item, index) => (
          <SwiperSlide key={index} >
            <div
              className={`${Styles['product-images-slider-thumbs-wrapper']}`}>
              <img src={item} alt="product images"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarouselThumb;
