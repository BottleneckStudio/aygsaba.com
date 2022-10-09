import React, { FC, useContext } from 'react'

import { AuthContext } from '../../../context/auth';

import { FormGroup } from '../../../components/Form';
import Button from '../../../components/Button';

import {
  DrawerAccountImage,
  DrawerAccountName
} from './components';

const Account: FC<{
  onLogout: () => void
}> = ({ onLogout }) => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <DrawerAccountImage src={auth.image} alt="account user" />
      <DrawerAccountName>
        @
        {auth.username}
      </DrawerAccountName>
      <FormGroup className="margin0">
        <Button
          className="width100 margin0"
          onClick={onLogout}
        >
          Logout
        </Button>
      </FormGroup>
    </>
  );
};

export default Account;
