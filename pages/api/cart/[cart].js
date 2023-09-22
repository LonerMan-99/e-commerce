import { USER_CART_DATA } from 'pages/api/cart/data/cart-data';

const handler = async (req, res) => {
  const userId = req.query.cart;

  const userDataFilter =
    USER_CART_DATA.length !== 0
      ? USER_CART_DATA.filter(value => value.uuid === userId)
      : USER_CART_DATA;

  if (req.method === 'GET') {
    return res.status(200).json(userDataFilter);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const newData = {
      ...data,
    };

    const isDataExisting = userDataFilter.some(oldData => {
      if (oldData.id === newData.id) {
        return true;
      }
      return false;
    });

    if (!isDataExisting) {
      USER_CART_DATA.unshift(newData);
      return res.status(200).json({ status: 200, message: 'Success' });
    } else {
      return res.status(418).json({ status: 418, message: 'Product is exist' });
    }
  }

  if (req.method === 'DELETE') {
    const id = req.body.id;
    const index = userDataFilter.findIndex(
      value => value.id === id && value.uuid === userId,
    );
    USER_CART_DATA.splice(index, 1);

    return res.status(200).json({ status: 200, message: 'Deleted' });
  }
};

export default handler;
