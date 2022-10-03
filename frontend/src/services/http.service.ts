import { useEffect, useState } from 'react';
import axios from 'axios';

import endpoints from './api.endpoints';
import { Auth } from '../types/models';

const useLoginUser = () => {
  const [response, setResponse] = useState<Auth | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLogin = () => {
    axios.post(`/api${endpoints.signin}`)
    .then(res => setResponse(res.data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => fetchLogin(), []);

  return { response, error, loading };
};

export default useLoginUser;
