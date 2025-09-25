import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

const commonTokens = {
  typography: { fontFamily: '"Inter","Segoe UI","Roboto","Helvetica","Arial",sans-serif' },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: { styleOverrides: { root: { transition: 'background-color .5s ease, color .45s ease, border-color .45s ease' } } },
    MuiCard: { styleOverrides: { root: { transition: 'background-color .5s ease, color .45s ease, box-shadow .45s ease' } } },
    MuiAppBar: { styleOverrides: { root: { transition: 'background-color .5s ease, color .45s ease, box-shadow .45s ease' } } },
  }
};

export const ThemeModeProvider = ({ children }) => {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('obs-theme-mode') : null;
  const [mode, setMode] = useState(stored || (prefersDark ? 'dark' : 'light'));

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark-theme'); else root.classList.remove('dark-theme');
  }, [mode]);

  const toggleMode = () => setMode((m) => m === 'light' ? 'dark' : 'light');

  // Persist
  useEffect(() => {
    try { window.localStorage.setItem('obs-theme-mode', mode); } catch { /* ignore */ }
  }, [mode]);

  // React to system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const storedPref = window.localStorage.getItem('obs-theme-mode');
      if (!storedPref) setMode(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const theme = useMemo(() => createTheme({
    palette: mode === 'light' ? {
      mode: 'light',
      primary: { main: '#000000', light: '#333333', dark: '#000000', contrastText: '#FFFFFF' }, // Black as primary
      secondary: { main: '#F5F1E9', light: '#FAF7F0', dark: '#CFC7B8', contrastText: '#000000' }, // Cream tones
      background: { default: '#FAFAFA', paper: '#FFFFFF' }, // White / off-white backgrounds
      text: {
        primary: '#1A1A1A', // Almost black text for readability
        secondary: '#555555', // Medium grey for secondary text
      },
      divider: '#D0D0D0', // Light grey divider
      success: { main: '#4CAF50', light: '#80E27E', dark: '#087F23', contrastText: '#fff' },
      warning: { main: '#FFA000', light: '#FFC947', dark: '#C67100', contrastText: '#fff' },
      error: { main: '#D32F2F', light: '#FF6659', dark: '#9A0007', contrastText: '#fff' },
      info: { main: '#1976D2', light: '#63A4FF', dark: '#004BA0', contrastText: '#fff' },
    } : {
      mode: 'dark',
      primary: { main: '#FFFFFF', light: '#CCCCCC', dark: '#FFFFFF', contrastText: '#000000' }, // White as primary in dark mode
      secondary: { main: '#2A2A2A', light: '#404040', dark: '#1A1A1A', contrastText: '#FFFFFF' }, // Dark tones for dark mode
      background: { default: '#121212', paper: '#1E1E1E' }, // Dark backgrounds
      text: {
        primary: '#FFFFFF', // White text for dark mode
        secondary: '#AAAAAA', // Light grey for secondary text
      },
      divider: '#444444', // Dark grey divider
      success: { main: '#4CAF50', light: '#80E27E', dark: '#087F23', contrastText: '#fff' },
      warning: { main: '#FFA000', light: '#FFC947', dark: '#C67100', contrastText: '#000' },
      error: { main: '#F44336', light: '#FF6659', dark: '#D32F2F', contrastText: '#fff' },
      info: { main: '#2196F3', light: '#63A4FF', dark: '#1976D2', contrastText: '#fff' },
    },
    ...commonTokens,
    typography: { 
      ...commonTokens.typography, 
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 700, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      h2: { fontSize: '2rem', fontWeight: 600, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      h3: { fontSize: '1.75rem', fontWeight: 600, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      h4: { fontSize: '1.5rem', fontWeight: 600, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      h5: { fontSize: '1.25rem', fontWeight: 600, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      h6: { fontSize: '1rem', fontWeight: 600, color: mode === 'light' ? '#000000' : '#FFFFFF' },
      body1: { fontSize: '1rem', color: mode === 'light' ? '#1A1A1A' : '#FFFFFF' },
      body2: { fontSize: '0.875rem', color: mode === 'light' ? '#555555' : '#AAAAAA' },
    },
    components: {
      ...commonTokens.components,
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: mode === 'light' ? '0 3px 10px rgba(0,0,0,0.1)' : '0 3px 10px rgba(0,0,0,0.3)',
            backgroundColor: mode === 'light' ? '#F5F1E9' : '#1E1E1E', // Cream background for cards in light mode
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light' ? '0 10px 20px rgba(0,0,0,0.15)' : '0 10px 20px rgba(0,0,0,0.4)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
          },
          containedPrimary: {
            backgroundColor: mode === 'light' ? '#000000' : '#FFFFFF',
            color: mode === 'light' ? '#FFFFFF' : '#000000',
            boxShadow: mode === 'light' ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(255,255,255,0.4)',
            '&:hover': {
              backgroundColor: mode === 'light' ? '#333333' : '#CCCCCC',
              boxShadow: mode === 'light' ? '0 6px 16px rgba(0,0,0,0.5)' : '0 6px 16px rgba(255,255,255,0.5)',
            },
          },
          outlinedSecondary: {
            borderColor: mode === 'light' ? '#F5F1E9' : '#404040',
            color: mode === 'light' ? '#000000' : '#FFFFFF',
            '&:hover': {
              backgroundColor: mode === 'light' ? '#F5F1E9' : '#404040',
              borderColor: mode === 'light' ? '#CFC7B8' : '#606060',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            fontWeight: 600,
            backgroundColor: mode === 'light' ? '#E0DED8' : '#404040', // light greyish cream / dark grey
            color: mode === 'light' ? '#000000' : '#FFFFFF',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          },
        },
      },
    }
  }), [mode]);

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeContext;