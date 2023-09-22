import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Link,
} from '@chakra-ui/react';

const Popovers = ({ title, trigger, children, footer }) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text as="b">{title}</Text>
        </PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
        {!!footer && (
          <PopoverFooter align='center'>
            <Link href="###" fontWeight='bold' color='green.500'>{footer}</Link>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Popovers;
