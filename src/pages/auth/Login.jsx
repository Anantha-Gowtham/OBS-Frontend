import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  Container,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OTPVerification from '../../components/OTPVerification';

const Login = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTPStep, setShowOTPStep] = useState(false); // Add this as backup

  const { login, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const steps = ['Enter Credentials', 'Verify OTP'];

  // Debug effect to track activeStep changes
  React.useEffect(() => {
    console.log('ActiveStep changed to:', activeStep);
  }, [activeStep]);

  // Debug effect to track otpData changes
  React.useEffect(() => {
    console.log('OtpData changed to:', otpData);
  }, [otpData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials.username, credentials.password);
      console.log('Login result:', result);
      
      if (result.success && (result.requiresOTP || result.requiresOtp)) {
        console.log('Setting OTP data and moving to step 1');
        setOtpData({ email: result.email, otp: '' });
        setShowOTPStep(true);
        setActiveStep(1);
        console.log('States set - showOTPStep: true, activeStep: 1');
      } else if (result.success) {
        // Direct login success (shouldn't happen with OTP enabled)
        const userRole = result.user?.role;
        switch (userRole) {
          case 'SUPER_ADMIN':
            navigate('/super-admin/dashboard', { replace: true });
            break;
          case 'ADMIN':
            navigate('/admin/dashboard', { replace: true });
            break;
          case 'MANAGER':
            navigate('/manager/dashboard', { replace: true });
            break;
          case 'EMPLOYEE':
            navigate('/employee/dashboard', { replace: true });
            break;
          default:
            navigate('/user/dashboard', { replace: true });
        }
      } else {
        console.log('Login failed:', result.message);
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login exception:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (otp) => {
    setError('');
    setLoading(true);

    try {
      const result = await verifyOTP(otpData.email, otp);
      
      if (result.success) {
        // Navigate based on user role
        const userRole = result.user?.role || user?.role;
        switch (userRole) {
          case 'SUPER_ADMIN':
            navigate('/super-admin/dashboard', { replace: true });
            break;
          case 'ADMIN':
            navigate('/admin/dashboard', { replace: true });
            break;
          case 'MANAGER':
            navigate('/manager/dashboard', { replace: true });
            break;
          case 'EMPLOYEE':
            navigate('/employee/dashboard', { replace: true });
            break;
          default:
            navigate('/user/dashboard', { replace: true });
        }
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials.username, credentials.password);
      
      if (result.success && result.requiresOTP) {
        setError('');
        // Show success message for OTP resent
      } else {
        setError('Failed to resend OTP');
      }
    } catch (error) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 450 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" component="h1" gutterBottom color="primary">
                OBS Banking
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Secure Login
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Debug Info */}
            <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>
              Debug: Active Step = {activeStep}, Show OTP = {showOTPStep.toString()}, OTP Email = {otpData.email}
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Step 1: Credentials */}
            {!showOTPStep && (
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  name="username"
                  label="Username or Email"
                  value={credentials.username}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoFocus
                  autoComplete="username"
                />
                
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || !credentials.username || !credentials.password}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Continue'}
                </Button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {showOTPStep && (
              <OTPVerification
                email={otpData.email}
                onVerify={handleOTPVerification}
                onResend={handleResendOTP}
                loading={loading}
              />
            )}

            {/* Footer Links */}
            <Box textAlign="center" mt={3}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot Password?
              </Link>
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/register">
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>

            {/* Security Notice */}
            <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1}>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
