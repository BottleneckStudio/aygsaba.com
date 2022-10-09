import React, { FC } from 'react';

import { DefaultOptions, LayoutOptions } from '../../types/layout-options';

import { Container } from './components';

const DefaultLayout: FC<DefaultOptions & Pick<LayoutOptions, 'isBlurred'>> = ({
  isBlurred,
  children
}) => (
  <Container isBlurred={isBlurred ?? false}>
    {children}
  </Container>
);

export default DefaultLayout;
