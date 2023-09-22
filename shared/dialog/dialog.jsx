import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import Buttons from 'shared/button/button';

import { FiLogOut } from 'react-icons/fi';

const Dialog = props => {
  const initialRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    title,
    description,
    buttonDialogText,
    buttonDialogColor,
    buttonConfirmText,
    buttonConfirmColor,
    event
  } = props;

  return (
    <>
      <Buttons
        leftIcon={<FiLogOut />}
        width="100%"
        mb={3}
        size="sm"
        colorScheme={buttonDialogColor}
        onClick={onOpen}>
        {buttonDialogText}
      </Buttons>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={initialRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={initialRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={buttonConfirmColor} onClick={event} ml={3}>
                {buttonConfirmText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Dialog;
