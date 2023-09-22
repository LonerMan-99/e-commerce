import React from 'react';
import { Stack, Text, Flex, Link } from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import Image from 'node_modules/next/image';

import SeoImage from 'public/images/SEOcontent.jpg';

const ShopRegistration = () => {
  return (
    <Flex justify="space-between" m="40px 0">
      <Stack>
        <Text as="b" fontSize="lg" color="orange.300">
          Have an Online Shop? Open branch at Tokopedia
        </Text>
        <Text fontSize="sm" color="gray.500" m="12px 0">
          Easy, convenient and commission-free transactions. <b>FREE!</b>
        </Text>
        <Flex align="center" gap={3}>
          <Buttons colorScheme="whatsapp">Create shop FREE</Buttons>
          <Link color="green.400" as="b">
            Learn more
          </Link>
        </Flex>
      </Stack>
      <Image src={SeoImage} alt="Shop" width="440px" height="126px" />
    </Flex>
  );
};

export default ShopRegistration;
