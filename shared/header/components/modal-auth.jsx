import React, { useState } from 'react';
import useLogin from 'modules/login/login.hook';
import { useFormik } from 'formik';
import {
  InputGroup,
  Input,
  InputRightElement,
  Link,
  Box,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';
import ErrorValidation from 'shared/error-validation/error-validation';
import { loginValidationSchema } from './modal-auth-validation.schema';

import Styles from './modal-auth.module.scss';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { BsDoorOpenFill } from 'react-icons/bs';

const ModalAuth = () => {
  const [show, setShow] = useState(false);

  const {
    handleLoginWithGoogle,
    isModalAuthShow,
    handleLoginWithEmailPassword,
  } = useLogin();

  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      handleLoginWithEmailPassword(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={`${Styles['Modal-auth-input']}`}>
          <Input
            focusBorderColor="green"
            borderColor={formik.errors.email ? 'red' : 'none'}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <ErrorValidation ErrorValidationMessage={formik.errors.email} />
        </div>

        <div className={`${Styles['Modal-auth-input']}`}>
          <InputGroup>
            <Input
              id="password"
              name="password"
              borderColor={formik.errors.password ? 'red' : 'none'}
              focusBorderColor="green"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <InputRightElement width="4.5rem">
              <Buttons h="1.75rem" onClick={handleClick} variant="ghost">
                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Buttons>
            </InputRightElement>
          </InputGroup>
          <ErrorValidation ErrorValidationMessage={formik.errors.password} />
        </div>

        <Buttons
          isLoading={isModalAuthShow}
          loadingText="loading.."
          mt={2}
          mb={4}
          rightIcon={<BsDoorOpenFill />}
          colorScheme="whatsapp"
          width="100%"
          type="submit">
          Login
        </Buttons>
      </form>

      <Box position="relative" padding="5">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          or login with
        </AbsoluteCenter>
      </Box>
      <Buttons
        mt={4}
        mb={6}
        leftIcon={<FcGoogle />}
        colorScheme="gray"
        width="100%"
        isLoading={isModalAuthShow}
        loadingText="loading.."
        onClick={handleLoginWithGoogle}>
        Google
      </Buttons>
      <div align="center">
        Need help?{' '}
        <Link color="green" href="#">
          Contact Tokopedia Care
        </Link>
      </div>
    </div>
  );
};

export default ModalAuth;
