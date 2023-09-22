import React from 'react';
import { Input, Select, Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Buttons from 'shared/button/button';
import Modals from 'shared/modal/modal';
import ModalAuth from 'shared/header/components/modal-auth';
import useLogin from 'modules/login/login.hook';

const TabsPLN = () => {
  const { user } = useLogin();
  const formik = useFormik({
    initialValues: {
      billType: '',
      subscriptionNumber: '',
      plnAmount: '',
    },
    onSubmit: values => {
      console.log(values);
      // handleNewRegisterUser(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex align="end" gap={3}>
        <div style={{ flexBasis: '30%' }}>
          <label
            htmlFor="billType"
            style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
            Bill Type
          </label>
          <Select
            mt={1}
            placeholder="Electric Token"
            id="billType"
            name="billType"
            onChange={formik.handleChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div style={{ flexBasis: '30%' }}>
          <label
            htmlFor="subscriptionNumber"
            style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
            Subscription Number
          </label>
          <Input
            mt={1}
            placeholder="1122334455"
            id="subscriptionNumber"
            name="subscriptionNumber"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.subscriptionNumber}
          />
        </div>
        <div style={{ flexBasis: '30%' }}>
          <label
            htmlFor="plnAmount"
            style={{ fontWeight: 'bold', fontSize: '14px', color: 'gray' }}>
            Nominal
          </label>
          <Select
            mt={1}
            placeholder="Pick"
            id="plnAmount"
            name="plnAmount"
            onChange={formik.handleChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div style={{ flexBasis: '10%' }}>
          {!user ? (
            <Modals
              title="Please login first."
              buttonText="Pay"
              buttonVariant="solid"
              buttonColor="whatsapp"
              width="100%"
              isDisabled={
                formik.values.billType === '' ||
                formik.values.subscriptionNumber === '' ||
                formik.values.plnAmount === ''
              }
              buttonSize="md">
              <ModalAuth />
            </Modals>
          ) : (
            <Buttons
              isDisabled={
                formik.values.billType === '' ||
                formik.values.subscriptionNumber === '' ||
                formik.values.plnAmount === ''
              }
              type="submit"
              width="100%"
              colorScheme="whatsapp"
              // isLoading={isLoading}
              loadingText="loading..">
              Pay
            </Buttons>
          )}
        </div>
      </Flex>
    </form>
  );
};

export default TabsPLN;
