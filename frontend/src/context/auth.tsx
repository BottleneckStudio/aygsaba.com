import React, { useEffect, useState, useMemo, FC } from 'react';

import { DefaultOptions } from '../types/layout-options';
import { Auth } from '../types/models';

const initialState: Auth = {
  token: '',
  username: '',
  image: ''
};

// eslint-disable-next-line no-spaced-func
export const AuthContext = React.createContext<{
  auth: Auth,
  setAuth: (c: Auth) => void
}>({
  auth: initialState,
  setAuth: () => {}
});

const AuthProvider: FC<DefaultOptions> = ({ children }) => {
  const localAuth = localStorage.getItem('auth');
  const [auth, setAuth] = useState<Auth>(
    localAuth !== null
      ? JSON.parse(localAuth)
      : initialState
  );

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
