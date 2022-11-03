import { useCallback, useState } from 'react';
import axios from 'axios';

import endpoints from './api.endpoints';
import { Auth, Message } from '../types/models';
import {
  LoginPayloadType,
  GetUserMessagePayloadType,
  GetMessagePayloadType,
  CreateMessagePayloadType
} from '../types/payloads';

const useService = () => {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const setInitial = useCallback(() => {
    setResponse(null);
    setError('');
    setLoading(true);
  }, []);

  const loginUser = useCallback(async (
    login: LoginPayloadType
  ) => {
    const { token } = login;

    try {
      const res = await axios.get(
        `${endpoints.baseUrl}/api/v1/test`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResponse(res.data as Auth);
      setLoading(false);
    } catch (err) {
      setError('Error logging in user');
      setLoading(false);
    }
  }, []);

  const getMessages = useCallback(async (
    userMessagePayload: GetUserMessagePayloadType
  ) => {
    const { token, userId } = userMessagePayload;

    try {
      const res = await axios.get(
        `${endpoints.baseUrl}/api/v1${endpoints.messages}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { id: userId }
        }
      );

      setResponse(res.data as Message[]);
      setLoading(false);
    } catch (err) {
      setError('Failed fetching messages');
      setLoading(false);
    }
  }, []);

  const getMessage = useCallback(async (
    getMessagePayload: GetMessagePayloadType
  ) => {
    const { token, id } = getMessagePayload;

    try {
      const res = await axios.get(
        `${endpoints.baseUrl}/api/v1${endpoints.messages}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResponse(res.data as Message);
      setLoading(false);
    } catch (err) {
      setError('Error fetching user messages');
      setLoading(false);
    }
  }, []);

  const createMessage = useCallback(async (
    createMessagePayload: CreateMessagePayloadType
  ) => {
    const {
      token,
      title,
      content,
      hideByView,
      limit,
      userId
    } = createMessagePayload;

    try {
      const res = await axios.post(
        `/api${endpoints.messages}`,
        {
          title,
          content,
          hideByView,
          limit,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResponse(res.data as Message[]);
      setLoading(false);
    } catch (err) {
      setError('Error creating message');
      setLoading(false);
    }
  }, []);

  return {
    actions: {
      loginUser,
      getMessages,
      getMessage,
      createMessage,
      setInitial
    },
    result: {
      response,
      error,
      loading
    }
  };
};

export default useService;
