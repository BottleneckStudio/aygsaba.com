import { useState } from 'react';
import {
  Container,
  UserImage,
  HeaderTitle,
} from './components';

const Header = () => {
  const [isAuthenticated] = useState<boolean>(false);

  return (
    <Container center={isAuthenticated}>
      <HeaderTitle>🤫 aygsaba</HeaderTitle>
      {isAuthenticated && (
        <UserImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80" alt="aygsaba user" />
      )}
    </Container>
  );
};

export default Header;

