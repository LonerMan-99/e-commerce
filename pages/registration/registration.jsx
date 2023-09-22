import React, { useState } from 'react';
import Image from 'node_modules/next/image';
import { useFormik } from 'formik';
import useRegistration from 'modules/registration/registration.hook';
import {
  Card,
  IconButton,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Flex,
} from '@chakra-ui/react';
import Modals from 'shared/modal/modal';
import ModalAuth from 'shared/header/components/modal-auth';

import { registrationValidationSchema } from 'modules/registration/registration-validation.schema';
import Buttons from 'shared/button/button';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';

import Styles from 'modules/registration/registration.module.scss';
import Logo from 'public/images/tokped.svg';
import Tokped from 'public/images/register_new.png';
import ErrorValidation from 'shared/error-validation/error-validation';

const Registration = () => {
  const { handleNewRegisterUser, isLoading } = useRegistration();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationValidationSchema,
    onSubmit: values => {
      handleNewRegisterUser(values);
    },
  });

  return (
    <div className={`${Styles['Regist-container']}`}>
      <Link href="/" w="30px">
        <Image src={Logo} alt="logo" />
      </Link>

      <div className={`${Styles['Regist-content']}`}>
        <div className={`${Styles['Regist-mascot']}`}>
          <Image src={Tokped} alt="logo" />
          <div className={`${Styles['Regist-text']}`}>
            <Text as="b" fontSize="xl">
              Discover Millions of Trusted Shops
            </Text>
            <Text fontSize="md" mt={3}>
              Join and enjoy the best online shopping experience
            </Text>
          </div>
        </div>
        <Card w="400px" p="24px 20px">
          <Link href="/" w="30px">
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<FaArrowLeft />}
            />
          </Link>
          <Text as="b" align="center" fontSize="2xl">
            Sign Up Now
          </Text>

          <Flex justify="center" gap="1">
            <Text align="center">Already have a Tokopedia account? {''}</Text>
            <Modals
              title="Login"
              buttonText="Log In"
              buttonVariant="link"
              buttonColor="green">
              <ModalAuth />
            </Modals>
          </Flex>

          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <div className={`${Styles['Regist-input']}`}>
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
              <label htmlFor="Password">Password</label>
              <div className={`${Styles['Regist-input']}`}>
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
                <ErrorValidation
                  ErrorValidationMessage={formik.errors.password}
                />
              </div>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`${Styles['Regist-input']}`}>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    borderColor={formik.errors.confirmPassword ? 'red' : 'none'}
                    focusBorderColor="green"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter confirm password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Buttons h="1.75rem" onClick={handleClick} variant="ghost">
                      {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Buttons>
                  </InputRightElement>
                </InputGroup>
                <ErrorValidation
                  ErrorValidationMessage={formik.errors.confirmPassword}
                />
              </div>

              <Buttons
                mt={4}
                type="submit"
                width="100%"
                colorScheme="whatsapp"
                isLoading={isLoading}
                loadingText="loading..">
                Register
              </Buttons>
            </form>
            <Text fontSize="sm" mt={5}>
              By signing up, I agree to{' '}
              <Link color="green" href="#">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link color="green" href="#">
                Privacy Policy
              </Link>
            </Text>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
