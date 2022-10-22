import { useCallback, useState } from 'react';
import axios from 'axios';

import endpoints from './api.endpoints';
import { Auth, Message } from '../types/models';

const useService = () => {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const setInitial = useCallback(() => {
    setResponse(null);
    setError('');
    setLoading(true);
  }, []);

  const loginUser = useCallback(({ token }: { token: string }) => {
    axios.get(`${endpoints.baseUrl}/api/v1/test`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setResponse(res.data as Auth))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  const getMessages = useCallback(({ token, id }: { token: string, id: string }) => {
    axios.get(`/api${endpoints.messages}`, {
      headers: { token },
      params: { id }
    })
    .then(res => setResponse(res.data as Message[]))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  const getMessage = useCallback(({ id, token }: { id: string, token: string }) => {
    axios.get(`/api${endpoints.messages}/${id}`, {
      headers: { token }
    })
    .then(res => setResponse(res.data as Message))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  const createMessage = useCallback((message: Message & { token: string }) => {
    const { token } = message;

    axios.post(
      `/api${endpoints.messages}`,
      message,
      { headers: { token } }
    )
    .then(res => setResponse(res.data as Message[]))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
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
