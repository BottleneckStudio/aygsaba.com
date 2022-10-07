import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import AlertBanner, { AlertBannerState } from '../../../components/AlertBanner';

import { Container } from './components';
import { AuthContext } from '../../../context/auth';

import useService from '../../../services/http.service';

const SigninPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { actions: { fetchLogin, setInitial }, result } = useService();
  const [alert, setAlert] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertBannerState>({
    content: '',
    type: 'info'
  })

  const closeErrorAlert = () => {
    setInitial();
    setAlert(false);
  }

  const handleClick = () => fetchLogin();

  useEffect(() => {
    if (result.error === '' && result.response !== null) {
      setAuth(result.response);
      navigate('/me', { replace: true });
    } else if (result.error !== '' && result.response === null) {
      setAlert(true);
    }
  }, [result]);

  useEffect(() => {
    if (auth.token !== '') {
      navigate('/me', { replace: true });
    }
  }, [auth]);

  useEffect(() => {
    if (!alert) return;
    setAlertState({
      content: result.error,
      type: 'error'
    });
  }, [alert]);

  return (
    <Layout>
      <Container>
        <h2>Sign in with</h2>
        <Button
          className="facebook"
          data-testid="button-facebook"
          onClick={handleClick}
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
      </Container>
      <AlertBanner
        open={alert}
        content={alertState.content}
        type={alertState.type}
        onClose={closeErrorAlert}
      />
    </Layout>
  );
};

export default SigninPage;
