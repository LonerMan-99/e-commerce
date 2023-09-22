import React from 'react';
import { Input, Select, Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Buttons from 'shared/button/button';
import Modals from 'shared/modal/modal';
import ModalAuth from 'shared/header/components/modal-auth';
import useLogin from 'modules/login/login.hook';

const TabsPulsaData = () => {
  const { user } = useLogin();
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      pulsaAmount: '',
    },
    onSubmit: values => {
      console.log(values);
      // handleNewRegisterUser(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="end" gap={3}>
        <div style={{ flexBasis: '40%' }}>
          <label
            htmlFor="phoneNumber"
            style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
            Phone Number
          </label>
          <Input
            mt={1}
            placeholder="081234567890"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </div>
        <div style={{ flexBasis: '40%' }}>
          <label
            htmlFor="pulsaAmount"
            style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
            Nominal
          </label>
          <Select
            mt={1}
            placeholder="Pick"
            id="pulsaAmount"
            name="pulsaAmount"
            onChange={formik.handleChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div style={{ flexBasis: '20%' }}>
          {!user ? (
            <Modals
              title="Please login first."
              buttonText="Buy"
              buttonVariant="solid"
              buttonColor="whatsapp"
              width="100%"
              isDisabled={
                formik.values.phoneNumber === '' ||
                formik.values.pulsaAmount === ''
              }
              buttonSize="md">
              <ModalAuth />
            </Modals>
          ) : (
            <Buttons
              isDisabled={
                formik.values.phoneNumber === '' ||
                formik.values.pulsaAmount === ''
              }
              type="submit"
              width="100%"
              colorScheme="whatsapp"
              // isLoading={isLoading}
              loadingText="loading..">
              Buy
            </Buttons>
          )}
        </div>
      </Flex>
    </form>
  );
};

export default TabsPulsaData;
