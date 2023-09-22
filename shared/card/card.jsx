import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Image,
  Badge,
  Flex,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import ModalAuth from 'shared/header/components/modal-auth';
import Modals from 'shared/modal/modal';
import useLogin from 'modules/login/login.hook';
import { convertUSDToRupiah } from 'shared/utils/usd-to-rupiah';
import Styles from './card.module.scss';
import { convertToCurrency } from 'shared/utils/number-to-currency';

const CardProduct = ({ data, btnBuy, btnCart }) => {
  const { user } = useLogin();

  return (
    <Card maxW="3xs">
      <CardBody>
        <Image
          src={data.thumbnail}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          height="120px"
          margin="0 auto"
        />
        <Stack mt="6" spacing="3">
          <Badge colorScheme="green" width="fit-content" fontSize={11}>
            {data.category}
          </Badge>
          <Heading size="sm" className={`${Styles['Card-title']}`}>
            {data.title}
          </Heading>
          <Text fontSize="sm" className={`${Styles['Card-description']}`}>
            {data.description}
          </Text>
          <Text color="dark" fontSize="lg" as="b">
            {convertToCurrency(convertUSDToRupiah(data.price))}
          </Text>
          <Flex alignItems="center" gap={2} fontSize="sm">
            <Flex alignItems="center" gap={1}>
              <FaStar color="#ffc107" />
              <Text color="gray">
                {JSON.stringify(data.rating).substring(0, 3)}
              </Text>
            </Flex>
            <Divider orientation="vertical" colorScheme="gray" />
            <Text color="gray">
              Stock <b>{data.stock}</b>
            </Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {!user ? (
            <>
              <Modals
                title="Please login first."
                buttonText="Buy now"
                buttonVariant="solid"
                buttonColor="whatsapp">
                <ModalAuth />
              </Modals>
              <Modals
                title="Please login first."
                buttonText="Add to cart"
                buttonVariant="ghost"
                buttonColor="whatsapp">
                <ModalAuth />
              </Modals>
            </>
          ) : (
            <>
              <Buttons
                variant="solid"
                colorScheme="whatsapp"
                size="sm"
                onClick={btnBuy}>
                Buy now
              </Buttons>
              <Buttons
                variant="ghost"
                colorScheme="whatsapp"
                size="sm"
                onClick={btnCart}>
                Add to cart
              </Buttons>
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
