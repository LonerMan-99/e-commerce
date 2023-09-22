import Image from 'node_modules/next/image';
import React, { useState, useEffect, useContext } from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import { CartContext } from 'shared/contexts/cart.context';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import useLogin from 'modules/login/login.hook';
import CartEmpty from 'public/images/cart-empty.jpg';

import Styles from './cart-popover.module.scss';
import Buttons from 'shared/button/button';
import Link from 'node_modules/next/link';

const CartPopover = () => {
  const { user } = useLogin();
  const { cartFlag, setUserCartLength } = useContext(CartContext);
  const [userCart, setUserCart] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);

  const fetchCartData = async () => {
    try {
      const getData = await fetch(`/api/cart/${user.uid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
      const data = await getData.json();
      setUserCart(data);
      setUserCartLength(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const deletedCartData = async productId => {
    try {
      await fetch(`/api/cart/${user.uid}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: productId,
        }),
      });
      await fetchCartData();
    } catch (error) {}
  };

  useEffect(() => {
    if (user !== null) {
      fetchCartData();
    }
  }, [cartFlag]);

  return (
    <>
      {userCart.length < 1 ? (
        <Box align="center" p="10px 0">
          <Image
            src={CartEmpty}
            alt="cart"
            objectFit="contain"
            width="220px"
            height="220px"
          />
          <Box>
            <Text as="b" fontSize="lg">
              Hey, your shopping cart is empty!
            </Text>
            <Text fontSize="sm" color="gray">
              Being idle is no fun. Let&apos;s fill it with your dream items!
            </Text>
          </Box>
        </Box>
      ) : (
        <>
          {userCart.slice(0, 5).map((item, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              borderRadius="5px"
              boxShadow="12.5px 10.8px 10px rgba(0, 0, 0, 0.015),
                         100px 86px 80px rgba(0, 0, 0, 0.03)"
              p="10px"
              mb="15px">
              <Flex gap={3}>
                <Image
                  src={item.thumbnail}
                  alt="product"
                  width="80px"
                  height="40px"
                  objectFit="contain"
                />
                <Box>
                  <Link href={`/product-detail/${item.id}`}>
                    <Text
                      cursor="pointer"
                      fontSize="sm"
                      as="b"
                      _hover={{ color: 'green.400' }}
                      className={`${Styles['Product-title']}`}>
                      {item.title}
                    </Text>
                  </Link>
                  <Flex alignItems="center" gap={1} mb={2}>
                    <FaStar color="#ffc107" />
                    <Text color="gray">
                      {JSON.stringify(item.rating).substring(0, 3)}
                    </Text>
                  </Flex>

                  <Buttons
                    colorScheme="red"
                    size="xs"
                    onClick={() => deletedCartData(item.id)}>
                    <FaTrashAlt />
                  </Buttons>
                </Box>
              </Flex>
              <Text as="b" color="orange.500">
                ${item.price * productQuantity}
              </Text>
            </Flex>
          ))}
        </>
      )}
    </>
  );
};

export default CartPopover;
