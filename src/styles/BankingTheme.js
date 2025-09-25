// Banking Theme Configuration for Material-UI
import { createTheme } from '@mui/material/styles';

export const professionalTheme = createTheme({
  palette: {
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
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, color: '#000000' },
    h2: { fontSize: '2rem', fontWeight: 600, color: '#000000' },
    h3: { fontSize: '1.75rem', fontWeight: 600, color: '#000000' },
    h4: { fontSize: '1.5rem', fontWeight: 600, color: '#000000' },
    h5: { fontSize: '1.25rem', fontWeight: 600, color: '#000000' },
    h6: { fontSize: '1rem', fontWeight: 600, color: '#000000' },
    body1: { fontSize: '1rem', color: '#1A1A1A' },
    body2: { fontSize: '0.875rem', color: '#555555' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          backgroundColor: '#F5F1E9', // Cream background for cards
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
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
          color: '#FFFFFF',
        },
        containedPrimary: {
          backgroundColor: '#000000',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          '&:hover': {
            backgroundColor: '#333333',
            boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
          },
        },
        outlinedSecondary: {
          borderColor: '#F5F1E9',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#F5F1E9',
            borderColor: '#CFC7B8',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 600,
          backgroundColor: '#E0DED8', // light greyish cream
          color: '#000000',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
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
