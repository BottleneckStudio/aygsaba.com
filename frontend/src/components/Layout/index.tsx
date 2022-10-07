import React, { FC } from 'react';

import type { LayoutOptions } from '../../types/layout-options';

import Header from '../Header';

import { Container, Content } from './components';

const Layout: FC<LayoutOptions> = ({
  children,
  isBlurred
}) => (
  <Container isBlurred={isBlurred ?? false}>
    <Header />
    <Content>
      {children}
    </Content>
  </Container>
);

export default Layout;
