import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const WelcomeText = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          No image set.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Set an image to the canvas before proceeding.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default WelcomeText;
