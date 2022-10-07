import styled from 'styled-components';

export const Form = styled.form``;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

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
    margin: 0.625rem;
  }

  button:first-child {
    margin-left: 0;
  }

  button:last-child {
    margin-right: 0;
  }
`;
