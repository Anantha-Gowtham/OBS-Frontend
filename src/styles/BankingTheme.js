// Banking Theme Configuration for Material-UI
import { createTheme } from '@mui/material/styles';

export const bankingTheme = createTheme({
  palette: {
    primary: { main: '#003366', light: '#0066CC', dark: '#001a33', contrastText: '#ffffff' },
    secondary: { main: '#0066CC', light: '#0099FF', dark: '#004C99', contrastText: '#ffffff' },
    background: { default: '#F5F5F5', paper: '#FFFFFF' },
    success: { main: '#28A745', light: '#52C76A', dark: '#1E7E34', contrastText: '#fff' },
    warning: { main: '#FFB020', light: '#FFCA66', dark: '#C68100', contrastText: '#1d2330' },
    error: { main: '#DC3545', light: '#E35D6A', dark: '#B02A37', contrastText: '#fff' },
    info: { main: '#0066CC', light: '#3393E6', dark: '#004C99', contrastText: '#fff' },
    divider: '#D4D9E2',
    text: { primary: '#333333', secondary: '#5A6475' }
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontSize: '2.4rem', fontWeight: 600, color: '#003366' },
  h2: { fontSize: '2rem', fontWeight: 600, color: '#003366' },
  h3: { fontSize: '1.75rem', fontWeight: 600, color: '#003366' },
  h4: { fontSize: '1.5rem', fontWeight: 600, color: '#003366' },
  h5: { fontSize: '1.25rem', fontWeight: 600, color: '#003366' },
  h6: { fontSize: '1rem', fontWeight: 600, color: '#003366' },
    body1: {
    fontSize: '1rem',
    color: '#333333',
    },
    body2: {
    fontSize: '0.875rem',
    color: '#5A6475',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
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
          padding: '10px 20px',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(26, 35, 126, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(26, 35, 126, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
  },
});

// Custom styled components
export const bankingStyles = {
  dashboardCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '25px',
    height: '100%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
    },
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '20px',
  },
  statIconPrimary: {
    backgroundColor: 'rgba(18, 27, 56, 0.1)',
    color: '#121B38',
  },
  statIconSuccess: {
    backgroundColor: 'rgba(255, 184, 77, 0.15)',
    color: '#FFB84D',
  },
  statIconWarning: {
    backgroundColor: 'rgba(255, 184, 77, 0.15)',
    color: '#FFB84D',
  },
  statIconInfo: {
    backgroundColor: 'rgba(60, 157, 114, 0.1)',
    color: '#3C9D72',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '5px',
    color: '#333',
  },
  statLabel: {
    color: '#666',
    fontSize: '14px',
  },
  quickActionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '15px 20px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    backgroundColor: 'white',
    color: '#121B38',
    textTransform: 'none',
    fontWeight: 600,
    transition: 'all 0.3s',
    '&:hover': {
      borderColor: '#121B38',
      backgroundColor: '#f0f4ff',
      transform: 'translateX(5px)',
    },
  },
  securityProgress: {
    height: '8px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  transactionRow: {
    '&:hover': {
      backgroundColor: 'rgba(18, 27, 56, 0.04)',
    },
  },
  pageHeader: {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  breadcrumb: {
    fontSize: '14px',
    color: '#666',
  },
};
