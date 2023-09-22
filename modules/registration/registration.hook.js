import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'shared/utils/firebase-config';
import { useCheckConnection } from 'shared/utils/connection-checker.util';

import { useToast } from '@chakra-ui/react';

const useRegistration = () => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState();
  const { handleConnectionInternet } = useCheckConnection();

  const handleNewRegisterUser = async values => {
    handleConnectionInternet()
    setIsLoading(true);
    try {
      const newRegister = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      toast({
        title: 'Registration success',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
      router.push('/');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        return toast({
          title: 'Sorry, your email has already been registered',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 6000,
        });
      }

      toast({
        title: 'Sorry, there was a system error. Please try again later',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleNewRegisterUser,
    isLoading,
  };
};

export default useRegistration;
