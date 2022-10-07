import React, { useContext } from 'react';

import {
  Container,
  UserImage,
  HeaderLogo
} from './components';

import { AuthContext } from '../../context/auth';

import Logo from '../../assets/images/aygsaba-logo.svg';

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Container center={auth.token !== ''}>
      <HeaderLogo src={Logo} alt="aygsaba" />
      {auth.image !== '' && (
        <UserImage src={auth.image} alt="aygsaba user" />
      )}
    </Container>
  );
};

export default Header;
