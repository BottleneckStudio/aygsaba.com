import React, { FC } from 'react';

import { FormGroup, ButtonGroup } from '../../../components/Form';
import Button from '../../../components/Button';

const ShareMessage: FC<{ id: string }> = ({ id }) => (
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
);

export default ShareMessage;
