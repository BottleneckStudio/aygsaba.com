import React, { FC, useContext } from 'react';

import {
  Container,
  UserImageButton,
  UserImage,
  HeaderLogo
} from './components';

import { AuthContext } from '../../context/auth';

import Logo from '../../assets/images/aygsaba-logo.svg';

const Header: FC<{
  onUserClick: () => void
}> = ({ onUserClick }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Container center={auth.token !== ''}>
      <HeaderLogo src={Logo} alt="aygsaba" />
      {auth.image !== '' && (
        <UserImageButton
          onClick={onUserClick}
        >
          <UserImage
            src={auth.image}
            alt="aygsaba user"
          />
        </UserImageButton>
      )}
    </Container>
  );
};

export default Header;
