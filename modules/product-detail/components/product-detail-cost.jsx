import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Divider,
  Flex,
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import ReviewForm from 'modules/product-detail/components/review-form';

import { FaPencilAlt, FaCartPlus } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import {
  BsCartCheckFill,
  BsFillChatDotsFill,
  BsShareFill,
} from 'react-icons/bs';

import useProductDetail from 'modules/product-detail/product-detail.hook';
import { convertUSDToRupiah } from 'shared/utils/usd-to-rupiah';
import { convertToCurrency } from 'shared/utils/number-to-currency';

const ProductDetailCost = ({ getReview }) => {
  const router = useRouter();
  const productID = router.query.productDetail;
  const currentURL = typeof window !== 'undefined' && window.location.href;
  const { productDetail, handleButtonAddCart, userData } =
    useProductDetail(productID);

  const [showInput, setShowInput] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Share this product.',
          url: currentURL,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } 
  };

  return (
    <Box
      border="1px solid #CACCCD"
      borderRadius="10px"
      p={4}
      width="300px"
      height="fit-content">
      <Text as="b" fontSize="lg">
        Set amount and notes
      </Text>
      <Flex align="center" gap={3} mt={3} mb={1}>
        <NumberInput
          width="120px"
          defaultValue={1}
          min={1}
          max={Number(productDetail.stock)}
          onChange={value => setQuantity(Number(value))}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text color="gray">
          Stock <b>{productDetail.stock}</b>
        </Text>
      </Flex>
      <Text fontSize="sm" color="gray">
        *Max buying {productDetail.stock}
      </Text>

      {showInput && (
        <Input
          placeholder="Example: white color, size M"
          mt={4}
          id="product-notes"
        />
      )}
      <Flex
        display="inline-flex"
        align="center"
        cursor="pointer"
        mt={!showInput ? 4 : 2}
        gap={1}
        color="green.500"
        onClick={() => setShowInput(!showInput)}>
        {!showInput ? <FaPencilAlt /> : <MdCancel />}
        <Text as="b" fontSize="sm">
          {!showInput ? 'Add notes' : 'Cancel notes'}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between" mt={4}>
        <Text color="gray">Subtotal</Text>
        <Text as="b" fontSize="lg">
          {convertToCurrency(
            convertUSDToRupiah(productDetail.price * quantity),
          )}
        </Text>
      </Flex>

      <Buttons
        leftIcon={<FaCartPlus />}
        colorScheme="whatsapp"
        size="sm"
        width="100%"
        mt={3}
        onClick={() => handleButtonAddCart(productDetail)}>
        Add cart
      </Buttons>

      <Buttons
        leftIcon={<BsCartCheckFill />}
        colorScheme="whatsapp"
        size="sm"
        width="100%"
        variant="outline"
        mt={3}>
        Buy
      </Buttons>
      <Flex mt={5} justify="space-around">
        <Flex align="center" gap={2}>
          <BsFillChatDotsFill color="#21c35e" />
          <ReviewForm
            buttonText="Review"
            getReview={getReview}
            userData={userData}
          />
        </Flex>

        <Flex align="center" gap={2} cursor="pointer">
          <BsShareFill color="#21c35e" />
          <Buttons
            variant="link"
            onClick={handleShare}
            fontSize="md"
            colorScheme="whatsapp">
            Share
          </Buttons>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductDetailCost;
