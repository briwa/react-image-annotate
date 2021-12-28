import { useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import { DRAWER_WIDTH } from './constants';
import { useInitializeCanvas, useKeys, useContentSize, useToggleSider } from './hooks';

import BaseImageInput from './components/BaseImageInput';
import FabricCanvas from './components/FabricCanvas';
import WelcomeText from './components/WelcomeText';
import Sider from './components/Sider';

const CanvasContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function AppContent() {
  const baseImage = useSelector((state) => state.canvas.baseImage);
  const [isSiderOpened, triggerToggleSider] = useToggleSider();

  useInitializeCanvas();
  useKeys();
  useContentSize();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={isSiderOpened}>
          <Toolbar sx={{ pr: '24px' }} >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={triggerToggleSider}
              sx={{
                marginRight: '36px',
                ...(isSiderOpened && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome.
            </Typography>
          </Toolbar>
        </AppBar>
        <Sider />
        <Box
          id="main-content" 
          component="main"
          sx={{
            flexGrow: 1,
            height: 'calc(100vh - 4rem)',
            overflow: 'auto',
            mt: 8,
          }}
        >
          { !baseImage && <WelcomeText /> }
          <CanvasContainer id="canvas-container">
            <canvas id="canvas"></canvas>
          </CanvasContainer>
        </Box>
      </Box>
      <BaseImageInput />
      <FabricCanvas />
    </ThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}