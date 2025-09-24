import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
} from '@mui/material';

const OTPVerification = ({ email, onVerify, onResend, loading }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = () => {
    setTimeLeft(600);
    setCanResend(false);
    setOtp('');
    onResend();
  };

  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return `***@${domain}`;
    }
    return `${localPart.substring(0, 3)}***@${domain}`;
  };

  return (
    <Box className="fade-up">
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
        We've sent a 6-digit verification code to<br />
        <strong>{maskEmail(email)}</strong>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setOtp(value);
          }}
          margin="normal"
          required
          autoFocus
          inputProps={{
            maxLength: 6,
            style: { textAlign: 'center', fontSize: '1.75rem', letterSpacing: '0.75rem', fontWeight: 600, transition: 'transform .25s ease' }
          }}
          onFocus={(e) => { e.target.style.transform = 'scale(1.02)'; }}
          onBlur={(e) => { e.target.style.transform = 'scale(1)'; }}
          helperText={`Enter the 6-digit code sent to your email`}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || otp.length !== 6}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
        </Button>
      </form>

      {/* Timer and Resend */}
      <Box textAlign="center" mt={2}>
        {!canResend ? (
          <Typography variant="body2" color="text.secondary">
            Code expires in: <strong>{formatTime(timeLeft)}</strong>
          </Typography>
        ) : (
          <Link
            component="button"
            variant="body2"
            onClick={handleResend}
            disabled={loading}
            sx={{ 
              cursor: 'pointer', 
              position: 'relative', 
              fontWeight: 600, 
              '&:after': { 
                content: '""', 
                position: 'absolute', 
                left: 0, 
                bottom: -2, 
                width: '100%', 
                height: 2, 
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
                transform: 'scaleX(0)', 
                transformOrigin: 'left', 
                transition: 'transform .4s' 
              }, 
              '&:hover:after': { 
                transform: 'scaleX(1)' 
              } 
            }}
          >
            Resend OTP
          </Link>
        )}
      </Box>

      {/* Help text */}
      <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1} className="fade-up delay-2">
        <Typography variant="caption" color="text.secondary">
          💡 Didn't receive the code? Check your spam folder or click resend after the timer expires.
        </Typography>
      </Box>
    </Box>
  );
};

export default OTPVerification;
