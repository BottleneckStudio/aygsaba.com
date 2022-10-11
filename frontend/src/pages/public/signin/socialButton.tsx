import React, { useCallback } from 'react';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import Button from '../../../components/Button';

import app from '../../../utils/firebaseConfig';

import useService from '../../../services/http.service';

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

const FacebookButton = () => {
  const { actions: { loginUser } } = useService();

  const LoginWithFB = useCallback(async () => {
    const res = await signInWithPopup(auth, provider);
    const token = await res.user.getIdToken();

    loginUser({ token });
  }, []);

  return (
    <Button
      className="facebook width100"
      data-testid="button-facebook"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={LoginWithFB}
    >
      Facebook
    </Button>
  );
};

export default FacebookButton;
