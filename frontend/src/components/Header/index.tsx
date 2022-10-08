import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  UserImageButton,
  UserImage,
  HeaderLogo,
  DrawerAccountImage,
  DrawerAccountName
} from './components';

import { AuthContext } from '../../context/auth';

import Logo from '../../assets/images/aygsaba-logo.svg';

import Drawer from '../Drawer';
import { FormGroup } from '../Form';
import Button from '../Button';

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => setIsDrawerOpen(false);

  const logout = () => navigate('/logout', { replace: false });

  return (
    <Container center={auth.token !== ''}>
      <HeaderLogo src={Logo} alt="aygsaba" />
      {auth.image !== '' && (
        <UserImageButton
          onClick={openDrawer}
        >
          <UserImage
            src={auth.image}
            alt="aygsaba user"
            onClick={openDrawer}
          />
        </UserImageButton>
      )}
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        title="Account"
      >
        <DrawerAccountImage src={auth.image} alt="account user" />
        <DrawerAccountName>
          @
          {auth.username}
        </DrawerAccountName>
        <FormGroup className="margin0">
          <Button
            className="width100 margin0"
            onClick={logout}
          >
            Logout
          </Button>
        </FormGroup>
      </Drawer>
    </Container>
  );
};

export default Header;
