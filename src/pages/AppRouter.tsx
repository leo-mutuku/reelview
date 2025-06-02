import  { Suspense, lazy } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useReactRouterAdapter } from './reactRouterAdapter';
import NAVIGATION from './navigation';
import LiveTvIcon from '@mui/icons-material/LiveTv';

// Lazy load components
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const SalesPage = lazy(() => import('./reports/salesPage'));

// You can also lazy load other pages when you create them
const InventoryPage = lazy(() => import('./inventory/InventoryPage'))
const ProcurementPage = lazy(() => import('./procurement/ProcurementPage'))
const TrafficReportPage = lazy(() => import('./reports/ReportPage'))

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

// Loading component
function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
}

// Page content fallback for routes that don't have dedicated components yet
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

// Layout Wrapper with Suspense
function LayoutWrapper() {
  const router = useReactRouterAdapter();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'ReelView',
        logo: <LiveTvIcon style={{ marginRight: 1 }} />,
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
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<PageContent />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/procurement" element={<ProcurementPage />} />
              <Route path="/reports/sales" element={<SalesPage />} />
              <Route path="/reports/traffic" element={<TrafficReportPage />} />
            </Routes>
          </Suspense>
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