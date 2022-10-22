/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

import colors from '../../constants/colors';

export const Container = styled.div<{ isOpen: boolean, type: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s all ease-in-out;
  position: fixed;
  top: ${p => p.isOpen ? '0' : '-100%'};
  left: 0;
  width: 100%;
  color: ${colors.white};
  padding: 0.625rem;
  z-index: 200;

  ${p => {
    if (p.type === 'error') {
      return `background-color: ${colors.red};`;
    }

    return `background-color: ${colors.green};`;
  }}
`;

export const BannerClose = styled.button`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  background-color: ${colors.gray20};
  padding: 0.313rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;
