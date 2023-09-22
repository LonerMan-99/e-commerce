import React from 'react';
import { VStack, Flex, Avatar, Text, Box,Divider } from '@chakra-ui/react';
import Rating from 'shared/rating/rating';
import Buttons from 'shared/button/button';
import useLogin from 'modules/login/login.hook';
import useReviewBox from './services/review-box.hook';
import ReviewForm from './review-form';

const ReviewBox = ({ reviewProduct, getReview }) => {
  const { user } = useLogin();
  const userReviewUid = user?.providerData[0]?.uid;
  const { deletedCartData } = useReviewBox(userReviewUid, getReview);
  return (
    <Box maxWidth='1000px' m='0 auto' mb={10}>
      <Text as="b" fontSize="xl">
        Product Review - <span style={{color:'gray', fontSize:'15px'}}>{`(${reviewProduct.length} Reviews)`}</span>
      </Text>
      <Divider mb={5}/>
      {reviewProduct.map((data, index) => (
        <VStack key={index} align="left" mb={5}>
          <Flex align="flex-start" gap={3}>
            <Avatar size="sm" name="User" src={data.userPhoto} mt={2} />
            <Box>
              <Rating rating={data.rating} size={15} isDisabled={true} />
              <Text as="b" fontSize="sm">
                {data.userEmail}
              </Text>
              <Text fontSize="xs" color="gray">
                {data.userName}
              </Text>

              <Text>{data.review}</Text>

              <Text color="gray" fontSize="xs">
                {data.createdAt}
              </Text>
              {userReviewUid === data.userId && (
                <Flex gap={3} mt={1}>
                  <ReviewForm buttonText="Edit" />
                  <Buttons
                    variant="link"
                    colorScheme="red"
                    size="sm"
                    onClick={() => deletedCartData(data?.productId)}>
                    Delete
                  </Buttons>
                </Flex>
              )}
            </Box>
          </Flex>
          <Divider mb={5}/>
        </VStack>
       
      ))}
    </Box>
  );
};

export default ReviewBox;
