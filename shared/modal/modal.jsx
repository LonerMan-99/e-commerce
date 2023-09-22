import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';

const Modals = ({
  title,
  children,
  footer,
  buttonText,
  buttonVariant,
  buttonColor,
  isDisabled,
  buttonSize = 'sm',
  width,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Buttons
        isDisabled={isDisabled}
        variant={buttonVariant}
        size={buttonSize}
        width={width}
        colorScheme={buttonColor}
        onClick={onOpen}>
        {buttonText}
      </Buttons>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modals;
