import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const useReviewForm = (userData, getReview) => {
  const router = useRouter();
  const productID = router.query.productDetail;

  const toast = useToast();
  const { onClose, isOpen, onOpen } = useDisclosure();

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const postReview = async values => {
    setLoading(true);
    try {
      const data = await fetch(`/api/review/${productID}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          productId: productID,
          userId: userData.uid,
          userName: userData?.displayName,
          userEmail: userData?.email,
          userPhoto: userData?.photoURL,
          createdAt: new Date(),
          ...values,
        }),
      });

      if (data.status === 200) {
        await getReview();
        return toast({
          title: 'Success add review',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 3000,
        });
      }

      return toast({
        title: 'Already add review for this product.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
    } catch (error) {
    } finally {
      setRating(0);
      setLoading(false);
      onClose();
    }
  };

  return { postReview, onClose, isOpen, onOpen, rating, setRating, loading };
};

export default useReviewForm;
