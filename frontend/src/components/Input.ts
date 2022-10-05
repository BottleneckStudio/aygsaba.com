import styled from 'styled-components';

import colors from '../constants/colors';

export const Input = styled.input`
  border: 0;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: ${colors.silvergray};
  font-size: 1.125rem;
`;

export const Textarea = styled.textarea`
  border: 0;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: ${colors.silvergray};
  font-size: 1.125rem;
  resize: none;
`;
