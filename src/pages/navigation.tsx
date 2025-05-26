import { type Navigation } from '@toolpad/core/AppProvider';
import {
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  Layers as LayersIcon,
} from '@mui/icons-material';

const NAVIGATION: Navigation = [
  { kind: 'header', title: '' },
   {
    segment: 'sales',
    title: 'Sales',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'inventory', title: 'Inventory', icon: <ShoppingCartIcon /> },
  { segment: 'procurement', title: 'Procurement', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

export default NAVIGATION;