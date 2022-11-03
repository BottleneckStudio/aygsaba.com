/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC } from 'react';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import Button from '../../../components/Button';

import app from '../../../utils/firebaseConfig';

import { LoginPayloadType } from '../../../types/payloads';

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

const FacebookButton: FC<{
  onLogin: (p: LoginPayloadType) => void
}> = ({ onLogin }) => {
  const LoginWithFB = async () => {
    const res = await signInWithPopup(auth, provider);
    const token = await res.user.getIdToken();
    const { uid } = res.user;

    onLogin({ token, uid });
  };

  return (
    <Button
      className="facebook width100"
      data-testid="button-facebook"
      onClick={LoginWithFB}
    >
      Facebook
    </Button>
  );
};

export default FacebookButton;
