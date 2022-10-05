/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

import devices from '../../constants/devices';

export const Container = styled.div<{ center: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.center ? 'space-between' : 'center'};
  padding: 1.563rem 1.25rem;

  @media ${devices.tablet} {
    width: 64rem;
    margin: 0 auto;
  }
`;

export const UserImage = styled.img`
  display: block;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  object-fit: cover;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 1.875rem;
`;
