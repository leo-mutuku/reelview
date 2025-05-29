import { type Navigation } from '@toolpad/core/AppProvider';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import {Description as DescriptionIcon} from '@mui/icons-material';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Movie' },
   {
    segment: 'sales',
    title: 'Movie',
    icon: <SmartDisplayIcon />,
    children: [
      { segment: 'sales', title: 'Popular', icon: <DescriptionIcon /> },
        { segment: 'traffic', title: 'Now Playing', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Upcoming', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Top Rated', icon: <DescriptionIcon /> },
    ],
  },
  { kind: 'divider' },
  { kind: 'header', title: 'TV' },
  {
    segment: 'TV-Shows',
    title: 'TV Shows',
    icon: <LiveTvIcon />,
    children: [
      { segment: 'sales', title: 'Popular', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Now Playing', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Upcoming', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Top Rated', icon: <DescriptionIcon /> },
    ],
  },
  
];

export default NAVIGATION;