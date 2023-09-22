import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { RadioGroup, Radio, HStack, Box } from '@chakra-ui/react';

export default function Rating({ rating, setRating, count, size, isDisabled, isHover }) {
  const [hover, setHover] = useState(null);
  return (
    <HStack spacing={'2px'}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            onMouseEnter={() => isHover && setHover(ratingValue)}
            onMouseLeave={() => isHover && setHover(null)}>
            <Radio
              isDisabled={isDisabled}
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={rating}
              display="none"></Radio>
            <FaStar
              cursor={'pointer'}
              size={size || 20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}
