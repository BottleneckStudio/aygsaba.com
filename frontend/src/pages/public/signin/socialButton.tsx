import React from 'react';

import { LoginSocialFacebook } from 'reactjs-social-login';

import Button from '../../../components/Button';

const FacebookButton = () => (
  <LoginSocialFacebook
    appId="3250730951832755"
    onReject={() => console.log('rejected')}
    // TODO: handle resolve to redirect to api
    onResolve={res => console.log(res)}
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
