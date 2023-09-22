import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'shared/utils/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  USER_WRONG_PASSWORD,
  USER_NOT_FOUND,
  TOO_MANY_REQUEST,
} from './login.constant';
import { useCheckConnection } from 'shared/utils/connection-checker.util';

const useLogin = () => {
  const router = useRouter();
  const toast = useToast();
  const [user] = useAuthState(auth);
  const [isModalAuthShow, setIsModalAuthShow] = useState(false);
  const { handleConnectionInternet } = useCheckConnection();

  const googleAuthProvider = new GoogleAuthProvider();

  const handleLoginWithGoogle = async () => {
    handleConnectionInternet();
    setIsModalAuthShow(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast({
        title: 'Login success',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
      router.push('/');
    } catch (error) {
      console.log(error)
      toast({
        title: 'Sorry, there was a system error. Please try again later',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 6000,
      });
    } finally {
      setIsModalAuthShow(false);
    }
  };

  const handleLoginWithEmailPassword = async values => {
    handleConnectionInternet();
    setIsModalAuthShow(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Login success',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });
      router.push('/');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === USER_WRONG_PASSWORD) {
        return toast({
          title: 'Password you entered is incorrect',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 6000,
        });
      }

      if (errorCode === USER_NOT_FOUND) {
        return toast({
          title: 'User not found, please check your email again',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 6000,
        });
      }

      if (errorCode === TOO_MANY_REQUEST) {
        return toast({
          title: 'Too many requests, please try again later',
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
        duration: 6000,
      });
    } finally {
      setIsModalAuthShow(false);
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  };

  return {
    handleLoginWithGoogle,
    handleLogout,
    user,
    isModalAuthShow,
    handleLoginWithEmailPassword,
  };
};

export default useLogin;
