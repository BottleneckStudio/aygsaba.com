import styled from 'styled-components';

import devices from '../../constants/devices';

export const Container = styled.div<{ isBlurred: boolean }>`
  margin: 0 auto;
  transition: 0.3s all ease-in-out;

  ${p => p.isBlurred && `
    filter: blur(0.25rem);
    overflow: hidden;
  `}
`;

export const Content = styled.div`
  height: calc(100vh - 5.813rem);

  @media ${devices.laptop} {
    width: 64rem;
    margin: 0 auto;
  }
`;
