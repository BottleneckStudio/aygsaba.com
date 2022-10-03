import React, { useContext } from 'react';

import {
  Container,
  UserImage,
  HeaderTitle
} from './components';

import { AuthContext } from '../../context/auth';

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Container center={auth.token !== ''}>
      <HeaderTitle>🤫 aygsaba</HeaderTitle>
      {auth.image !== '' && (
        <UserImage src={auth.image} alt="aygsaba user" />
      )}
    </Container>
  );
};

export default Header;
