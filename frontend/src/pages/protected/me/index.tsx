import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Drawer, { DrawerState } from '../../../components/Drawer';
import AlertBanner, { AlertBannerState } from '../../../components/AlertBanner';
import { MessageList } from '../../../components/Message';

import { AuthContext } from '../../../context/auth';
import useService from '../../../services/http.service';
import { Message } from '../../../types/models';
import MessageItem from './messageItem';

import CreateMessage from './createMessage';
import ShareMessage from './shareMessage';
import GenerateLink from './generateLink';
import Account from './account';

import {
  FloatingButton
} from './components';

const MePage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  if (auth.token === '') {
    navigate('/', { replace: true });
  }

  // api service
  const { actions: { getMessages, setInitial }, result } = useService();

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    title: '',
    content: null
  });
  const [alert, setAlert] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertBannerState>({
    content: '',
    type: 'info'
  })

  // close error
  const closeErrorAlert = () => {
    setInitial();
    setAlert(false);
  }

  // closes drawer
  const closeDrawer = () => setDrawerState({
    ...drawerState,
    isOpen: false
  });

  // logout user
  const logoutUser = () => navigate('/logout', { replace: true });

  // callback when successfully created message
  const onCreateMessage = () => {
    closeDrawer();
    getMessages({
      token: auth.token,
      id: auth.id
    });
  };

  // opens create message form using the drawer
  const openCreateForm = () => {
    setDrawerState({
      isOpen: true,
      title: 'Create Message',
      content: <CreateMessage onSubmit={onCreateMessage} />
    });
  };

  // opens share message form using the drawer
  const openShareForm = (id: string) => {
    setDrawerState({
      isOpen: true,
      title: 'Share Message',
      content: <ShareMessage id={id} />
    });
  };

  // opens generate link
  const openLinkForm = (id: string) => {
    setDrawerState({
      isOpen: true,
      title: 'Generate Link',
      content: <GenerateLink id={id} />
    });
  };

  // opens edit message form using the drawer
  const openEditForm = (message: Message) => {
    setDrawerState({
      isOpen: true,
      title: 'Create Message',
      content: <CreateMessage editableMessage={message} onSubmit={onCreateMessage} />
    });
  };

  // opens account formm using the drawer
  const openAccount = () => {
    setDrawerState({
      isOpen: true,
      title: 'Account',
      content: (
        <Account
          onLogout={logoutUser}
        />
      )
    });
  };

  // gets all the messages
  useEffect(() => {
    getMessages({
      token: auth.token,
      id: auth.id
    });
  }, []);

  // sets fetchted messages to local state
  useEffect(() => {
    if (result.error === '' && result.response !== null && !result.loading) {
      setMessageList(result.response);
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
      <Layout
        isBlurred={drawerState.isOpen}
        onUserClick={openAccount}
      >
        <MessageList>
          {messageList.length > 0
            ? messageList.map(item => (
              <MessageItem
                key={item.id}
                message={item}
                onShare={openShareForm}
                onLink={openLinkForm}
                onEdit={openEditForm}
              />
            ))
            : <>No result</>}
        </MessageList>
        <FloatingButton onClick={openCreateForm} />
      </Layout>
      <Drawer
        open={drawerState.isOpen}
        onClose={closeDrawer}
        title={drawerState.title}
      >
        {drawerState.content}
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

export default MePage;
