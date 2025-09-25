import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import {
  Security,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Error,
  Warning,
  Lock,
  ArrowBack
} from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(false);
  const [tokenValidating, setTokenValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  useEffect(() => {
    validateToken();
  }, [token]);

  useEffect(() => {
    if (formData.newPassword) {
      checkPasswordStrength(formData.newPassword);
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  }, [formData.newPassword]);

  const validateToken = async () => {
    if (!token) {
      setError('Invalid or missing reset token');
      setTokenValid(false);
      setTokenValidating(false);
      return;
    }

    try {
      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock token validation (in real app, make API call)
      if (token === 'invalid') {
        setError('Reset token has expired or is invalid');
        setTokenValid(false);
      } else {
        setTokenValid(true);
      }
    } catch (err) {
      setError('Failed to validate reset token');
      setTokenValid(false);
    } finally {
      setTokenValidating(false);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    // Common patterns check
    if (!/(.)\1{2,}/.test(password) && !/123|abc|password|qwerty/i.test(password)) {
      score += 1;
    } else {
      feedback.push('Avoid common patterns');
    }

    setPasswordStrength({ score, feedback });
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Very Weak', color: 'error' };
      case 2:
        return { label: 'Weak', color: 'warning' };
      case 3:
        return { label: 'Fair', color: 'info' };
      case 4:
        return { label: 'Good', color: 'primary' };
      case 5:
      case 6:
        return { label: 'Strong', color: 'success' };
      default:
        return { label: 'Unknown', color: 'default' };
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError('Please enter a new password');
      return false;
    }

    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please choose a stronger password.');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Password reset successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successfully. Please log in with your new password.' }
        });
      }, 2000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValidating) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main' // Solid black background
      }}>
        <Card sx={{ maxWidth: 400, width: '100%', m: 2 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6">Validating Reset Token</Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we verify your reset link...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!tokenValid) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main' // Solid black background
      }}>
        <Card sx={{ maxWidth: 500, width: '100%', m: 2 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Error sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Invalid Reset Link
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error || 'This password reset link is invalid or has expired.'}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/forgot-password"
              sx={{ mr: 2 }}
            >
              Request New Link
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary.main', // Solid black background
      p: 2
    }}>
      <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Lock sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Set New Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a strong, secure password for your account
            </Typography>
          </Box>

          {/* Alerts */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          {/* Form */}
          <Box>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Password Strength
                  </Typography>
                  <Chip
                    label={getPasswordStrengthLabel(passwordStrength.score).label}
                    color={getPasswordStrengthLabel(passwordStrength.score).color}
                    size="small"
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(passwordStrength.score / 6) * 100}
                  color={getPasswordStrengthLabel(passwordStrength.score).color}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                {passwordStrength.feedback.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Missing: {passwordStrength.feedback.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <Box sx={{ mb: 2 }}>
                {formData.newPassword === formData.confirmPassword ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <CheckCircle sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="caption">Passwords match</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                    <Warning sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="caption">Passwords don't match</Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Password Requirements */}
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" fontWeight={500} gutterBottom>
                Password Requirements:
              </Typography>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    • At least 8 characters<br />
                    • Uppercase letter<br />
                    • Lowercase letter
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    • One number<br />
                    • Special character<br />
                    • No common patterns
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading || passwordStrength.score < 3 || formData.newPassword !== formData.confirmPassword}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              sx={{ mb: 2 }}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>

            <Divider sx={{ my: 2 }} />

            {/* Footer */}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="text"
                component={Link}
                to="/login"
                startIcon={<ArrowBack />}
                sx={{ mb: 1 }}
              >
                Back to Login
              </Button>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact our support team
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
