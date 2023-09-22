import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import useRecommendCaraousel from './services/recomendation-carousel.hook';
import { CATEGORY_IMAGE_MAPPER } from './constant/recomendation-carousel.constant';

import 'swiper/css';
import Styles from './recomendation-carousel.module.scss';

import { Flex } from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import Image from 'node_modules/next/image';

const RecommendationCarousel = () => {
  const { recommendCategory,selectRecomendationCategory } = useRecommendCaraousel();

  const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return (
      <Buttons
        onClick={() => swiper.slideNext()}
        className={`${Styles['btn-right']}`}>
        {children}
      </Buttons>
    );
  };
  const SwiperButtonPrev = ({ children }) => {
    const swiper = useSwiper();
    return (
      <Buttons
        onClick={() => swiper.slidePrev()}
        className={`${Styles['btn-left']}`}>
        {children}
      </Buttons>
    );
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop={true}
      spaceBetween={15}
      slidesPerView={4}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        400: {
          slidesPerView: 3,
        },
        639: {
          slidesPerView: 4,
        },
      }}
      className={`${Styles['Swipper-container']}`}>
      <Flex
        className={`${Styles['Swipper-container-buttons']}`}
        justify="space-between"
        align="center">
        <SwiperButtonPrev>
          <AiOutlineArrowLeft />
        </SwiperButtonPrev>
        <SwiperButtonNext>
          <AiOutlineArrowRight />
        </SwiperButtonNext>
      </Flex>

      {recommendCategory.map(
        (data, index) =>
          CATEGORY_IMAGE_MAPPER[data] !== undefined && (
            <SwiperSlide
              onClick={()=>selectRecomendationCategory(data)}
              className={`${Styles['Swipper-container-content']}`}
              key={index}>
              <Image
                src={CATEGORY_IMAGE_MAPPER[data]}
                alt="category"
                height="700px"
                objectFit="fill"
              />

              <div className={`${Styles['Swipper-container-content-label']}`}>
                {data}
              </div>
            </SwiperSlide>
          ),
      )}
    </Swiper>
  );
};

export default RecommendationCarousel;
