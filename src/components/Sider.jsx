import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import SiderAddIcons from './SiderAddIcons';
import SiderAddText from './SiderAddText';
import SiderBaseImage from './SiderBaseImage';
import SiderDownloads from './SiderDownloads';
import SiderProperties from './SiderProperties';

import { DRAWER_WIDTH } from '../constants';
import { useToggleSider } from '../hooks';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Sider = () => {
  const [isSiderOpened, triggerToggleSider] = useToggleSider();

  return (
    <Drawer variant="permanent" open={isSiderOpened}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={triggerToggleSider}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List>
      <SiderBaseImage />
      <SiderAddIcons />
      <SiderAddText />
      <SiderDownloads />
    </List>
    <Divider />
    <List>
      <SiderProperties />
    </List>
  </Drawer>
  );
};

export default Sider;
