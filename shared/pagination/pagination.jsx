import React, { useContext, useEffect } from 'react';
import { Skeleton, Flex } from '@chakra-ui/react';
import { ProductsContext } from 'shared/contexts/products.context';
import Buttons from 'shared/button/button';

const Pagination = ({ sumPages }) => {
  const { selectedPage, setSelectedPage } = useContext(ProductsContext);
  const select = e => {
    const selectNumber = Number(e.target.value);
    setSelectedPage(selectNumber);
  };

  const pages = () => {
    const data = [];
    for (let page = 1; page <= sumPages; page++) {
      data.push(
        <Buttons
          key={page}
          onClick={select}
          value={page}
          variant={selectedPage === page ? 'solid' : 'outline'}
          colorScheme="whatsapp">
          {page}
        </Buttons>,
      );
    }
    return data;
  };

  useEffect(() => {
    pages();
  }, []);

  return (
    <>
      <Flex gap={4} justifyContent="center">
        {pages()}
      </Flex>
    </>
  );
};

export default Pagination;
