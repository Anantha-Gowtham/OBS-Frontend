import React from 'react';
import { Box } from '@mui/material';

/** Simple animated skeleton block */
const SkeletonBlock = ({ height = 16, width = '100%', radius = 8, shimmer = true, sx = {} }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        borderRadius: radius,
        height,
        width,
        ...sx,
        '&:after': shimmer ? {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          transform: 'translateX(-100%)',
          animation: 'skeleton-slide 1.4s linear infinite'
        } : {}
      }}
    />
  );
};

export default SkeletonBlock;
