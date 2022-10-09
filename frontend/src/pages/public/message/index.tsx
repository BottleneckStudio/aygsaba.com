import React from 'react';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

import AygsabaLogo from '../../../assets/images/aygsaba-logo.svg';

import DefaultLayout from '../../../components/Layout/default';

import {
  MessageList,
  Message,
  MessageStatus,
  MessageButtonGroup,
  MessageUser,
  MessageContent
} from '../../../components/Message';

import { Container, Logo } from './components';

const MessagePage = () => {
  console.log('test');

  return (
    <DefaultLayout isBlurred={false}>
      <Container>
        <Logo src={AygsabaLogo} alt="aygsaba logo" />
        <MessageList>
          <Message>
            <MessageUser>
              <img src="https://t4.ftcdn.net/jpg/01/29/43/85/360_F_129438556_1ugKA7Fk1EiR7uar9ZGaQ3wYfaWSM25E.jpg" alt="user" />
              <p>
                @user
              </p>
            </MessageUser>
            <p>This is a test</p>
            <MessageContent isBlurred>
              <p>test this</p>
            </MessageContent>
            <MessageButtonGroup>
              <MessageStatus status="done">
                <span>
                  <LockRoundedIcon
                    sx={{ fontSize: '20px' }}
                  />
                </span>
                <span className="text">
                  Share has ended
                </span>
              </MessageStatus>
            </MessageButtonGroup>
          </Message>
        </MessageList>
      </Container>
    </DefaultLayout>
  );
};

export default MessagePage;
