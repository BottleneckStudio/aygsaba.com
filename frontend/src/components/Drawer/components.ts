/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

import colors from '../../constants/colors';
import devices from '../../constants/devices';

export const Container = styled.div<{ isVisible: boolean }>`
  background-color: ${p => p.isVisible ? colors.black40 : 'transparent'};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  transition: 0.3s all ease-in-out;
`;

export const Card = styled.div<{ isShown: boolean }>`
  background-color: ${colors.white};
  border-radius: 1.25rem 1.25rem 0 0;
  position: absolute;
  bottom: ${p => p.isShown ? '0' : '-100%'};
  left: 0;
  right: 0;
  max-height: 90%;
  color: ${colors.black};
  transition: 0.3s all ease-in-out;

  @media ${devices.tablet} {
    width: 25rem;
    margin: 0 auto;
  }

  > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    padding-bottom: 0;
  }

  > .content {
    padding: 0 1.25rem;
    padding-bottom: 1.25rem;
    max-height: calc(100vh - 10rem);
    overflow-y: auto;
  }

`;

export const CardClose = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${colors.silvergray};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
