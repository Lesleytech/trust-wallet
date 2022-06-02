import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../../store/types';

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  if (!currentUser) return <Navigate to="/auth/login" replace />;

  return children;
};

export { ProtectedRoute };
