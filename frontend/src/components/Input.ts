import styled from 'styled-components';

import colors from '../constants/colors';

export const Input = styled.input`
  border: 0.063rem solid ${colors.gray20};
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: ${colors.white};
  font-size: 1.125rem;

  &:disabled {
    background-color: ${colors.gray20};
  }
`;

export const Textarea = styled.textarea`
  border: 0.063rem solid ${colors.gray20};
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: ${colors.white};
  font-size: 1.125rem;
  resize: none;
`;

export const InputContainer = styled.div<{ isError: boolean }>`
  margin-bottom: 1.5rem;

  ${p => p.isError && `
    position: relative;

    &::after {
      content: attr(data-error);
      display: block;
      color: ${colors.red};
      position: absolute;
      left: 0;
      bottom: -0.625rem;
      height: 0.625rem;
      width: 100%;
    }

    > ${Input} {
      border-color: ${colors.red};
    }

    > ${Textarea} {
      border-color: ${colors.red};
    }
  `}
`;
