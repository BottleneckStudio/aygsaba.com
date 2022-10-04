import React, { FC } from 'react';

import type DefaultOptions from '../../types/layout-options';
import Header from '../Header';
import { Container, Content } from './components';

const Layout: FC<DefaultOptions> = ({ children }) => (
  <Container>
    <Header />
    <Content>
      {children}
    </Content>
  </Container>
);

export default Layout;
