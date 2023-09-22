import React from 'react';
import { Button } from '@chakra-ui/react';

const Buttons = props => {
  const { textColor = 'dark', children } = props;

  return <Button {...props}>{children}</Button>;
};

export default Buttons;
