import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import SiderAddIcons from './SiderAddIcons';
import SiderBaseImage from './SiderBaseImage';
import SiderDownloads from './SiderDownloads';
import SiderProperties from './SiderProperties';

const Drawer = styled(MuiDrawer)({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    boxSizing: 'border-box',
  },
});

const Sider = () => {
  return (
    <Drawer variant="permanent">
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
    </Toolbar>
    <Divider />
    <List>
      <SiderBaseImage />
      <SiderAddIcons />
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
