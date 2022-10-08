import React, { FC } from 'react';

import Button from '../../../components/Button';
import { Input, InputContainer } from '../../../components/Input';
import { FormGroup } from '../../../components/Form';

import { Message } from '../../../types/models';

const GenerateLink: FC<Pick<Message, 'id'>> = ({ id }) => (
  <>
    <FormGroup>
      <p>
        LINK
      </p>
      <InputContainer
        isError={false}
      >
        <Input
          className="width100"
          value={`aygsaba.com/${id}`}
          disabled
        />
      </InputContainer>
    </FormGroup>
    <FormGroup className="margin0">
      <Button className="width100 margin0 black">Copy</Button>
    </FormGroup>
  </>
);

export default GenerateLink;
