import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Drawer from '../../../components/Drawer';

import { AuthContext } from '../../../context/auth';
import useService from '../../../services/http.service';
import { Message } from '../../../types/models';
import MessageItem from './messageItem';

import CreateMessage from './createMessage';
import ShareMessage from './shareMessage';

import {
  MessageList,
  FloatingButton
} from './components';

const MePage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  if (auth.token === '') {
    navigate('/', { replace: true });
  }

  // api service
  const { actions: { getMessages }, result } = useService();

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode | null>(null);
  const [drawerTitle, setDrawerTitle] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const closeDrawer = () => setOpenDrawer(false);

  const onCreateMessage = () => {
    closeDrawer();
    getMessages({ token: auth.token });
  };

  const openSubjectForm = () => {
    setOpenDrawer(true);
    setDrawerTitle('Create Message');
    setDrawerContent(<CreateMessage onSubmit={onCreateMessage} />);
  };

  const openShareForm = (message: Message) => {
    setOpenDrawer(true);
    setDrawerTitle('Share Message');
    setDrawerContent(<ShareMessage message={message} />);
  };

  useEffect(() => {
    getMessages({ token: auth.token });
  }, []);

  useEffect(() => {
    if (result.error === '' && result.response !== null && !result.loading) {
      setMessageList(result.response);
    }
  }, [result]);

  return (
    <>
      <Layout isBlurred={openDrawer}>
        <MessageList>
          {messageList.length > 0
            ? messageList.map(item => (
              <MessageItem
                key={item.id}
                message={item}
                onShare={openShareForm}
              />
            ))
            : <>No result</>}
        </MessageList>
        <FloatingButton onClick={openSubjectForm} />
      </Layout>
      <Drawer
        open={openDrawer}
        onClose={closeDrawer}
        title={drawerTitle}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MePage;
