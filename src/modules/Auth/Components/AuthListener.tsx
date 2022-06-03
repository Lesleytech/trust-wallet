import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { login, logout } from '../../../store/slices/auth';
import { auth } from '../../../utils/firebase';

const AuthListener: FC<{ children?: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const _user = {
          uid: user.uid,
          email: user.email as string,
          fullName: user.displayName as string,
        };

        localStorage.setItem('auth_user', JSON.stringify(_user));
        dispatch(login(_user));
      } else {
        localStorage.removeItem('auth_user');
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <>{children}</>;
};

export { AuthListener };
