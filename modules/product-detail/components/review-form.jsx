import React, { useState } from 'react';
import { useFormik } from 'formik';

import {
  Textarea,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import Rating from 'shared/rating/rating';
import useReviewForm from './services/review-form.hook';

const ReviewForm = ({ buttonText, getReview, userData }) => {
  const { postReview, onClose, isOpen, onOpen, rating, setRating, loading } =
    useReviewForm(userData, getReview);

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: '',
    },
    onSubmit: values => {
      postReview(values);
    },
  });

  return (
    <>
      <Buttons variant="link" size="md" colorScheme="whatsapp" onClick={onOpen}>
        {buttonText}
      </Buttons>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Box mb={4}>
                <label
                  htmlFor="rating"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: 'gray',
                  }}>
                  Rating
                </label>
                <Rating rating={rating} setRating={setRating} isHover={true} />
              </Box>

              <label
                htmlFor="review"
                style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
                Product Review
              </label>
              <Textarea
                placeholder="Add product review here."
                id="review"
                name="review"
                onChange={formik.handleChange}
                mb={5}
              />
              <Buttons
                isLoading={loading}
                isDisabled={formik.values.review === ''}
                mb={5}
                size="md"
                colorScheme="whatsapp"
                type="submit"
                width="100%"
                onClick={() => formik.setFieldValue('rating', rating)}>
                Add review
              </Buttons>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewForm;
