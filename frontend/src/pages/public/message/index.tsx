import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

import AygsabaLogo from '../../../assets/images/aygsaba-logo.svg';

import useService from '../../../services/http.service';
import { Message as MessageModel } from '../../../types/models';

import DefaultLayout from '../../../components/Layout/default';
import AlertBanner, { AlertBannerState } from '../../../components/AlertBanner';

import { AuthContext } from '../../../context/auth';

import {
  Message,
  MessageStatus,
  MessageButtonGroup,
  MessageUser,
  MessageContent
} from '../../../components/Message';

import {
  Container,
  Logo,
  MessageContainer
} from './components';

const MessagePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (id === undefined) navigate('/', { replace: true });

  const { auth } = useContext(AuthContext);
  const { actions: { getMessage, setInitial }, result } = useService();

  const [alert, setAlert] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertBannerState>({
    content: '',
    type: 'info'
  })

  const [message, setMessage] = useState<MessageModel>({
    id: '',
    title: '',
    content: '',
    hideByView: false,
    limit: 5,
    status: '',
    user: {
      id: '',
      username: '',
      image: ''
    }
  });

  // close error
  const closeErrorAlert = () => {
    setInitial();
    setAlert(false);
  }

  useEffect(() => {
    getMessage({
      id: id as string,
      token: auth.token
    });
  }, []);

  useEffect(() => {
    if (result.error === '' && result.response !== null && !result.loading) {
      setMessage(result.response);
    } else if (result.error !== '' && result.response === null) {
      setAlert(true);
    }
  }, [result]);

  useEffect(() => {
    if (!alert) return;
    setAlertState({
      content: result.error,
      type: 'error'
    });
  }, [alert]);

  return (
    <>
      <DefaultLayout isBlurred={false}>
        <Container>
          <Logo src={AygsabaLogo} alt="aygsaba logo" />
          <MessageContainer>
            <Message>
              <MessageUser>
                <img src={message.user.image} alt="user" />
                <p>
                  @
                  {message.user.username}
                </p>
              </MessageUser>
              <p>{message.title}</p>
              <MessageContent isBlurred={message.status === 'done'}>
                <p>{message.content}</p>
              </MessageContent>
              <MessageButtonGroup>
                <MessageStatus status="done">
                  {message.status === 'done' && (
                    <>
                      <span>
                        <LockRoundedIcon
                          sx={{ fontSize: '20px' }}
                        />
                      </span>
                      <span className="text">
                        Share has ended
                      </span>
                    </>
                  )}
                  {message.status === 'ongoing' && (
                    <>
                      {message.hideByView && (
                        <>
                          <span>
                            <RemoveRedEyeRoundedIcon
                              sx={{ fontSize: '20px' }}
                            />
                          </span>
                          <span className="text">
                            20th out of 100 viewers
                          </span>
                        </>
                      )}
                      {!message.hideByView && (
                        <>
                          <span>
                            <AccessTimeRoundedIcon
                              sx={{ fontSize: '20px' }}
                            />
                          </span>
                          <span className="text">
                            11/100
                          </span>
                        </>
                      )}
                    </>
                  )}
                </MessageStatus>
              </MessageButtonGroup>
            </Message>
          </MessageContainer>
        </Container>
      </DefaultLayout>
      <AlertBanner
        open={alert}
        content={alertState.content}
        type={alertState.type}
        onClose={closeErrorAlert}
      />
    </>
  );
};

export default MessagePage;
