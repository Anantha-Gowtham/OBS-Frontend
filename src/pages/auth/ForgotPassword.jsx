import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  IconButton,
  InputAdornment,
  Grid,
  Divider,
  Container,
  Link
} from '@mui/material';
import {
  Email,
  Phone,
  ArrowBack,
  Security,
  CheckCircle,
  Visibility,
  VisibilityOff,
  Send,
  Refresh
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState({
    identifier: '', // email or phone
    identifierType: 'email', // 'email' or 'phone'
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = ['Verify Identity', 'Enter OTP', 'Reset Password'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const detectIdentifierType = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
    
    if (emailRegex.test(value)) {
      return 'email';
    } else if (phoneRegex.test(value)) {
      return 'phone';
    }
    return 'unknown';
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.identifier) {
          setError('Please enter your email or phone number');
          return false;
        }
        const type = detectIdentifierType(formData.identifier);
        if (type === 'unknown') {
          setError('Please enter a valid email address or phone number');
          return false;
        }
        setFormData(prev => ({ ...prev, identifierType: type }));
        break;
      case 1:
        if (!formData.otp || formData.otp.length !== 6) {
          setError('Please enter the 6-digit OTP');
          return false;
        }
        break;
      case 2:
        if (!formData.newPassword) {
          setError('Please enter a new password');
          return false;
        }
        if (formData.newPassword.length < 8) {
          setError('Password must be at least 8 characters long');
          return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        break;
      default:
        break;
    }
    setError('');
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      if (activeStep === 0) {
        // Send OTP
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(`OTP sent to your ${formData.identifierType}`);
        setActiveStep(1);
        startResendTimer();
      } else if (activeStep === 1) {
        // Verify OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.otp === '123456') { // Mock OTP verification
          setActiveStep(2);
          setSuccess('OTP verified successfully');
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } else if (activeStep === 2) {
        // Reset password
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSuccess('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('OTP resent successfully');
      startResendTimer();
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      setError('');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}>
        <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow the steps below to reset your password securely
              </Typography>
            </Box>

          {/* Progress Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Alerts */}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          {/* Step 1: Verify Identity */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Enter Your Email or Phone Number
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We'll send you a verification code to reset your password
              </Typography>
              
              <TextField
                fullWidth
                label="Email Address or Phone Number"
                value={formData.identifier}
                onChange={(e) => handleInputChange('identifier', e.target.value)}
                placeholder="Enter your email or phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {detectIdentifierType(formData.identifier) === 'email' ? <Email /> : <Phone />}
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleNext}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Box>
          )}

          {/* Step 2: Enter OTP */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Enter Verification Code
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We've sent a 6-digit code to your {formData.identifierType} <br />
                <strong>{formData.identifier}</strong>
              </Typography>

              <TextField
                fullWidth
                label="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                inputProps={{ 
                  maxLength: 6,
                  style: { textAlign: 'center', fontSize: 20, letterSpacing: 4 }
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Didn't receive the code?
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || loading}
                  startIcon={<Refresh />}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 3: Reset Password */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Create New Password
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please create a strong password for your account
              </Typography>

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

              {/* Password Requirements */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" fontWeight={500} gutterBottom>
                  Password Requirements:
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  • At least 8 characters long<br />
                  • Include uppercase and lowercase letters<br />
                  • Include at least one number<br />
                  • Include at least one special character
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Link component={RouterLink} to="/login" style={{ color: 'inherit', fontWeight: 500 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Container>
  );
};

export default ForgotPassword;
