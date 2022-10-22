import styled from 'styled-components';

import devices from '../../../constants/devices';

export const Container = styled.div`
  padding: 1.25rem;
`;

export const Logo = styled.img`
  display: block;
  width: 9.75rem;
  height: auto;
  margin: 0 auto;
  margin-bottom: 9.313rem;
`;

export const MessageContainer = styled.div`
  width: 100%;

  @media ${devices.tablet} {
    width: 25rem;
    margin: 0 auto;
  }
`;