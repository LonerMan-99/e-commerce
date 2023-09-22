import React from 'react';
import { BsLinkedin, BsInstagram } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Flex,
  Stack,
  Box,
  Link,
  Tooltip,
  Divider,
} from '@chakra-ui/react';
import Image from 'node_modules/next/image';

import FooterImage from 'public/images/footer.png';
import Appstore from 'public/images/android.svg';
import Appgalery from 'public/images/huawei.svg';
import Iostore from 'public/images/ios.svg';

const Footer = () => {
  return (
    <Box background="#22c35e">
      <Flex p="70px 0" justify="space-between" m="0 auto" maxWidth="1200px">
        <Stack flexBasis="40%" spacing={10}>
          <Text as="b" fontSize="lg" color="white">
            This is not the actual Tokopedia online marketplace website, this is
            just a personal project based on the UI design of the Tokopedia
            website.
          </Text>
          <Stack>
            <Text as="b" color="white">
              Follow me
            </Text>
            <Flex gap={5}>
              <Tooltip
                label="Visit my linkedin"
                aria-label="A tooltip"
                hasArrow
                bg="green.600">
                <Link
                  href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                  isExternal>
                  <BsLinkedin color="white" size={30} />
                </Link>
              </Tooltip>
              <Tooltip
                label="Hey, look my instagram"
                aria-label="A tooltip"
                hasArrow
                bg="green.600">
                <Link
                  href="https://www.instagram.com/nugraha.wildan/"
                  isExternal>
                  <BsInstagram color="white" size={30} />
                </Link>
              </Tooltip>

              <Tooltip
                label="Send, me a email"
                aria-label="A tooltip"
                hasArrow
                bg="green.600">
                <Link href="mailto:wildan.wildan1212@gmail.com" isExternal>
                  <SiGmail color="white" size={30} />
                </Link>
              </Tooltip>
            </Flex>
          </Stack>
        </Stack>
        <Stack>
          <Image src={FooterImage} alt="footer" width="460px" height="223px" />
          <Flex m="10px auto" gap={4}>
            <Image src={Appstore} alt="footer" />
            <Image src={Appgalery} alt="footer" />
            <Image src={Iostore} alt="footer" />
          </Flex>
        </Stack>
      </Flex>
      <Divider />
      <Text align="center" color="white" p={3} fontWeight='bold'>
        © 2023, Muhamad Wildan Nugraha.
      </Text>
    </Box>
  );
};

export default Footer;
