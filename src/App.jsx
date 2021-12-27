import * as React from 'react';
import { useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useInitializeCanvas, useKeys, useContentSize } from './hooks';

import BaseImageInput from './components/BaseImageInput';
import FabricCanvas from './components/FabricCanvas';
import Sider from './components/Sider';

const CanvasContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const mdTheme = createTheme();

function AppContent() {
  useInitializeCanvas();
  useKeys();
  useContentSize();

  const baseImage = useSelector((state) => state.canvas.baseImage);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar sx={{ pr: '24px' }} >
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
          { !baseImage && <Typography id="no-image-set">No image set. Please set an image before proceeding.</Typography> }
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