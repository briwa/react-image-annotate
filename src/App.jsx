import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { BaseImageInput, useInitializeCanvas, useKeys, useContentSize } from './fabric';
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
  const content = useContentSize();

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
          <Typography id="no-image-set">No image set. Please set an image before proceeding.</Typography>
          <CanvasContainer id="canvas-container">
            <canvas id="canvas"></canvas>
          </CanvasContainer>
        </Box>
      </Box>
      <BaseImageInput content={content} />
    </ThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}