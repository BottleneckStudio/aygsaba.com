import styled from 'styled-components';

import colors from '../constants/colors';

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  > p {
    font-size: 0.813rem;
    text-transform: uppercase;
    color: ${colors.gray};
  }

  &.flex-middle {
    display: flex;
    align-items: center;

    p {
      margin-left: 0.625rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0.313rem;
  }

  button:first-child {
    margin-left: 0;
  }

  button:last-child {
    margin-right: 0;
  }
`;
