import React, { FC } from 'react';

import {
  LoginSocialFacebook,
  IResolveParams
} from 'reactjs-social-login';

import Button from '../../../components/Button';

const FacebookButton: FC<{
  onResolve: (res: IResolveParams) => void;
  onReject: () => void;
}> = ({
  onResolve,
  onReject
}) => (
  <LoginSocialFacebook
    appId="3250730951832755"
    onReject={onReject}
    onResolve={onResolve}
  >
    <Button
      className="facebook width100"
      data-testid="button-facebook"
    >
      Facebook
    </Button>
  </LoginSocialFacebook>
);

export default FacebookButton;
