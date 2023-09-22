import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import Styles from './tabs.module.scss';

const TabsComponent = ({ tabList = [], tabContent = [], borderless }) => {

  

  return (
    <Tabs className={`${Styles[`Tabs-${borderless ? 'borderless' : 'container'}`]}`} isFitted>
      <TabList>
        {tabList.map((item, index) => (
          <Tab
            key={index}
            _selected={{
              fontWeight: 'bold',
              borderBottom: '3px solid green',
              color: 'green',
            }}>
            {item}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabContent.map((item, index) => (
          <TabPanel key={index}>{item}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
