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
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountBalance, Person, Work, AdminPanelSettings } from '@mui/icons-material';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = [
    { value: 'USER', label: 'Customer', icon: <AccountBalance />, description: 'Regular banking customer' },
    { value: 'EMPLOYEE', label: 'Employee', icon: <Person />, description: 'Bank employee (requires approval)' },
    { value: 'MANAGER', label: 'Manager', icon: <Work />, description: 'Bank manager (requires approval)' },
    { value: 'ADMIN', label: 'Administrator', icon: <AdminPanelSettings />, description: 'System administrator (restricted)' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For demo purposes, we'll simulate registration
      // In production, this would call the backend API
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if username already exists (demo check)
      const existingUsers = ['admin', 'manager', 'employee', 'user'];
      if (existingUsers.includes(formData.username.toLowerCase())) {
        setError('Username already exists. Please choose a different username.');
        return;
      }

      // Simulate successful registration
      setSuccess('Registration successful! You can now login with your credentials.');
      
      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
            Create your account
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

        {/* Enhanced Registration Form with Perfect Center Alignment */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Paper sx={{ 
            p: { xs: 3, md: 5 }, 
            maxWidth: 600,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.98)'
          }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{ mt: 2, mb: 2 }}
              helperText="Choose a unique username"
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Account Type"
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {role.icon}
                      <Box>
                        <Typography variant="body1">{role.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              helperText="Minimum 6 characters"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
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
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Button>
          </form>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Note:</strong> Employee, Manager, and Admin accounts require approval. 
              Customer accounts are activated immediately.
            </Typography>
          </Alert>
        </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
