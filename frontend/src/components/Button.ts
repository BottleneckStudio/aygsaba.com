import styled from 'styled-components';

import colors from '../constants/colors';

const Button = styled.button`
  border: 0;
  background-color: ${colors.gray};
  padding: 0.625rem;
  border-radius: 6.25rem;
  color: ${colors.white};
  width: 14.375rem;
  font-size: 1.2rem;
  margin-bottom: 0.625rem;

  &.facebook {
    background-color: ${colors.facebook};
  }

  &.twitter {
    background-color: ${colors.twitter};
  }

  &.tiktok {
    background-color: ${colors.black};
  }
`;

export default Button;

