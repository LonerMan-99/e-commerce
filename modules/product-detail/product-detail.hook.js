import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'node_modules/next/router';
import { CartContext } from 'shared/contexts/cart.context';
import useLogin from 'modules/login/login.hook';
import { useToast } from '@chakra-ui/react';

const useProductDetail = () => {
  const router = useRouter();
  const productID = router.query.productDetail;
  const toast = useToast();
  const { user } = useLogin();
  const userData = user?.providerData[0];
  const [productDetail, setProductDetail] = useState({});
  const [reviewProduct, setReviewProduct] = useState([]);

  const [shippingProvince, setShippingProvince] = useState([]);
  const [shippingCity, setShippingCity] = useState([]);
  const [shippingCost, setShippingCost] = useState({});

  const [loading, setLoading] = useState(false);

  const { cartFlag, setUserCartFlag } = useContext(CartContext);

  const fetchProductDetail = async () => {
    const data = await fetch(`https://dummyjson.com/products/${productID}`);
    const response = await data.json();
    setProductDetail(response);
  };

  const handleButtonAddCart = async item => {
    try {
      const data = await fetch(`/api/cart/${user.uid}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          uuid: user.uid,
          ...item,
        }),
      });
      if (data.status === 418) {
        return toast({
          title: 'Already exist in your cart.',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 3000,
        });
      }
      return setUserCartFlag(!cartFlag);
    } catch (error) {}
  };

  const getReview = async () => {
    try {
      const getData = await fetch(`/api/review/${productID}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await getData.json();
      setReviewProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippingProvince = async () => {
    try {
      const data = await fetch(`/api/shipping/province`, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const response = await data.json();
      setShippingProvince(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippingCity = async provinceId => {
    try {
      const data = await fetch(`/api/shipping/city?provinceId=${provinceId}`, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const response = await data.json();
      setShippingCity(response);
    } catch (error) {}
  };

  const handleShippingCost = async values => {
    setLoading(true)
    try {
      const data = await fetch('/api/shipping/cost', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          origin: 152,
          destination: values.city,
          weight: 1700,
          courier: values.courier,
        }),
      });
      const response = await data.json();
      setShippingCost(response.rajaongkir);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getReview();
    handleShippingProvince();
    if (productID !== undefined) {
      fetchProductDetail();
    }
  }, [productID]);

  return {
    productDetail,
    handleButtonAddCart,
    reviewProduct,
    userData,
    getReview,
    shippingProvince,
    handleShippingCity,
    shippingCity,
    handleShippingCost,
    shippingCost,
    loading
  };
};

export default useProductDetail;
