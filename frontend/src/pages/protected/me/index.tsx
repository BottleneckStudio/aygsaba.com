import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Drawer from '../../../components/Drawer';

import { AuthContext } from '../../../context/auth';
import useService from '../../../services/http.service';
import { Message } from '../../../types/models';
import MessageItem from './message';

import CreateMessage from './createMessage';

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

  const [showAddSubject, setShowAddSubject] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { actions: { getMessages }, result } = useService();

  const handleShowSubjectForm = () => setShowAddSubject(true);

  const handleCloseSubjectForm = () => setShowAddSubject(false);

  const onCreateMessage = () => {
    handleCloseSubjectForm();
    getMessages({ token: auth.token });
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
      <Layout isBlurred={showAddSubject}>
        <MessageList>
          {messageList.length > 0
            ? messageList.map(item => (
              <MessageItem key={item.id} message={item} />
            ))
            : <>No result</>}
        </MessageList>
        <FloatingButton onClick={handleShowSubjectForm} />
      </Layout>
      <Drawer
        open={showAddSubject}
        onClose={handleCloseSubjectForm}
        title="Create Message"
      >
        <CreateMessage onSubmit={onCreateMessage} />
      </Drawer>
    </>
  );
};

export default MePage;
