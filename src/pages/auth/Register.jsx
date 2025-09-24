import React, { useState, useEffect } from 'react';
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
  IconButton,
  InputAdornment,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const initialForm = {
  firstName: '',
  lastName: '',
  fatherOrSpouseName: '',
  dateOfBirth: '',
  username: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  aadhaarNumber: '',
  panNumber: '',
  kycDocumentType: '',
  kycDocumentNumber: '',
  initialDeposit: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createdAccount, setCreatedAccount] = useState(null);
  const [createdCard, setCreatedCard] = useState(null);
  const [passwordScore, setPasswordScore] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const stepOrder = [
    'Personal Info',
    'Contact & Address',
    'KYC Documents',
    'Security & Credentials'
  ];

  // Calculate password strength
  useEffect(() => {
    const pwd = form.password;
    let score = 0;
    
    if (pwd.length >= 6) score += 20;
    if (pwd.length >= 10) score += 20;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 20;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;
    
    setPasswordScore(Math.min(score, 100));
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setForm(prev => ({ ...prev, [name]: val }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const isAdult = (dobStr) => {
    if (!dobStr) return false;
    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) return false;
    
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 0: // Personal Info
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!form.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        else if (!isAdult(form.dateOfBirth)) newErrors.dateOfBirth = 'You must be 18 years or older';
        if (!form.username.trim()) newErrors.username = 'Username is required';
        else if (form.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
        break;
        
      case 1: // Contact & Address
        if (form.pincode && !/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
        break;
        
      case 2: // KYC Documents
        if (form.aadhaarNumber && !/^\d{12}$/.test(form.aadhaarNumber)) newErrors.aadhaarNumber = 'Aadhaar must be 12 digits';
        if (form.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNumber)) newErrors.panNumber = 'Invalid PAN format';
        if (form.kycDocumentType && !form.kycDocumentNumber) newErrors.kycDocumentNumber = 'Document number is required';
        break;
        
      case 3: // Security & Credentials
        if (!form.password) newErrors.password = 'Password is required';
        else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (form.initialDeposit && Number(form.initialDeposit) < 0) newErrors.initialDeposit = 'Deposit cannot be negative';
        if (!form.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, stepOrder.length - 1));
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateStep(activeStep)) return;
    
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        fatherOrSpouseName: form.fatherOrSpouseName.trim() || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        username: form.username.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim() || undefined,
        addressLine1: form.addressLine1.trim() || undefined,
        addressLine2: form.addressLine2.trim() || undefined,
        city: form.city.trim() || undefined,
        state: form.state.trim() || undefined,
        pincode: form.pincode.trim() || undefined,
        aadhaarNumber: form.aadhaarNumber.trim() || undefined,
        panNumber: form.panNumber.trim() || undefined,
        kycDocumentType: form.kycDocumentType || undefined,
        kycDocumentNumber: form.kycDocumentNumber.trim() || undefined,
        initialDeposit: form.initialDeposit ? parseFloat(form.initialDeposit) : 0,
        password: form.password,
        role: 'USER'
      };
      
      const resp = await register(payload);
      if (resp.success) {
        setSuccess(resp.message || 'Registration successful! Redirecting to login...');
        setCreatedAccount(resp.account || null);
        setCreatedCard(resp.card || null);
        setForm(initialForm);
        
        setTimeout(() => navigate('/login'), 4000);
      } else {
        setError(resp.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrengthColor = () => {
    if (passwordScore < 40) return 'error';
    if (passwordScore < 80) return 'warning';
    return 'success';
  };

  const passwordStrengthLabel = () => {
    if (passwordScore < 40) return 'Weak';
    if (passwordScore < 80) return 'Medium';
    return 'Strong';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box textAlign="center" mb={4}>
              <PersonAdd color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>Create Your Account</Typography>
              <Typography variant="subtitle1" color="text.secondary">Join OBS Banking System today</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {stepOrder.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {activeStep === 0 && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="firstName"
                        label="First Name"
                        fullWidth
                        value={form.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        value={form.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="fatherOrSpouseName"
                        label="Father / Spouse Name"
                        fullWidth
                        value={form.fatherOrSpouseName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="username"
                        label="Username"
                        fullWidth
                        value={form.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        required
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="phoneNumber"
                        label="Phone (optional)"
                        fullWidth
                        value={form.phoneNumber}
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
                
                {activeStep === 1 && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="addressLine1"
                        label="Address Line 1"
                        fullWidth
                        value={form.addressLine1}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="addressLine2"
                        label="Address Line 2"
                        fullWidth
                        value={form.addressLine2}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        name="city"
                        label="City"
                        fullWidth
                        value={form.city}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        name="state"
                        label="State"
                        fullWidth
                        value={form.state}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        name="pincode"
                        label="Pincode"
                        fullWidth
                        value={form.pincode}
                        onChange={handleChange}
                        error={!!errors.pincode}
                        helperText={errors.pincode || "Optional"}
                        inputProps={{ maxLength: 6 }}
                      />
                    </Grid>
                  </>
                )}
                
                {activeStep === 2 && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="aadhaarNumber"
                        label="Aadhaar Number"
                        fullWidth
                        value={form.aadhaarNumber}
                        onChange={handleChange}
                        error={!!errors.aadhaarNumber}
                        helperText={errors.aadhaarNumber || "Optional"}
                        inputProps={{ maxLength: 12 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="panNumber"
                        label="PAN Number"
                        fullWidth
                        value={form.panNumber}
                        onChange={handleChange}
                        error={!!errors.panNumber}
                        helperText={errors.panNumber || "Optional"}
                        inputProps={{ style: { textTransform: 'uppercase' }, maxLength: 10 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="kycDocumentType"
                        label="KYC Document Type"
                        fullWidth
                        value={form.kycDocumentType}
                        onChange={handleChange}
                        placeholder="(Aadhaar / PAN / Passport)"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="kycDocumentNumber"
                        label="KYC Document Number"
                        fullWidth
                        value={form.kycDocumentNumber}
                        onChange={handleChange}
                        error={!!errors.kycDocumentNumber}
                        helperText={errors.kycDocumentNumber}
                      />
                    </Grid>
                  </>
                )}
                
                {activeStep === 3 && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="initialDeposit"
                        label="Initial Deposit (₹)"
                        type="number"
                        fullWidth
                        value={form.initialDeposit}
                        onChange={handleChange}
                        error={!!errors.initialDeposit}
                        helperText={errors.initialDeposit || 'Optional'}
                        inputProps={{ min: 0, step: '0.01' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password || 'Use 10+ chars incl. upper, number, symbol'}
                        required
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      {form.password && (
                        <Box mt={1}>
                          <LinearProgress
                            variant="determinate"
                            value={passwordScore}
                            color={passwordStrengthColor()}
                            sx={{ height: 6, borderRadius: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Strength: {passwordStrengthLabel()}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        required
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(p => !p)} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="acceptTerms"
                            checked={form.acceptTerms}
                            onChange={handleChange}
                            color={errors.acceptTerms ? 'error' : 'primary'}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the <Link component={RouterLink} to="#">Terms of Service</Link> & <Link component={RouterLink} to="#">Privacy Policy</Link>
                          </Typography>
                        }
                      />
                      {errors.acceptTerms && (
                        <Typography variant="caption" color="error" display="block" ml={4} mt={-1}>
                          {errors.acceptTerms}
                        </Typography>
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Box mt={4} display="flex" gap={2}>
                {activeStep > 0 && (
                  <Button variant="outlined" onClick={prevStep} disabled={loading}>
                    Back
                  </Button>
                )}
                
                {activeStep < stepOrder.length - 1 ? (
                  <Button variant="contained" onClick={nextStep} disabled={loading}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth={activeStep === 0}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Create Account'}
                  </Button>
                )}
              </Box>

              {success && (createdAccount || createdCard) && (
                <Box mt={3} p={2} borderRadius={2} bgcolor="grey.100" border="1px solid" borderColor="grey.300">
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>🎉 Your Account & Card Details</Typography>
                  {createdAccount && (
                    <Box mb={2}>
                      <Typography variant="body2" fontWeight={600} color="primary.main">Bank Account:</Typography>
                      <Typography variant="body2">Account Number: <strong>{createdAccount.accountNumber}</strong></Typography>
                      <Typography variant="body2">Account Type: <strong>{createdAccount.type}</strong></Typography>
                      <Typography variant="body2">Balance: <strong>₹{createdAccount.balance}</strong></Typography>
                    </Box>
                  )}
                  {createdCard && (
                    <Box mb={2}>
                      <Typography variant="body2" fontWeight={600} color="secondary.main">ATM/Debit Card:</Typography>
                      <Typography variant="body2">Card Number: <strong>{createdCard.maskedCardNumber}</strong></Typography>
                      <Typography variant="body2">Card Holder: <strong>{createdCard.cardHolderName}</strong></Typography>
                      <Typography variant="body2">Expiry Date: <strong>{createdCard.expiryDate}</strong></Typography>
                      <Typography variant="body2">PIN: <strong>{createdCard.pin}</strong> (Change after first use)</Typography>
                    </Box>
                  )}
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                    📧 These details have been sent to your email. Store them securely. You will be redirected to login shortly.
                  </Typography>
                </Box>
              )}
            </Box>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login">Login</Link>
              </Typography>
            </Box>

            <Box mt={4} p={2} bgcolor="grey.50" borderRadius={1}>
             </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
