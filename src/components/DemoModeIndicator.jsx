import React from 'react';
import { Alert, Box, Chip } from '@mui/material';
import { Cloud, CloudOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const DemoModeIndicator = () => {
  const { isDemoMode } = useAuth();

  if (isDemoMode === undefined) return null;

  return (
    <Box sx={{ mb: 2 }}>
      {isDemoMode ? (
        <Alert 
          severity="info" 
          icon={<CloudOff />}
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Box>
              <strong>Demo Mode Active</strong>
              <br />
              Backend server not available. Using demo data for testing.
            </Box>
            <Chip 
              label="DEMO" 
              color="info" 
              size="small" 
              sx={{ ml: 'auto' }}
            />
          </Box>
        </Alert>
      ) : (
        <Alert 
          severity="success" 
          icon={<Cloud />}
          sx={{ borderRadius: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Box>
              <strong>Connected to Backend</strong>
              <br />
              Live data from server.
            </Box>
            <Chip 
              label="LIVE" 
              color="success" 
              size="small" 
              sx={{ ml: 'auto' }}
            />
          </Box>
        </Alert>
      )}
    </Box>
  );
};

export default DemoModeIndicator;
