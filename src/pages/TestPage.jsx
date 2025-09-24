import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const TestPage = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        OBS Banking System
      </Typography>
      <Typography variant="h5" gutterBottom color="primary">
        Frontend is Working!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        If you can see this page, the React application is running correctly.
      </Typography>
      <Button variant="contained" color="primary">
        Test Button
      </Button>
    </Box>
  );
};

export default TestPage;
