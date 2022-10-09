import styled from 'styled-components';

import colors from '../../../constants/colors';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  display: block;
  height: 3.188rem,
  width: auto;
  margin-bottom: 8.875rem;
`;

export const StartButton = styled.button`
  background-color: transparent;
  color: ${colors.purple};
  display: flex;
  align-items: center;
  justify-center;

  span {
    margin-left: 0.625rem;
  }
`;
