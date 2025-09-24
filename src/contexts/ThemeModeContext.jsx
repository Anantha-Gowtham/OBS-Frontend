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
      primary: { main: '#1C2A52', light: '#243665', dark: '#121B38', contrastText: '#ffffff' },
      secondary: { main: '#FFD700', light: '#FFE077', dark: '#C7A600', contrastText: '#121B38' },
      success: { main: '#3C9D72', dark: '#277051', light: '#60B78E', contrastText: '#ffffff' },
      error: { main: '#DC3545', dark: '#A62633', light: '#E35D6A', contrastText: '#ffffff' },
      warning: { main: '#FFB84D', dark: '#C88724', light: '#FFCE80', contrastText: '#121B38' },
      info: { main: '#3C9D72', dark: '#277051', light: '#60B78E', contrastText: '#ffffff' },
      background: { default: '#F4F6F9', paper: '#FFFFFF' },
      divider: '#D3D8E2',
      text: { primary: '#1F2532', secondary: '#5A6475' }
    } : {
      mode: 'dark',
      primary: { main: '#121B38', light: '#1C2A52', dark: '#0A1020', contrastText: '#EAEAEA' },
      secondary: { main: '#FFD700', light: '#FFE077', dark: '#C7A600', contrastText: '#121B38' },
      success: { main: '#FFB84D', dark: '#C88724', light: '#FFCE80', contrastText: '#121B38' },
      error: { main: '#DC3545', dark: '#A62633', light: '#FF5C6B', contrastText: '#EAEAEA' },
      warning: { main: '#FFB84D', dark: '#C88724', light: '#FFCE80', contrastText: '#121B38' },
      info: { main: '#3C9D72', dark: '#277051', light: '#60B78E', contrastText: '#EAEAEA' },
      background: { default: '#2C2C2C', paper: '#1A2235' },
      divider: '#38445C',
      text: { primary: '#EAEAEA', secondary: '#B5BCC9' }
    },
    ...commonTokens,
    typography: { ...commonTokens.typography, h1: { fontSize: '2.25rem', fontWeight: 600 }, h2: { fontSize: '1.9rem', fontWeight: 600 } }
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