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
  ListItemSecondaryAction,
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
  IconButton,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  AccountBalance,
  Person,
  CreditCard,
  SwapHoriz,
  CheckCircle,
  Send,
  Receipt,
  ContactPhone,
  QrCode,
  History,
  Security,
  Info,
  Star,
  Add,
  Edit,
  Delete,
  Refresh
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const TransferMoney = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [transferType, setTransferType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);

  // Transfer form state
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    beneficiaryName: '',
    amount: '',
    purpose: '',
    description: '',
    scheduleDate: '',
    ifscCode: '',
    bankName: '',
    accountType: 'savings'
  });

  // Mock data
  const [userAccounts] = useState([
    { accountNumber: '1234567890', accountType: 'Savings', balance: 125000, bankName: 'OBS Bank' },
    { accountNumber: '1234567891', accountType: 'Current', balance: 75000, bankName: 'OBS Bank' },
    { accountNumber: '1234567892', accountType: 'Fixed Deposit', balance: 200000, bankName: 'OBS Bank' }
  ]);

  const [beneficiaries] = useState([
    { id: 1, name: 'Alice Johnson', accountNumber: '9876543210', bankName: 'HDFC Bank', ifsc: 'HDFC0001234', favorite: true },
    { id: 2, name: 'Bob Smith', accountNumber: '9876543211', bankName: 'ICICI Bank', ifsc: 'ICIC0001234', favorite: false },
    { id: 3, name: 'Carol Brown', accountNumber: '9876543212', bankName: 'OBS', ifsc: 'OBSN0001234', favorite: true }
  ]);

  const [recentTransfers] = useState([
    { id: 1, to: 'Alice Johnson', amount: 5000, date: '2025-08-27', status: 'Completed', type: 'NEFT' },
    { id: 2, to: 'Bob Smith', amount: 2500, date: '2025-08-26', status: 'Completed', type: 'IMPS' },
    { id: 3, to: 'Carol Brown', amount: 1000, date: '2025-08-25', status: 'Pending', type: 'UPI' }
  ]);

  const transferTypes = [
    { id: 'internal', name: 'Internal Transfer', icon: <SwapHoriz />, description: 'Between your OBS accounts' },
    { id: 'external', name: 'External Transfer', icon: <AccountBalance />, description: 'To other bank accounts' },
    { id: 'upi', name: 'UPI Transfer', icon: <ContactPhone />, description: 'Using UPI ID or mobile number' },
    { id: 'qr', name: 'QR Code', icon: <QrCode />, description: 'Scan and pay instantly' }
  ];

  const steps = ['Select Transfer Type', 'Enter Details', 'Review & Confirm', 'Transfer Complete'];

  const handleInputChange = (field, value) => {
    setTransferData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
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
        if (!transferType) {
          setError('Please select a transfer type');
          return false;
        }
        break;
      case 1:
        if (!transferData.fromAccount) {
          setError('Please select source account');
          return false;
        }
        if (!transferData.toAccount && transferType !== 'internal') {
          setError('Please enter recipient account details');
          return false;
        }
        if (!transferData.amount || Number(transferData.amount) <= 0) {
          setError('Please enter a valid amount');
          return false;
        }
        if (Number(transferData.amount) > getAccountBalance()) {
          setError('Insufficient balance');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const getAccountBalance = () => {
    const account = userAccounts.find(acc => acc.accountNumber === transferData.fromAccount);
    return account ? account.balance : 0;
  };

  const handleTransfer = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Transfer completed successfully!');
      setActiveStep(3);
      setConfirmDialog(false);
    } catch (err) {
      setError('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTransferData({
      fromAccount: '',
      toAccount: '',
      beneficiaryName: '',
      amount: '',
      purpose: '',
      description: '',
      scheduleDate: '',
      ifscCode: '',
      bankName: '',
      accountType: 'savings'
    });
    setTransferType('');
    setActiveStep(0);
    setError('');
    setSuccess('');
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Transfer Money
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Send money securely to any account, anywhere
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<Send />} label="New Transfer" />
        <Tab icon={<ContactPhone />} label="Beneficiaries" />
        <Tab icon={<History />} label="Transfer History" />
      </Tabs>

      {/* New Transfer Tab */}
      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardContent>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step 1: Select Transfer Type */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Choose Transfer Method
                </Typography>
                <Grid container spacing={2}>
                  {transferTypes.map((type) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={type.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: transferType === type.id ? '2px solid' : '1px solid',
                          borderColor: transferType === type.id ? 'primary.main' : 'grey.300',
                          '&:hover': { borderColor: 'primary.main' }
                        }}
                        onClick={() => setTransferType(type.id)}
                      >
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                            {type.icon}
                          </Avatar>
                          <Typography variant="h6" gutterBottom>
                            {type.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {type.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Step 2: Enter Details */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Transfer Details
                </Typography>
                <Grid container spacing={3}>
                  {/* From Account */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>From Account</InputLabel>
                      <Select
                        value={transferData.fromAccount}
                        label="From Account"
                        onChange={(e) => handleInputChange('fromAccount', e.target.value)}
                      >
                        {userAccounts.map((account) => (
                          <MenuItem key={account.accountNumber} value={account.accountNumber}>
                            <Box>
                              <Typography variant="body1">
                                {account.accountType} - {account.accountNumber}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Balance: ₹{account.balance.toLocaleString()}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Amount */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Amount"
                      fullWidth
                      type="number"
                      value={transferData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                      }}
                      helperText={transferData.fromAccount && `Available: ₹${getAccountBalance().toLocaleString()}`}
                    />
                  </Grid>

                  {/* Recipient Details based on transfer type */}
                  {transferType === 'internal' && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>To Account</InputLabel>
                        <Select
                          value={transferData.toAccount}
                          label="To Account"
                          onChange={(e) => handleInputChange('toAccount', e.target.value)}
                        >
                          {userAccounts
                            .filter(acc => acc.accountNumber !== transferData.fromAccount)
                            .map((account) => (
                              <MenuItem key={account.accountNumber} value={account.accountNumber}>
                                <Box>
                                  <Typography variant="body1">
                                    {account.accountType} - {account.accountNumber}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Balance: ₹{account.balance.toLocaleString()}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  {transferType === 'external' && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label="Beneficiary Account Number"
                          fullWidth
                          value={transferData.toAccount}
                          onChange={(e) => handleInputChange('toAccount', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label="Beneficiary Name"
                          fullWidth
                          value={transferData.beneficiaryName}
                          onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label="IFSC Code"
                          fullWidth
                          value={transferData.ifscCode}
                          onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          label="Bank Name"
                          fullWidth
                          value={transferData.bankName}
                          onChange={(e) => handleInputChange('bankName', e.target.value)}
                        />
                      </Grid>
                    </>
                  )}

                  {transferType === 'upi' && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label="UPI ID or Mobile Number"
                        fullWidth
                        value={transferData.toAccount}
                        onChange={(e) => handleInputChange('toAccount', e.target.value)}
                        placeholder="user@paytm or 9876543210"
                      />
                    </Grid>
                  )}

                  {/* Common fields */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Purpose"
                      fullWidth
                      value={transferData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      placeholder="e.g., Salary, Gift, Business"
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Description (Optional)"
                      fullWidth
                      multiline
                      rows={2}
                      value={transferData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Add a note for this transfer"
                    />
                  </Grid>
                </Grid>

                {/* Quick beneficiary selection for external transfers */}
                {transferType === 'external' && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Or select from saved beneficiaries:
                    </Typography>
                    <Grid container spacing={2}>
                      {beneficiaries.slice(0, 3).map((beneficiary) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={beneficiary.id}>
                          <Paper
                            sx={{
                              p: 2,
                              cursor: 'pointer',
                              border: '1px solid',
                              borderColor: 'grey.300',
                              '&:hover': { borderColor: 'primary.main' }
                            }}
                            onClick={() => {
                              handleInputChange('toAccount', beneficiary.accountNumber);
                              handleInputChange('beneficiaryName', beneficiary.name);
                              handleInputChange('bankName', beneficiary.bankName);
                              handleInputChange('ifscCode', beneficiary.ifsc);
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                {beneficiary.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {beneficiary.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {beneficiary.bankName}
                                </Typography>
                              </Box>
                              {beneficiary.favorite && (
                                <Star sx={{ color: 'warning.main', ml: 'auto' }} />
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            {/* Step 3: Review & Confirm */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Review Transfer Details
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          From Account
                        </Typography>
                        <Typography variant="body1">
                          {userAccounts.find(acc => acc.accountNumber === transferData.fromAccount)?.accountType} - {transferData.fromAccount}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          To Account
                        </Typography>
                        <Typography variant="body1">
                          {transferType === 'internal' 
                            ? `${userAccounts.find(acc => acc.accountNumber === transferData.toAccount)?.accountType} - ${transferData.toAccount}`
                            : transferData.beneficiaryName 
                              ? `${transferData.beneficiaryName} - ${transferData.toAccount}`
                              : transferData.toAccount
                          }
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ₹{Number(transferData.amount).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Transfer Type
                        </Typography>
                        <Typography variant="body1">
                          {transferTypes.find(t => t.id === transferType)?.name}
                        </Typography>
                      </Grid>
                      {transferData.purpose && (
                        <Grid size={{ xs: 12 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Purpose
                          </Typography>
                          <Typography variant="body1">
                            {transferData.purpose}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Please review all details carefully. This transfer cannot be reversed once completed.
                  </Typography>
                </Alert>
              </Box>
            )}

            {/* Step 4: Transfer Complete */}
            {activeStep === 3 && (
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Transfer Successful!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Your transfer of ₹{Number(transferData.amount).toLocaleString()} has been completed successfully.
                </Typography>
                
                <Paper sx={{ p: 2, mb: 3, maxWidth: 400, mx: 'auto' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Transaction Reference
                  </Typography>
                  <Typography variant="h6" color="primary">
                    TXN{Date.now().toString().slice(-8)}
                  </Typography>
                </Paper>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button variant="outlined" startIcon={<Receipt />}>
                    Download Receipt
                  </Button>
                  <Button variant="contained" onClick={resetForm}>
                    New Transfer
                  </Button>
                </Box>
              </Box>
            )}

            {/* Navigation Buttons */}
            {activeStep < 3 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                
                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    onClick={() => setConfirmDialog(true)}
                    startIcon={<Security />}
                  >
                    Confirm Transfer
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

      {/* Beneficiaries Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Saved Beneficiaries
                  </Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add Beneficiary
                  </Button>
                </Box>
                
                <List>
                  {beneficiaries.map((beneficiary, index) => (
                    <React.Fragment key={beneficiary.id}>
                      <ListItem>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {beneficiary.name.charAt(0)}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {beneficiary.name}
                              {beneficiary.favorite && <Star sx={{ color: 'warning.main', fontSize: 20 }} />}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {beneficiary.accountNumber} • {beneficiary.bankName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {beneficiary.ifsc}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < beneficiaries.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Transfer History Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Recent Transfers
              </Typography>
              <IconButton>
                <Refresh />
              </IconButton>
            </Box>
            
            <List>
              {recentTransfers.map((transfer, index) => (
                <React.Fragment key={transfer.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: transfer.status === 'Completed' ? 'success.main' : 'warning.main' }}>
                        <Send />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={`To: ${transfer.to}`}
                      secondary={`${transfer.date} • ${transfer.type}`}
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="error">
                          -₹{transfer.amount.toLocaleString()}
                        </Typography>
                        <Chip
                          label={transfer.status}
                          size="small"
                          color={transfer.status === 'Completed' ? 'success' : 'warning'}
                        />
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < recentTransfers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security color="warning" />
            Confirm Transfer
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You are about to transfer <strong>₹{Number(transferData.amount).toLocaleString()}</strong> to:
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {transferType === 'internal' 
              ? `Your ${userAccounts.find(acc => acc.accountNumber === transferData.toAccount)?.accountType} account`
              : transferData.beneficiaryName || transferData.toAccount
            }
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. Please verify all details before confirming.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleTransfer}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          >
            {loading ? 'Processing...' : 'Confirm Transfer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransferMoney;
