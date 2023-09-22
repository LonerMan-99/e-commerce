import { useEffect, useState, useContext } from 'react';
import { ProductsContext } from 'shared/contexts/products.context';
import { CartContext } from 'shared/contexts/cart.context';
import useLogin from 'modules/login/login.hook';
import { useToast } from '@chakra-ui/react';

const useProducts = () => {
  const toast = useToast();
  const { user } = useLogin();
  const { cartFlag, setUserCartFlag } = useContext(CartContext);
  const { productCategory, searchProduct, selectedPage } =
    useContext(ProductsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);

  const handlePagination = () => {
    switch (selectedPage) {
      case 1:
        return '0';
      case 2:
        return '20';
      case 3:
        return '40';
      case 4:
        return '60';
      case 5:
        return '80';
      default:
        return '0';
    }
  };

  const handleBaseUrl = () => {
    if (productCategory !== '') {
      return `${process.env.NEXT_PUBLIC_API_ENDPOINT_PRODUCT_CATEGORY}${productCategory}`;
    }

    if (searchProduct !== '') {
      return `${process.env.NEXT_PUBLIC_API_ENDPOINT_PRODUCT_SEARCH}?q=${searchProduct}`;
    }

    return `${
      process.env.NEXT_PUBLIC_API_ENDPOINT_PRODUCT_DEFAULT
    }?limit=20&skip=${handlePagination()}`;
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(handleBaseUrl());
      const response = await data.json();
      setProducts(response.products);
      const sumPage = response.total / response.limit;
      setPages(sumPage);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
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
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [productCategory, searchProduct, handlePagination()]);

  return {
    handleButtonAddCart,
    isLoading,
    products,
    pages,
  };
};

export default useProducts;
