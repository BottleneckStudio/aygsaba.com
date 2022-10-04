import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';

import { AuthContext } from '../../../context/auth';
import useService from '../../../services/http.service';
import { Message } from '../../../types/models';
import MessageItem from './message';
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

  const [messageList, setMessageList] = useState<Message[]>([]);
  const { actions: { getMessages }, result } = useService();

  useEffect(() => {
    getMessages({ token: auth.token });
  }, []);

  useEffect(() => {
    if (result.error === '' && result.response !== null && !result.loading) {
      setMessageList(result.response);
    }
  }, [result]);

  return (
    <Layout>
      <MessageList>
        {messageList.length > 0
          ? messageList.map(item => (
            <MessageItem key={item.id} message={item} />
          ))
          : <>No result</>}
      </MessageList>
      <FloatingButton />
    </Layout>
  );
};

export default MePage;
