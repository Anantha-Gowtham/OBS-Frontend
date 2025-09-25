import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, Work, AdminPanelSettings } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import DemoModeIndicator from '../components/DemoModeIndicator';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { value: 'ADMIN', label: 'System Administrator', icon: <AdminPanelSettings />, color: 'error.main' },
    { value: 'MANAGER', label: 'Branch Manager', icon: <Work />, color: 'warning.main' },
    { value: 'USER', label: 'Customer', icon: <AccountBalance />, color: 'success.main' }
  ];

  const demoCredentials = [
    { username: 'admin', password: 'admin123', role: 'ADMIN' },
    { username: 'manager', password: 'manager123', role: 'MANAGER' },
    { username: 'user', password: 'user123', role: 'USER' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData.username, formData.password);

      if (response.success) {
        // Navigate based on role
        switch (response.user.role) {
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          case 'MANAGER':
            navigate('/manager/dashboard');
            break;
          case 'USER':
            navigate('/user/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    const credential = demoCredentials.find(cred => cred.role === role);
    if (credential) {
      setFormData({
        username: credential.username,
        password: credential.password
      });
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: 'primary.main', // Solid black background
      display: 'flex',
      alignItems: 'center',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Enhanced Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            OBS Banking System
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'rgba(255,255,255,0.8)',
            fontSize: { xs: '1rem', md: '1.25rem' },
            maxWidth: '500px',
            mx: 'auto'
          }}>
            Login to your account
          </Typography>
          <Box sx={{ 
            width: 80, 
            height: 4, 
            bgcolor: 'white', 
            mx: 'auto',
            borderRadius: 2,
            mt: 3,
            mb: 4,
            opacity: 0.8
          }} />
        </Box>

        {/* Enhanced Login Container with Perfect Center Alignment */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          '& > *': {
            maxWidth: { xs: '100%', md: '450px' },
            width: '100%'
          }
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0, md: 4 }, 
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            width: '100%',
            maxWidth: '900px'
          }}>
          {/* Enhanced Login Form */}
          <Paper sx={{ 
            p: { xs: 3, md: 5 }, 
            flex: 1, 
            maxWidth: 450,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.98)',
            mb: { xs: 4, md: 0 }
          }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
              Sign In
            </Typography>

            <DemoModeIndicator />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                autoComplete="username"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mb: 2, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ mb: 1 }}
              >
                Back to Home
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/register')}
              >
                Don't have an account? Register
              </Button>
            </form>
          </Paper>

          {/* Enhanced Demo Credentials */}
          <Card sx={{ 
            flex: 1, 
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255,255,255,0.95)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                Demo Credentials
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                Click any role below to auto-fill login credentials:
              </Typography>

              {roles.map((role) => {
                const credential = demoCredentials.find(cred => cred.role === role.value);
                return (
                  <Card 
                    key={role.value} 
                    sx={{ 
                      mb: 2, 
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'grey.300',
                      '&:hover': {
                        backgroundColor: 'grey.50',
                        borderColor: role.color
                      }
                    }}
                    onClick={() => fillDemo(role.value)}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ color: role.color }}>
                          {role.icon}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {role.label}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Username: <strong>{credential?.username}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Password: <strong>{credential?.password}</strong>
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}

              <Alert severity="info" sx={{ mt: 2 }}>
                This is a demo system. In production, use your actual credentials.
              </Alert>
            </CardContent>
          </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
