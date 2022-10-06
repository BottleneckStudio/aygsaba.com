import styled from 'styled-components';

import colors from '../../../constants/colors';
import devices from '../../../constants/devices';

export const MessageList = styled.div`
  padding: 1.25rem;

  @media ${devices.tablet} {
    width: 25rem;
    margin: 0 auto;
  }
`;

export const Message = styled.div`
  border-radius: 0.5rem;
  background-color: ${colors.silvergray};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 12.5rem;
  margin-bottom: 2rem;
`;

export const MessageContent = styled.p`
  margin: 0;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${colors.silvergray};
  padding: 3rem;
  color: ${colors.green};
  text-align: center;
  font-size: 2.5rem;
`;

export const MessageButton = styled.button<{ status: string }>`
  border-radius: 6.25rem;
  position: absolute;
  bottom: -1.3rem;
  padding: 0.75rem 1.5rem;
  ${p => {
    let style = '';

    if (p.status === 'ready') {
      style = `
        background: ${colors.purple};
        color: ${colors.white};
        box-shadow: 0 0.25rem 0.625rem ${colors.black25};
      `;
    } else if (p.status === 'ongoing') {
      style = `
        background: ${colors.lightblue};
        color: ${colors.white};
        box-shadow: none;
      `;
    } else {
      style = `
        background: ${colors.disabledgray};
        color: ${colors.black};
        box-shadow: none;
      `;
    }

    return style;
  }}

  > p {
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    margin: 0;

    span.icon {
      display: flex;
      align-items: center;
      margin-right: 0.313rem;
    }

    span.counter {
      color: ${colors.navyblue};
      font-size: 1.125rem;
      margin: 0 1.2rem;
    }
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  height: 4.75rem;
  width: 4.75rem;
  background-color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25rem 0.938rem ${colors.black40};
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
`
