import styled from 'styled-components';

import colors from '../constants/colors';
import devices from '../constants/devices';

export const MessageList = styled.div`
  padding: 1.25rem;
  padding-bottom: 6rem;

  @media ${devices.tablet} {
    width: 25rem;
    margin: 0 auto;
  }
`;

export const MessageUser = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 2.188rem;
    width: 2.188rem;
    object-fit: cover;
    border-radius: 100%;
  }

  p {
    color: ${colors.black};
    margin: 0;
    margin-left: 0.625rem;
  }
`;

export const Message = styled.div`
  border-radius: 0.5rem;
  background-color: ${colors.white};
  box-shadow: 0 0.375rem 1.25rem ${colors.green15};
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.25rem;

  > p {
    font-size: 1rem;
    margin: 1.5rem 0;
    color: ${colors.gray};
  }
`;

export const MessageContent = styled.div<{ isBlurred: boolean }>`
  margin: 0;
  width: 100%;
  border-radius: 0.5rem;
  padding: 3rem;
  text-align: center;
  background-image: linear-gradient(45deg, ${colors.green}, ${colors.purple});
  position: relative;
  margin-bottom: 1.25rem;

  > p {
    font-size: 2.5rem;
    color: ${colors.white};
    ${p => p.isBlurred && 'filter: blur(0.25rem);'}
  }

  ${p => p.isBlurred && `
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(45deg, ${colors.green}, ${colors.purple});
      opacity: 0.4;
    }
  `}
`;

export const MessageButtonGroup = styled.div`
  height: 2.188rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageStatus = styled.div<{ status: string }>`
  position: absolute;
  border-radius: 6.25rem;
  background: ${colors.purple};
  padding: 0.5rem 1rem;
  width: auto;
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    color: ${colors.white};
    font-size: 1rem;
  }

  span.text {
    margin-left: 0.313rem;
  }

  ${p => p.status === 'done' && `
    background: ${colors.gray20};
    box-shadow: none;

    span {
      color: ${colors.purple};
    }
  `}
`;

export const MessageButton = styled.button`
  height: 2.188rem;
  width: 2.188rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.purple};

  span {
    display: flex;
    align-items: center;
    color: ${colors.white};
  }
`;
