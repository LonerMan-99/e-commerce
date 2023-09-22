import React from 'react';
import { useRouter } from 'next/router';
import { Skeleton, Flex, Divider } from '@chakra-ui/react';
import CardProduct from 'shared/card/card';
import Pagination from 'shared/pagination/pagination';
import useProducts from './products.hook';

const Products = () => {
  const router = useRouter();
  const { handleButtonAddCart, isLoading, products, pages } = useProducts();

  return (
    <>
      <Flex wrap="wrap" shrink="shrink" gap={5}>
        {products?.map((item, index) => (
          <Skeleton key={index} isLoaded={!isLoading} fadeDuration={1}>
            <CardProduct
              data={item}
              btnBuy={() => router.push(`/product-detail/${item.id}`)}
              btnCart={() => handleButtonAddCart(item)}
            />
          </Skeleton>
        ))}
      </Flex>

      <Divider margin="30px auto" />
      <Pagination sumPages={pages} />
      <Divider margin="30px auto" />
    </>
  );
};

export default Products;
