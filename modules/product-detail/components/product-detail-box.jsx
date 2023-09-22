import React from 'react';
import { useFormik } from 'formik';
import {
  Divider,
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Select,
  VStack,
  Radio,
  RadioGroup,
  Skeleton,
} from '@chakra-ui/react';
import { FaStar, FaStore, FaShippingFast } from 'react-icons/fa';
import TabsComponent from 'shared/tabs/tabs';
import { MdLocationOn } from 'react-icons/md';
import { convertUSDToRupiah } from 'shared/utils/usd-to-rupiah';
import { convertToCurrency } from 'shared/utils/number-to-currency';
import Buttons from 'shared/button/button';

import Jne from 'public/images/courier/JNE.svg';
import Tiki from 'public/images/courier/TIKI.svg';
import Pos from 'public/images/courier/POS.svg';
import Image from 'node_modules/next/image';

const ProductDetailBox = ({
  productDetail,
  shippingProvince,
  handleShippingCity,
  shippingCity,
  handleShippingCost,
  shippingCost,
  loading,
  reviewProduct,
}) => {
  const formik = useFormik({
    initialValues: {
      province: '',
      city: '',
      courier: '',
      courierService: '',
    },
    onSubmit: values => {
      console.log(shippingCost);
      // handleShippingCost(values);
    },
  });

  return (
    <Box>
      <Heading size="md" mb={3}>
        {productDetail.title}
      </Heading>

      <Flex mb={5} gap={5} alignItems="center">
        <Flex alignItems="center" gap={1}>
          <FaStar color="#ffc107" />
          <Text color="gray">
            {JSON.stringify(productDetail.rating || 0).substring(0, 3)}
          </Text>
        </Flex>
        <Text color="gray">
          <b style={{color:'black'}}>{reviewProduct.length}</b> Reviews
        </Text>
      </Flex>

      <Flex gap={2} mb={3}>
        <Badge colorScheme="green" width="fit-content" fontSize={11} mb={2}>
          {productDetail.category}
        </Badge>
        <Badge colorScheme="red" width="fit-content" fontSize={11} mb={2}>
          {productDetail.brand}
        </Badge>
      </Flex>
      <Heading size="lg">
        {convertToCurrency(convertUSDToRupiah(productDetail.price))}
      </Heading>
      <Divider m="20px 0 5px 0" />
      <TabsComponent
        tabList={['Detail', 'Important information']}
        tabContent={[productDetail.description, 'INFORMATION']}
        borderless
      />
      <Divider m="10px 0" />
      <Box>
        <Flex align="center" gap={3}>
          <FaStore size={25} />
          <Box>
            <Text as="b" color="green.400">
              {productDetail.brand} Official Store
            </Text>
            <Text color="gray" fontSize="sm">
              Jakarta, indonesia
            </Text>
          </Box>
        </Flex>
      </Box>
      <Divider m="10px 0" />
      <VStack align="left">
        <Text as="b" fontSize="lg">
          Shipping
        </Text>
        <Flex align="center" gap={2} mt={2}>
          <MdLocationOn />
          <Text fontSize="md">
            Ship from <b>Jakarta</b>
          </Text>
        </Flex>

        <Box m="10px 0 10px 0">
          <Text fontWeight="bold" mb={1} fontSize="sm">
            Check shipping fee
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Text mb={2} fontSize="sm" color="gray">
              Your location:
            </Text>
            <VStack align="left">
              <Select
                placeholder="Select Province"
                name="province"
                onChange={e => {
                  formik.setFieldValue('province', e.target.value);
                  handleShippingCity(e.target.value);
                }}>
                {shippingProvince?.results?.map((data, index) => (
                  <option value={data.province_id} key={index}>
                    {data.province}
                  </option>
                ))}
              </Select>

              {formik.values.province !== '' && (
                <Select
                  placeholder="Select City"
                  name="city"
                  onChange={e => {
                    formik.setFieldValue('city', e.target.value);
                  }}>
                  {shippingCity.map((data, index) => (
                    <option value={data.city_id} key={index}>
                      {data.type} {data.city_name}
                    </option>
                  ))}
                </Select>
              )}

              <Text mb={2} fontSize="sm" color="gray">
                Select courier services:
              </Text>
              <RadioGroup name="courier">
                <Flex justify="space-between">
                  <Radio
                    isDisabled={
                      formik.values.province === '' || formik.values.city === ''
                    }
                    colorScheme="green"
                    value="jne"
                    onChange={e => {
                      formik.setFieldValue('courier', e.target.value);
                      handleShippingCost({
                        ...formik.values,
                        courier: e.target.value,
                      });
                    }}>
                    <Image src={Jne} alt="jne" width={90} height={80} />
                  </Radio>
                  <Radio
                    isDisabled={
                      formik.values.province === '' || formik.values.city === ''
                    }
                    colorScheme="green"
                    value="tiki"
                    onChange={e => {
                      formik.setFieldValue('courier', e.target.value);
                      handleShippingCost({
                        ...formik.values,
                        courier: e.target.value,
                      });
                    }}>
                    <Image src={Tiki} alt="tiki" width={100} height={80} />
                  </Radio>
                  <Radio
                    isDisabled={
                      formik.values.province === '' || formik.values.city === ''
                    }
                    colorScheme="green"
                    value="pos"
                    onChange={e => {
                      formik.setFieldValue('courier', e.target.value);
                      handleShippingCost({
                        ...formik.values,
                        courier: e.target.value,
                      });
                    }}>
                    <Image src={Pos} alt="pos" width={80} height={80} />
                  </Radio>
                </Flex>
              </RadioGroup>

              {shippingCost?.status?.code === 200 && (
                <RadioGroup name="courierService">
                  <VStack align="left">
                    {shippingCost?.results?.map(data =>
                      data?.costs?.map((item, index) => (
                        <Skeleton
                          key={index}
                          isLoaded={!loading}
                          fadeDuration={1}
                          fitContent={true}>
                          <Radio
                            p={2}
                            colorScheme="green"
                            value={`${item.description} (${item.service})`}
                            onChange={e => {
                              formik.setFieldValue(
                                'courierService',
                                e.target.value,
                              );
                            }}>
                            {item.description} {`(${item.service})`} -{' '}
                            <b>{convertToCurrency(item.cost[0].value)}</b>
                            <Text>
                              estimate arrives <b>{item.cost[0].etd} days</b>
                            </Text>
                          </Radio>
                        </Skeleton>
                      )),
                    )}
                  </VStack>
                </RadioGroup>
              )}
            </VStack>
          </form>
        </Box>
      </VStack>
      <Divider m="10px 0" />
    </Box>
  );
};

export default ProductDetailBox;
