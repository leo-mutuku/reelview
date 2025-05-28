import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayoutBasic from './pages/DashboardLayout';

const App: React.FC = () => {
  return (
    <ProtectedRoute>
      <DashboardLayoutBasic />
    </ProtectedRoute>
  );
};

export default App;