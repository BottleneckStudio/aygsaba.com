/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';

import AygsabaLogo from '../../../assets/images/aygsaba-logo.svg';
import useService from '../../../services/http.service';

import DefaultLayout from '../../../components/Layout/default';
import Button from '../../../components/Button';
import AlertBanner from '../../../components/AlertBanner';
import Drawer from '../../../components/Drawer';
import { FormGroup, ButtonGroup } from '../../../components/Form';

import { Container, Logo, StartButton } from './components';
import { AuthContext } from '../../../context/auth';

import { LoginPayloadType } from '../../../types/payloads';

import FacebookButton from './socialButton';

const SigninPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { actions: { loginUser, setInitial }, result } = useService();
  const [alert, setAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const closeErrorAlert = () => {
    setInitial();
    setAlert(false);
  }

  // handle login
  const handleLogin = async (payload: LoginPayloadType) => {
    setIsDrawerOpen(false);

    try {
      await loginUser(payload)
    } catch (err) {
      setAlert(true);
      setAlertContent('Error logging in user');
    }
  };

  useEffect(() => {
    if (result.error === '' && result.response !== null) {
      navigate('/me', { replace: true });
    } else if (result.error !== '' && result.response === null) {
      setAlert(true);
      setAlertContent(result.error);
    }
  }, [result]);

  useEffect(() => {
    if (auth.token !== '') {
      navigate('/me', { replace: true });
    }
  }, [auth]);

  return (
    <>
      <DefaultLayout
        isBlurred={isDrawerOpen}
      >
        <Container>
          <Logo src={AygsabaLogo} alt="aygsaba" />
          <StartButton onClick={() => setIsDrawerOpen(true)}>
            <TouchAppRoundedIcon />
            <span>
              Click to start
            </span>
          </StartButton>
        </Container>
      </DefaultLayout>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Sign in with"
      >
        <FormGroup>
          <ButtonGroup>
            <FacebookButton
              onLogin={handleLogin}
            />
            <Button
              className="twitter width100"
              data-testid="button-twitter"
            >
              Twitter
            </Button>
            <Button
              className="tiktok width100"
              data-testid="button-tiktok"
            >
              Tiktok
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Drawer>
      <AlertBanner
        open={alert}
        content={alertContent}
        type="error"
        onClose={closeErrorAlert}
      />
    </>
  );
};

export default SigninPage;
