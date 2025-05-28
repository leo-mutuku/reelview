import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;