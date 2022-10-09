import React, { FC } from 'react';

import type { LayoutOptions } from '../../types/layout-options';

import Header from '../Header';

import { Content } from './components';
import DefaultLayout from './default';

const Layout: FC<LayoutOptions> = ({
  children,
  isBlurred,
  onUserClick
}) => (
  <DefaultLayout isBlurred={isBlurred ?? false}>
    <Header onUserClick={onUserClick} />
    <Content>
      {children}
    </Content>
  </DefaultLayout>
);

export default Layout;
