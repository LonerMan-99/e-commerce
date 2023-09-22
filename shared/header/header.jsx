import React, { useContext } from 'react';
import Image from 'node_modules/next/image';
import Link from 'node_modules/next/link';
import {
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import useLogin from 'modules/login/login.hook';
import { CartContext } from 'shared/contexts/cart.context';

import { BsSearch, BsFillCartFill } from 'react-icons/bs';

import Buttons from 'shared/button/button';
import Logo from 'public/images/tokped.svg';
import styles from './header.module.scss';
import Modals from 'shared/modal/modal';
import Popovers from 'shared/popover/popover';
import AccountPopover from './components/account-popover';
import ModalAuth from './components/modal-auth';
import CartPopover from './components/cart-popover';

import useHeader from './services/header.hook';
import CartNotLogin from './components/cart-not-login';

const Header = () => {
  const { user } = useLogin();
  const { userCartLength } = useContext(CartContext);

  const { category, handleSelectedCategory, handleSearch } = useHeader();

  const userData = user?.reloadUserInfo;

  return (
    <>
      <div className={`${styles['header-container']}`}>
        <div className={`${styles['header-logo']}`}>
          <Image src={Logo} alt="logo" />
        </div>
        <div className={`${styles['header-select']}`}>
          <Select placeholder="Category" onChange={handleSelectedCategory}>
            {category.map((data, index) => (
              <option value={data} key={index}>
                {data}
              </option>
            ))}
          </Select>
        </div>

        <div className={`${styles['header-search']}`}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BsSearch color="gray.300" />
              </InputLeftElement>
              <Input
                focusBorderColor="green"
                placeholder="Search in Tokopedia"
              />
            </InputGroup>
          </form>
        </div>

        <Popovers
          title="Your cart"
          trigger={
            <div className={`${styles['header-cart']}`}>
              {!!user && userCartLength > 0 && (
                <div className={`${styles['header-cart-badge']}`}>
                  {userCartLength}
                </div>
              )}
              <Buttons variant="ghost">
                <BsFillCartFill color="gray.300" />
              </Buttons>
            </div>
          }
          footer={userCartLength > 5 && 'See more...'}>
          {user ? <CartPopover /> : <CartNotLogin />}
        </Popovers>

        <div className={`${styles['header-divider']}`} />

        {!user ? (
          <div className={`${styles['header-button-auth']}`}>
            <Modals
              title="Login"
              buttonText="Login"
              buttonVariant="outline"
              buttonColor="whatsapp">
              <ModalAuth />
            </Modals>

            <Link href="/registration" passHref>
              <a>
                <Buttons colorScheme="whatsapp" size="sm">
                  Register
                </Buttons>
              </a>
            </Link>
          </div>
        ) : (
          <Popovers
            title="Account"
            trigger={
              <Avatar
                cursor="pointer"
                size="sm"
                name={userData?.displayName}
                src={userData?.photoUrl}>
                <AvatarBadge
                  borderColor="papayawhip"
                  bg={userData.emailVerified ? 'green.500' : 'tomato'}
                  boxSize="1.25em"
                />
              </Avatar>
            }>
            <AccountPopover />
          </Popovers>
        )}
      </div>
    </>
  );
};

export default Header;
