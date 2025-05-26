import { HashRouter as Router } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Routes, Route, useLocation } from 'react-router-dom';

import SalesPage from './reports/salesPage';
import Dashboard from "./dashboard/Dashboard"
import { useReactRouterAdapter } from './reactRouterAdapter';
import NAVIGATION from './navigation';
import { FaBolt } from "react-icons/fa6";

// Theme
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Page content
function PageContent() {
  const location = useLocation();
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5">Your content for: {location.pathname}</Typography>
    </Box>
  );
}

// Layout Wrapper
function LayoutWrapper() {
  const router = useReactRouterAdapter();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'SwiftaPay',
        logo: <FaBolt style={{ marginRight: 1 }} />,
        homeUrl: '/',
      }}
    >
      <Box
        sx={{
          '& .MuiToolbar-root .MuiTypography-h6': {
            display: 'inline',
          },
          '& .MuiToolbar-root': {
            position: 'relative',
            zIndex: 10,
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 32,
            zIndex: 1000,
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'primary.main',
          }}
        >
          <Typography variant="h6"></Typography>
        </Box>

        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<PageContent />} />
            <Route path="/inventory" element={<PageContent />} />
            <Route path="/procurement" element={<PageContent />} />
            <Route path="/reports/sales" element={<SalesPage />} />
            <Route path="/reports/traffic" element={<PageContent />} />
            <Route path="/integrations" element={<PageContent />} />
          </Routes>
        </DashboardLayout>
      </Box>
    </AppProvider>
  );
}

// Router Component
export default function AppRouter() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}