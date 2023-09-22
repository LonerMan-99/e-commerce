import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import TabsComponent from 'shared/tabs/tabs';
import TabsPulsaData from './components/tabs-pulsa-data';
import TabsFlight from './components/tabs-flight';
import TabsPLN from './components/tabs-pln';
import RecommendationCarousel from './components/recomendation-carousel';

import Styles from './top-up.module.scss';

const TopUp = () => {
  const tabList = ['Pulsa', 'Paket Data', 'Flight', 'Listrik PLN'];
  const tabContent = [
    <TabsPulsaData key={1} />,
    <TabsPulsaData key={2} />,
    <TabsFlight key={3} />,
    <TabsPLN key={4} />,
  ];
  return (
    <Box
      maxWidth="1200px"
      m="0 auto"
      p="16px"
      borderRadius={10}
      boxShadow="
      0px 0px 0.5px rgba(0, 0, 0, 0.033),
      0.1px 0.1px 1.4px rgba(0, 0, 0, 0.047),
      0.3px 0.3px 3.3px rgba(0, 0, 0, 0.059),
      1px 1px 11px rgba(0, 0, 0, 0.09)">
      <div className={`${Styles['Box-container']}`}>
        <div className={`${Styles['Box-Content']}`}>
          <div className={`${Styles['Box-label']}`}>
            Choice Category
          </div>

          <RecommendationCarousel />
        </div>

        <div className={`${Styles['Box-Content']}`}>
          <div className={`${Styles['Box-label']}`}>
            Top Up & Bills
          </div>

          <TabsComponent tabList={tabList} tabContent={tabContent} />
        </div>
      </div>
    </Box>
  );
};

export default TopUp;
