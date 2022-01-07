import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter,
  Routes,
  Route,
  useMatch,
} from 'react-router-dom';

import { DRAWER_WIDTH } from './constants';
import { useToggleSider } from './hooks';

import EditorPage from './pages/Editor';
import AboutPage from './pages/About';
import CustomRouterLink from './components/CustomRouterLink';

import packageJson from '../package.json';

const BASE_URL = packageJson.homepage.split('/').pop();

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

const MainContent = () => {
  const [isSiderOpened, triggerToggleSider] = useToggleSider();
  const isAboutPage = useMatch('about');
  const shouldHaveSider = !isAboutPage && isSiderOpened;
  const toggleIcon = isAboutPage
    ? null
    : (
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={triggerToggleSider}
        sx={{
          marginRight: '36px',
          ...(shouldHaveSider && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
    );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={shouldHaveSider}>
        <Toolbar sx={{ pr: '24px' }} >
          {toggleIcon}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <CustomRouterLink to="">Home</CustomRouterLink>
            <CustomRouterLink to="about">About</CustomRouterLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="about" element={<AboutPage />}/>
        <Route index element={<EditorPage />}/>
      </Routes>
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter basename={BASE_URL}>
        <MainContent />
      </BrowserRouter>
  </ThemeProvider>
  );
}