import { useToast } from '@chakra-ui/react';

export const useCheckConnection = () => {
  const toast = useToast();

  const handleConnectionInternet = () => {
    if (!window.navigator.onLine) {
      return toast({
        title:
          'Connection is lost, check again condition of your internet connection',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
    }
  };

  return { handleConnectionInternet };
};
