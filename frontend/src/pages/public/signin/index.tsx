import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';

import { Container } from './components';
import { AuthContext } from '../../../context/auth';

import useService from '../../../services/http.service';

const SigninPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { actions: { fetchLogin }, result } = useService();

  const handleClick = () => fetchLogin();

  useEffect(() => {
    if (result.error === '' && result.response !== null) {
      setAuth(result.response);
      navigate('/me', { replace: true });
    }
  }, [result]);

  useEffect(() => {
    if (auth.token !== '') {
      navigate('/me', { replace: true });
    }
  }, [auth]);

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
    </Layout>
  );
};

export default SigninPage;
