import React, { FC } from 'react';

import { Input } from '../../../components/Input';
import { FormGroup, ButtonGroup } from '../../../components/Form';
import Button from '../../../components/Button';

import { Message } from '../../../types/models';

import { MessageContent } from './components';

const ShareMessage: FC<{ message: Message }> = ({ message }) => (
  <>
    <p>{message.title}</p>
    <MessageContent>
      {message.content}
    </MessageContent>
    <FormGroup>
      <p>
        Share to
      </p>
      <ButtonGroup>
        <Button
          className="facebook"
          data-testid="button-facebook"
        >
          Facebook
        </Button>
        <Button
          className="twitter"
          data-testid="button-twitter"
        >
          Twitter
        </Button>
        <Button
          className="tiktok"
          data-testid="button-tiktok"
        >
          Tiktok
        </Button>
      </ButtonGroup>
    </FormGroup>
    <FormGroup>
      <p>Generate link</p>
      <Input
        className="width100"
        placeholder="link"
        value="aygsaba.com/hh123g"
        disabled
      />
    </FormGroup>
  </>
);

export default ShareMessage;
