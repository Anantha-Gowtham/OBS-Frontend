import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { ThemeModeProvider } from './contexts/ThemeModeContext';

// Theme now provided by ThemeModeProvider (light/dark toggle capable)

function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <Router>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default'
          }}>
            <AppRoutes />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;
