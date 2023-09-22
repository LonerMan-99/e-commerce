import React, { useState } from 'react';
import Header from 'shared/header/header';

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Divider,
  Flex,
  Box,
} from '@chakra-ui/react';

import useProductDetail from 'modules/product-detail/product-detail.hook';

import Styles from 'modules/product-detail/product-detail.module.scss';

import Image from 'node_modules/next/image';
import Breadcrumbs from 'shared/breadcrumbs/breadcrumbs';
import Footer from 'shared/footer/footer';
import ProductCarouselThumb from 'modules/product-carousel/product-carousel-thumb';
import ReviewBox from 'modules/product-detail/components/review-box';
import ProductDetailBox from 'modules/product-detail/components/product-detail-box';
import ProductDetailCost from 'modules/product-detail/components/product-detail-cost';

const ProductDetail = () => {
  const {
    productDetail,
    reviewProduct,
    getReview,
    shippingProvince,
    handleShippingCity,
    shippingCity,
    handleShippingCost,
    shippingCost,
    loading,
  } = useProductDetail();

  const [isLoading, setIsLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imageRendered = imageRendered => {
    setIsLoading(true);
  };

  const BREADCRUMB_NAV = [
    {
      page: 'Home',
      href: '/',
    },
    {
      page: 'Product-detail',
      href: '#',
    },
    {
      page: productDetail.title,
      href: '#',
      last: true,
    },
  ];

  return (
    <>
      <Header />
      <div className={`${Styles['Product-detail']}`}>
        <Box mb={10} mt={5}>
          <Breadcrumbs breadcrumbItem={BREADCRUMB_NAV} />
        </Box>
        <Flex gap={10} mb={10}>
          <Skeleton
            isLoaded={isLoading}
            fadeDuration={1}
            height="348px"
            className={`${Styles['Product-detail-thumbnail']}`}>
            <Image
              src={productDetail.thumbnail}
              alt="thumbnail"
              width="348px"
              height="348px"
              objectFit="contain"
              onLoad={event => imageRendered(event)}
            />
          </Skeleton>

          {/* <ProductCarouselThumb images={productDetail.images} /> */}

          <ProductDetailBox
            productDetail={productDetail}
            shippingProvince={shippingProvince}
            handleShippingCity={handleShippingCity}
            shippingCity={shippingCity}
            handleShippingCost={handleShippingCost}
            shippingCost={shippingCost}
            loading={loading}
            reviewProduct={reviewProduct}
          />
          <Box className={`${Styles['Product-detail-cost']}`}>
            <ProductDetailCost getReview={getReview} />
          </Box>
        </Flex>

        <ReviewBox reviewProduct={reviewProduct} getReview={getReview} />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
