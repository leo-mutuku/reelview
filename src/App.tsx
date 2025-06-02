import React, { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayoutBasic from './pages/DashboardLayout';

const App: React.FC = () => {
  useEffect(() => {
    // Apply global styles to prevent scroll and set full height
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');

    if (html) {
      html.style.margin = '0';
      html.style.padding = '0';
      html.style.height = '100%';
      html.style.overflow = 'hidden';
    }
    if (body) {
      body.style.margin = '0';
      body.style.padding = '0';
      body.style.height = '100%';
      body.style.overflow = 'hidden';
    }
    if (root) {
      root.style.height = '100%';
      root.style.overflow = 'hidden';
    }

    // Cleanup on unmount (optional)
    return () => {
      if (html) {
        html.style.margin = '';
        html.style.padding = '';
        html.style.height = '';
        html.style.overflow = '';
      }
      if (body) {
        body.style.margin = '';
        body.style.padding = '';
        body.style.height = '';
        body.style.overflow = '';
      }
      if (root) {
        root.style.height = '';
        root.style.overflow = '';
      }
    };
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayoutBasic />
    </ProtectedRoute>
  );
};

export default App;
