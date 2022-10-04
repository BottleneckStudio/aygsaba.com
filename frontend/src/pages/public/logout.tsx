import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    setAuth({
      token: '',
      username: '',
      image: ''
    })
  }, []);

  useEffect(() => {
    if (auth.token === '') {
      navigate('/', { replace: true });
    }
  }, [auth]);

  return <>Logging out</>
};

export default LogoutPage;
