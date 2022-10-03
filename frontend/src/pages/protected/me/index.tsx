import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';

import { AuthContext } from '../../../context/auth';

const MePage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.token === '') {
      navigate('/', { replace: true });
    }
  }, [auth]);

  return (
    <Layout>
      {auth.username}
    </Layout>
  );
};

export default MePage;
