import styled from 'styled-components';

import colors from '../../../constants/colors';

export const DrawerAccountImage = styled.img`
  display: block;
  height: 13.125rem;
  width: 13.125rem;
  object-fit: cover;
  border-radius: 100%;
  margin: 0 auto;
`;

export const DrawerAccountName = styled.p`
  font-size: 1.875rem;
  text-align: center;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  height: 4.75rem;
  width: 4.75rem;
  background-color: ${colors.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25rem 0.938rem ${colors.green15};
  border-radius: 100%;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 0.188rem;
    width: 1.563rem;
    background-color: ${colors.white};
    border-radius: 0.625rem;
  }

  &::after {
    position: absolute;
    transform: rotate(90deg);
  }
`;
