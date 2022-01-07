import Box from '@mui/material/Box';

const AboutPage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 'calc(100vh - 4rem)',
        overflow: 'auto',
        mt: 8,
        p: 4,
      }}
    >
      <h2>About</h2>
      <p>This about page is about...</p>
    </Box>
  );
};

export default AboutPage;
