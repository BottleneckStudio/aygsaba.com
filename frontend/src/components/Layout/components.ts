import styled from 'styled-components';

import devices from '../../constants/devices';

export const Container = styled.div`
  background: #fff;
  margin: 0 auto;

  @media ${devices.laptop} {
    width: 64rem;
  }
`;

export const Content = styled.div`
  height: calc(100vh - 5.813rem);
`;
