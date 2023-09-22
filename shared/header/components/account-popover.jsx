import React from 'react';
import useLogin from 'modules/login/login.hook';
import {
  Text,
  Avatar,
  Alert,
  AlertIcon,
  Divider,
  Tooltip,
} from '@chakra-ui/react';

import Dialog from 'shared/dialog/dialog';

const AccountPopover = () => {
  const { handleLogout, user } = useLogin();
  const userData = user?.reloadUserInfo;

  return (
    <div align="center">
      <Avatar name={userData?.displayName} src={userData?.photoUrl} mb={4} />

      <div>
        <Text as="b" fontSize="lg">
          {userData?.displayName}
        </Text>
        <Tooltip
          hasArrow
          label={
            userData?.emailVerified ? 'Email is verified' : 'Email not verified'
          }>
          <Alert
            status={userData?.emailVerified ? 'success' : 'warning'}
            mt={3}
            mb={4}>
            <AlertIcon />
            {userData?.email}
          </Alert>
        </Tooltip>

        <Divider mb={4} />
        <Dialog
          title="Logout"
          description="Are you sure want to logout?"
          buttonDialogText="Logout"
          buttonDialogColor="red"
          buttonConfirmText="Yes, sure"
          buttonConfirmColor="red"
          event={handleLogout}
        />
      </div>
    </div>
  );
};

export default AccountPopover;
