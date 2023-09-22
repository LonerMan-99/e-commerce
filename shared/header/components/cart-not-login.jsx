import React from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import Image from 'node_modules/next/image';

import CartEmpty from 'public/images/cart-empty.jpg';

const CartNotLogin = () => {
  return (
    <Box align="center" p="10px 0">
      <Image
        src={CartEmpty}
        alt="cart"
        objectFit="contain"
        width="220px"
        height="220px"
      />
      <Box>
        <div>Hey, you not login yet</div>
        <div>Please login first, so you can use this cart.</div>
      </Box>
    </Box>
  );
};

export default CartNotLogin;
