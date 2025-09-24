import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Slider,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Home,
  DirectionsCar,
  Business,
  School,
  CreditCard,
  AccountBalance,
  CheckCircle,
  Info,
  Warning,
  TrendingUp,
  Calculate,
  Description,
  CloudUpload,
  ExpandMore,
  MonetizationOn,
  Schedule,
  Security,
  Person,
  Work,
  Assessment,
  Send
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const ApplyLoan = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [eligibilityDialog, setEligibilityDialog] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Loan application form state
  const [loanData, setLoanData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    panNumber: '',
    aadhaarNumber: '',
    maritalStatus: '',
    dependents: '',
    qualification: '',
    
    // Contact Information
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    residenceType: '',
    
    // Employment Information
    employmentType: '',
    companyName: '',
    designation: '',
    workExperience: '',
    monthlyIncome: '',
    
    // Loan Details
    loanAmount: '',
    loanTenure: '',
    purpose: '',
    
    // Financial Information
    existingLoans: '',
    monthlyEMI: '',
    bankAccount: '',
    creditScore: '',
    
    // Documents
    documents: []
  });

  // Loan types configuration
  const loanTypes = [
    {
      id: 'home',
      name: 'Home Loan',
      icon: <Home />,
      description: 'Purchase or construct your dream home',
      interestRate: '8.5% - 12%',
      maxAmount: '5 Crores',
      tenure: '30 years',
      features: ['Tax Benefits', 'Flexible Repayment', 'Minimal Documentation'],
      minIncome: 25000,
      minCreditScore: 650
    },
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: <Person />,
      description: 'Meet your immediate financial needs',
      interestRate: '10.5% - 24%',
      maxAmount: '40 Lakhs',
      tenure: '7 years',
      features: ['Quick Approval', 'No Collateral', 'Instant Disbursal'],
      minIncome: 15000,
      minCreditScore: 600
    },
    {
      id: 'car',
      name: 'Car Loan',
      icon: <DirectionsCar />,
      description: 'Drive your dream car today',
      interestRate: '7.5% - 15%',
      maxAmount: '1.5 Crores',
      tenure: '7 years',
      features: ['Up to 90% Funding', 'Quick Processing', 'Competitive Rates'],
      minIncome: 20000,
      minCreditScore: 620
    },
    {
      id: 'business',
      name: 'Business Loan',
      icon: <Business />,
      description: 'Grow your business with flexible funding',
      interestRate: '9% - 18%',
      maxAmount: '10 Crores',
      tenure: '10 years',
      features: ['Flexible Repayment', 'Working Capital', 'Business Growth'],
      minIncome: 50000,
      minCreditScore: 700
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: <School />,
      description: 'Invest in your education and future',
      interestRate: '8% - 14%',
      maxAmount: '1.5 Crores',
      tenure: '15 years',
      features: ['Moratorium Period', 'Tax Benefits', 'Covers Full Course Fee'],
      minIncome: 20000,
      minCreditScore: 650
    },
    {
      id: 'gold',
      name: 'Gold Loan',
      icon: <MonetizationOn />,
      description: 'Quick loan against your gold',
      interestRate: '7% - 12%',
      maxAmount: '2 Crores',
      tenure: '3 years',
      features: ['Instant Approval', 'Minimal Documentation', 'Quick Disbursal'],
      minIncome: 10000,
      minCreditScore: 500
    }
  ];

  // Mock existing loans
  const [existingLoans] = useState([
    { id: 1, type: 'Personal Loan', amount: 500000, emi: 12500, status: 'Active', tenure: '3 years remaining' },
    { id: 2, type: 'Credit Card', amount: 150000, emi: 4500, status: 'Active', tenure: 'Revolving' }
  ]);

  const steps = ['Choose Loan Type', 'Personal Details', 'Employment Info', 'Loan Details', 'Documents', 'Review & Submit'];

  const handleInputChange = (field, value) => {
    setLoanData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const checkEligibility = () => {
    const loan = loanTypes.find(l => l.id === selectedLoanType);
    const income = Number(loanData.monthlyIncome) || 25000; // Default for calculation
    const creditScore = Number(loanData.creditScore) || 750; // Default for calculation
    
    let eligibility = {
      eligible: true,
      maxLoanAmount: 0,
      recommendedAmount: 0,
      factors: []
    };

    // Income based calculation (40x monthly income rule)
    const incomeBasedAmount = income * 40;
    
    // Credit score based adjustment
    let creditMultiplier = 1;
    if (creditScore >= 800) creditMultiplier = 1.2;
    else if (creditScore >= 750) creditMultiplier = 1.1;
    else if (creditScore >= 700) creditMultiplier = 1;
    else if (creditScore >= 650) creditMultiplier = 0.8;
    else creditMultiplier = 0.6;

    eligibility.maxLoanAmount = Math.round(incomeBasedAmount * creditMultiplier);
    eligibility.recommendedAmount = Math.round(eligibility.maxLoanAmount * 0.8);

    // Check minimum criteria
    if (income < loan.minIncome) {
      eligibility.eligible = false;
      eligibility.factors.push(`Minimum income required: ₹${loan.minIncome.toLocaleString()}`);
    }

    if (creditScore < loan.minCreditScore) {
      eligibility.eligible = false;
      eligibility.factors.push(`Minimum credit score required: ${loan.minCreditScore}`);
    }

    // Positive factors
    if (income > loan.minIncome * 2) {
      eligibility.factors.push('High income - Better loan terms available');
    }
    if (creditScore > 750) {
      eligibility.factors.push('Excellent credit score - Premium rates offered');
    }

    setEligibilityResult(eligibility);
    setEligibilityDialog(true);
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const validateStep = () => {
    setError('');
    
    switch (activeStep) {
      case 0:
        if (!selectedLoanType) {
          setError('Please select a loan type');
          return false;
        }
        break;
      case 1:
        if (!loanData.fullName || !loanData.dateOfBirth || !loanData.panNumber) {
          setError('Please fill all required personal details');
          return false;
        }
        break;
      case 2:
        if (!loanData.employmentType || !loanData.monthlyIncome) {
          setError('Please fill all required employment details');
          return false;
        }
        break;
      case 3:
        if (!loanData.loanAmount || !loanData.loanTenure) {
          setError('Please fill all required loan details');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Loan application submitted successfully! Application ID: LA' + Date.now().toString().slice(-6));
      setActiveStep(5);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );

  const currentLoan = loanTypes.find(l => l.id === selectedLoanType);
  const estimatedEMI = loanData.loanAmount && loanData.loanTenure ? 
    calculateEMI(Number(loanData.loanAmount), 10, Number(loanData.loanTenure)) : 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Apply for Loan
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose from our wide range of loan products designed for your needs
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<Description />} label="Apply Now" />
        <Tab icon={<Assessment />} label="My Applications" />
        <Tab icon={<Calculate />} label="EMI Calculator" />
      </Tabs>

      {/* Apply Now Tab */}
      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardContent>
            {activeStep < 5 && (
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            {/* Step 1: Choose Loan Type */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Choose Your Loan Type
                </Typography>
                <Grid container spacing={3}>
                  {loanTypes.map((loan) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={loan.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedLoanType === loan.id ? '2px solid' : '1px solid',
                          borderColor: selectedLoanType === loan.id ? 'primary.main' : 'grey.300',
                          '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setSelectedLoanType(loan.id)}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                              {loan.icon}
                            </Avatar>
                            <Typography variant="h6">{loan.name}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {loan.description}
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">
                              <strong>Interest Rate:</strong> {loan.interestRate}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Max Amount:</strong> ₹{loan.maxAmount}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Tenure:</strong> Up to {loan.tenure}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {loan.features.map((feature, index) => (
                              <Chip key={index} label={feature} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {selectedLoanType && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                    <Button
                      variant="contained"
                      onClick={checkEligibility}
                      startIcon={<Assessment />}
                      sx={{ mr: 2 }}
                    >
                      Check Eligibility
                    </Button>
                    <Typography variant="caption" color="text.secondary">
                      Get instant eligibility assessment for {currentLoan?.name}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Step 2: Personal Details */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      required
                      value={loanData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      required
                      value={loanData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="PAN Number"
                      fullWidth
                      required
                      value={loanData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Aadhaar Number"
                      fullWidth
                      value={loanData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                      inputProps={{ maxLength: 12 }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Marital Status</InputLabel>
                      <Select
                        value={loanData.maritalStatus}
                        label="Marital Status"
                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      >
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                        <MenuItem value="widowed">Widowed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Number of Dependents"
                      type="number"
                      fullWidth
                      value={loanData.dependents}
                      onChange={(e) => handleInputChange('dependents', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Address"
                      fullWidth
                      multiline
                      rows={2}
                      value={loanData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="City"
                      fullWidth
                      value={loanData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="State"
                      fullWidth
                      value={loanData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Pincode"
                      fullWidth
                      value={loanData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 3: Employment Information */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Employment Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Employment Type</InputLabel>
                      <Select
                        value={loanData.employmentType}
                        label="Employment Type"
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      >
                        <MenuItem value="salaried">Salaried</MenuItem>
                        <MenuItem value="self_employed">Self Employed</MenuItem>
                        <MenuItem value="business">Business Owner</MenuItem>
                        <MenuItem value="freelancer">Freelancer</MenuItem>
                        <MenuItem value="retired">Retired</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Company/Business Name"
                      fullWidth
                      value={loanData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Designation/Position"
                      fullWidth
                      value={loanData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Work Experience (Years)"
                      type="number"
                      fullWidth
                      value={loanData.workExperience}
                      onChange={(e) => handleInputChange('workExperience', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Monthly Income"
                      type="number"
                      fullWidth
                      required
                      value={loanData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Monthly EMI (Existing Loans)"
                      type="number"
                      fullWidth
                      value={loanData.monthlyEMI}
                      onChange={(e) => handleInputChange('monthlyEMI', e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Step 4: Loan Details */}
            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Loan Requirements
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Loan Amount Required"
                      type="number"
                      fullWidth
                      required
                      value={loanData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Loan Tenure</InputLabel>
                      <Select
                        value={loanData.loanTenure}
                        label="Loan Tenure"
                        onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                      >
                        <MenuItem value="1">1 Year</MenuItem>
                        <MenuItem value="2">2 Years</MenuItem>
                        <MenuItem value="3">3 Years</MenuItem>
                        <MenuItem value="5">5 Years</MenuItem>
                        <MenuItem value="7">7 Years</MenuItem>
                        <MenuItem value="10">10 Years</MenuItem>
                        <MenuItem value="15">15 Years</MenuItem>
                        <MenuItem value="20">20 Years</MenuItem>
                        <MenuItem value="25">25 Years</MenuItem>
                        <MenuItem value="30">30 Years</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Purpose of Loan"
                      fullWidth
                      multiline
                      rows={2}
                      value={loanData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      placeholder="Describe how you plan to use this loan"
                    />
                  </Grid>
                </Grid>

                {/* EMI Calculator */}
                {loanData.loanAmount && loanData.loanTenure && (
                  <Box sx={{ mt: 3, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Estimated EMI Calculation
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Loan Amount
                        </Typography>
                        <Typography variant="h6">
                          ₹{Number(loanData.loanAmount).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Interest Rate (Est.)
                        </Typography>
                        <Typography variant="h6">
                          10% p.a.
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Tenure
                        </Typography>
                        <Typography variant="h6">
                          {loanData.loanTenure} years
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Monthly EMI
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ₹{estimatedEMI.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            {/* Step 5: Documents */}
            {activeStep === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Required Documents
                </Typography>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Please keep the following documents ready for upload. You can also submit them later at the branch.
                </Alert>
                
                <Grid container spacing={2}>
                  {[
                    'PAN Card',
                    'Aadhaar Card',
                    'Salary Slips (Last 3 months)',
                    'Bank Statements (Last 6 months)',
                    'Income Tax Returns (Last 2 years)',
                    'Employment Certificate',
                    'Property Documents (if applicable)',
                    'Passport Size Photographs'
                  ].map((doc, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Description sx={{ mr: 2, color: 'text.secondary' }} />
                          <Typography variant="body2">{doc}</Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<CloudUpload />}
                        >
                          Upload
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Step 6: Review & Submit */}
            {activeStep === 5 && !success && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Review Your Application
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Loan Type
                        </Typography>
                        <Typography variant="body1">
                          {currentLoan?.name}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Loan Amount
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ₹{Number(loanData.loanAmount).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Tenure
                        </Typography>
                        <Typography variant="body1">
                          {loanData.loanTenure} years
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Estimated EMI
                        </Typography>
                        <Typography variant="body1">
                          ₹{estimatedEMI.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Applicant Name
                        </Typography>
                        <Typography variant="body1">
                          {loanData.fullName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <FormControlLabel
                  control={<Checkbox />}
                  label="I agree to the terms and conditions and authorize the bank to verify my information"
                  sx={{ mt: 2 }}
                />
              </Box>
            )}

            {/* Success Step */}
            {activeStep === 5 && success && (
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Application Submitted Successfully!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {success}
                </Typography>
                
                <Paper sx={{ p: 3, mb: 3, maxWidth: 400, mx: 'auto' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Next Steps:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    • Document verification will be completed within 2 business days<br/>
                    • Our loan officer will contact you for further processing<br/>
                    • Loan approval decision within 5-7 business days
                  </Typography>
                </Paper>

                <Button variant="contained" href="/user/dashboard">
                  Back to Dashboard
                </Button>
              </Box>
            )}

            {/* Navigation Buttons */}
            {activeStep < 5 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                
                {activeStep === 4 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* My Applications Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              My Loan Applications
            </Typography>
            
            {/* Mock application history */}
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <Schedule />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Personal Loan Application"
                  secondary="Applied on: Aug 25, 2025 • Amount: ₹5,00,000 • Status: Under Review"
                />
                <Chip label="Pending" color="warning" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <CheckCircle />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Car Loan Application"
                  secondary="Applied on: Aug 15, 2025 • Amount: ₹8,00,000 • Status: Approved"
                />
                <Chip label="Approved" color="success" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* EMI Calculator Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              EMI Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Calculate your monthly EMI for any loan amount
            </Typography>
            
            {/* EMI Calculator implementation would go here */}
            <Alert severity="info">
              EMI Calculator functionality will be implemented in the next phase.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Eligibility Dialog */}
      <Dialog open={eligibilityDialog} onClose={() => setEligibilityDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Assessment color="primary" />
            Loan Eligibility Assessment
          </Box>
        </DialogTitle>
        <DialogContent>
          {eligibilityResult && (
            <Box>
              <Alert severity={eligibilityResult.eligible ? "success" : "warning"} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {eligibilityResult.eligible ? "You are eligible for this loan!" : "Your eligibility needs improvement"}
                </Typography>
              </Alert>
              
              {eligibilityResult.eligible && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Maximum Loan Amount
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{eligibilityResult.maxLoanAmount.toLocaleString()}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Recommended Amount
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    ₹{eligibilityResult.recommendedAmount.toLocaleString()}
                  </Typography>
                </Box>
              )}
              
              {eligibilityResult.factors.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Key Factors:
                  </Typography>
                  {eligibilityResult.factors.map((factor, index) => (
                    <Typography key={index} variant="body2" sx={{ ml: 1 }}>
                      • {factor}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEligibilityDialog(false)}>
            Close
          </Button>
          {eligibilityResult?.eligible && (
            <Button variant="contained" onClick={() => {
              setEligibilityDialog(false);
              handleNext();
            }}>
              Proceed with Application
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplyLoan;
