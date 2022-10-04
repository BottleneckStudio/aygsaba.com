/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

export const Container = styled.div<{ center: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.center ? 'space-between' : 'center'};
  padding: 0.625rem;
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
`;
