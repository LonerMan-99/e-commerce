import { REVIEW_DATA } from './data/review-data';

const handler = async (req, res) => {
  const productId = req.query.review;

  const reviewProductFilter =
    REVIEW_DATA.length !== 0
      ? REVIEW_DATA.filter(
          value => Number(value.productId) === Number(productId),
        )
      : REVIEW_DATA;

  if (req.method === 'GET') {
    return res.status(200).json(reviewProductFilter);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const newData = {
      ...data,
    };

    const isUserAlreadyReviewProduct = reviewProductFilter.some(oldData => {
      if (oldData.id === newData.id && oldData.userId === newData.userId) {
        return true;
      }
      return false;
    });

    if (!isUserAlreadyReviewProduct) {
      REVIEW_DATA.unshift(newData);
      return res.status(200).json({ status: 200, message: 'SUCCESS' });
    }else{
      return res.status(418).json({ status: 418, message: 'User already review this product.' });
    }
  }

  if (req.method === 'DELETE') {
    const userId = req.body.userId;
    const index = reviewProductFilter.findIndex(
      value => value.userId === userId && value.id === productId,
    );
    REVIEW_DATA.splice(index, 1);

    return res.status(200).json({ status: 200, message: 'Deleted' });
  }
};

export default handler;
