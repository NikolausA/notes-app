import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || auth.user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
