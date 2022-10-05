import { useCallback, useState } from 'react';
import axios from 'axios';

import endpoints from './api.endpoints';
import { Auth, Message } from '../types/models';

const useService = () => {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLogin = useCallback(() => {
    axios.post(`/api${endpoints.signin}`)
    .then(res => setResponse(res.data as Auth))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }, []);

  const getMessages = useCallback(({ token }: { token: string }) => {
    axios.get(`/api${endpoints.messages}`, {
      headers: { token }
    })
    .then(res => setResponse(res.data as Message[]))
    .catch(err => setError(err))
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
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }, []);

  return {
    actions: {
      fetchLogin,
      getMessages,
      createMessage
    },
    result: {
      response,
      error,
      loading
    }
  };
};

export default useService;
