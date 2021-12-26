import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useInitializeCanvas, BaseImageInput } from './fabric';
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

  const [canvasContRect, setCanvasContRect] = React.useState(null);

  React.useLayoutEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      setCanvasContRect(mainContent.getBoundingClientRect());
    }

  }, [setCanvasContRect]);

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
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
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
      <BaseImageInput canvasContRect={canvasContRect} />
    </ThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}