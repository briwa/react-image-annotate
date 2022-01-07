import Typography from '@mui/material/Typography';

import {
  Link as RouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

const CustomRouterLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <RouterLink
      style={{ textDecoration: 'none' }}
      to={to}
      {...props}
    >
      <Typography
        variant='span'
        sx={{
          mr: 3,
          color: 'white',
          textDecoration: 'none',
          borderBottom: match ? '2px solid white' : 'none',
        }}
      >
        {children}
      </Typography>
    </RouterLink>
  );
};

export default CustomRouterLink;
