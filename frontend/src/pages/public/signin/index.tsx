import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';

import AygsabaLogo from '../../../assets/images/aygsaba-logo.svg';
import useService from '../../../services/http.service';

import DefaultLayout from '../../../components/Layout/default';
import Button from '../../../components/Button';
import AlertBanner, { AlertBannerState } from '../../../components/AlertBanner';
import Drawer from '../../../components/Drawer';
import { FormGroup, ButtonGroup } from '../../../components/Form';

import { Container, Logo, StartButton } from './components';
import { AuthContext } from '../../../context/auth';

import FacebookButton from './socialButton';

const SigninPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { actions: { loginUser, setInitial }, result } = useService();
  const [alert, setAlert] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertBannerState>({
    content: '',
    type: 'info'
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const closeErrorAlert = () => {
    setInitial();
    setAlert(false);
  }

  const handleClick = () => loginUser({
    token: auth.token
  });

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
            <FacebookButton />
            <Button
              className="twitter width100"
              data-testid="button-twitter"
            >
              Twitter
            </Button>
            <Button
              className="tiktok width100"
              data-testid="button-tiktok"
              onClick={handleClick}
            >
              Tiktok
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Drawer>
      <AlertBanner
        open={alert}
        content={alertState.content}
        type={alertState.type}
        onClose={closeErrorAlert}
      />
    </>
  );
};

export default SigninPage;
