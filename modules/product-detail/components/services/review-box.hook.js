import React, { useEffect } from 'react';

const useReviewBox = (userReviewUid, getReview) => {
  const deletedCartData = async productId => {
    try {
      await fetch(`/api/review/${productId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          userId: userReviewUid,
        }),
      });
      await getReview();
    } catch (error) {}
  };

  return { deletedCartData };
};

export default useReviewBox;
