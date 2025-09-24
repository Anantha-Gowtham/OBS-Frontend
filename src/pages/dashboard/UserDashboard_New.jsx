import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  LinearProgress,
  Badge,
  Breadcrumbs,
  Link,
  Container
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Send,
  RequestPage,
  Person,
  Visibility,
  Download,
  CreditCard,
  Savings,
  Phone,
  Email,
  Home,
  Edit,
  Security,
  TrendingDown,
  PiggyBank,
  Wallet,
  ArrowUpward,
  ArrowDownward,
  MonetizationOn,
  Shield,
  Notifications,
  CheckCircle,
  Warning,
  NavigateNext,
  Dashboard as DashboardIcon,
  CompareArrows,
  Payment,
  CreditScore,
  AccountTree
} from '@mui/icons-material';

const UserDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [transferData, setTransferData] = useState({
    toAccount: '',
    amount: '',
    description: ''
  });
  const [loanData, setLoanData] = useState({
    loanType: '',
    amount: '',
    purpose: '',
    tenure: ''
  });

  // Mock user data
  const [userData, setUserData] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91-9876543210',
      address: '123 Main Street, City, State - 123456',
      accountNumber: 'ACC001234567',
      customerId: 'CUST001',
      joinDate: '2023-06-15'
    },
    accounts: [
      {
        accountNumber: 'ACC001234567',
        accountType: 'Savings',
        balance: 125000,
        status: 'Active',
        branch: 'Main Branch'
      },
      {
        accountNumber: 'ACC001234568',
        accountType: 'Current',
        balance: 75000,
        status: 'Active',
        branch: 'Main Branch'
      }
    ],
    recentTransactions: [
      {
        id: 'TXN001',
        date: '2024-01-22',
        description: 'Electricity Bill Payment',
        type: 'Debit',
        amount: 1250,
        balance: 125000
      },
      {
        id: 'TXN002',
        date: '2024-01-21',
        description: 'Salary Credit',
        type: 'Credit',
        amount: 32500,
        balance: 130000
      },
      {
        id: 'TXN003',
        date: '2024-01-20',
        description: 'Online Shopping',
        type: 'Debit',
        amount: 895,
        balance: 80000
      },
      {
        id: 'TXN004',
        date: '2024-01-19',
        description: 'Fund Transfer to John Smith',
        type: 'Debit',
        amount: 5000,
        balance: 82000
      },
      {
        id: 'TXN005',
        date: '2024-01-18',
        description: 'Mobile Recharge',
        type: 'Debit',
        amount: 350,
        balance: 83500
      }
    ],
    loans: [
      {
        id: 'LOAN001',
        type: 'Home Loan',
        amount: 2500000,
        remainingAmount: 1800000,
        emi: 25000,
        nextDueDate: '2024-02-05',
        status: 'Active',
        tenure: '20 years'
      }
    ],
    loanApplications: [
      {
        id: 'APP001',
        type: 'Car Loan',
        amount: 800000,
        appliedDate: '2024-01-15',
        status: 'Under Review',
        expectedDecision: '2024-01-30'
      }
    ]
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTransferSubmit = () => {
    console.log('Transfer Data:', transferData);
    setTransferDialogOpen(false);
    setTransferData({ toAccount: '', amount: '', description: '' });
  };

  const handleLoanSubmit = () => {
    console.log('Loan Data:', loanData);
    setLoanDialogOpen(false);
    setLoanData({ loanType: '', amount: '', purpose: '', tenure: '' });
  };

  const getTotalBalance = () => {
    return userData.accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Closed': return 'default';
      case 'Under Review': return 'warning';
      case 'Submitted': return 'info';
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  // Banking Theme Styles
  const bankingStyles = {
    dashboardCard: {
      background: 'white',
      borderRadius: '10px',
      padding: '25px',
      marginBottom: '25px',
      height: '100%',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
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
      backgroundColor: 'rgba(26, 35, 126, 0.1)',
      color: '#1a237e',
    },
    statIconSuccess: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      color: '#4caf50',
    },
    statIconWarning: {
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      color: '#ff9800',
    },
    statIconInfo: {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      color: '#2196f3',
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
      color: '#1a237e',
      textTransform: 'none',
      fontWeight: 600,
      transition: 'all 0.3s',
      '&:hover': {
        borderColor: '#1a237e',
        backgroundColor: '#f0f4ff',
        transform: 'translateX(5px)',
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
    transactionRow: {
      '&:hover': {
        backgroundColor: 'rgba(26, 35, 126, 0.04)',
      },
    },
  };

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Page Header with Breadcrumbs */}
        <Box sx={bankingStyles.pageHeader}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a237e', mb: 1 }}>
              Dashboard
            </Typography>
            <Breadcrumbs 
              separator={<NavigateNext fontSize="small" />}
              sx={bankingStyles.breadcrumb}
            >
              <Link underline="hover" color="inherit" href="/">
                <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Typography color="text.primary">Dashboard</Typography>
            </Breadcrumbs>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<Download />}
              sx={{ mr: 2 }}
            >
              Download Statement
            </Button>
            <IconButton color="primary">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* Welcome Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Avatar sx={{ width: 64, height: 64, mr: 3, bgcolor: 'primary.main', fontSize: '24px' }}>
            {userData.profile.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a237e' }}>
              Welcome back, {userData.profile.name.split(' ')[0]}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Account: {userData.profile.accountNumber} | Customer ID: {userData.profile.customerId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last login: Today, 09:23 AM
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Person />}
            onClick={() => setProfileDialogOpen(true)}
          >
            View Profile
          </Button>
        </Box>

        {/* Account Overview Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Account Summary */}
          <Grid item xs={12} md={8}>
            <Card sx={bankingStyles.dashboardCard}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Account Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={bankingStyles.statCard}>
                    <Box sx={{ ...bankingStyles.statIcon, ...bankingStyles.statIconPrimary }}>
                      <Wallet />
                    </Box>
                    <Box>
                      <Typography sx={bankingStyles.statValue}>
                        ₹{getTotalBalance().toLocaleString()}
                      </Typography>
                      <Typography sx={bankingStyles.statLabel}>
                        Current Balance
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={bankingStyles.statCard}>
                    <Box sx={{ ...bankingStyles.statIcon, ...bankingStyles.statIconSuccess }}>
                      <ArrowUpward />
                    </Box>
                    <Box>
                      <Typography sx={bankingStyles.statValue}>
                        ₹42,500
                      </Typography>
                      <Typography sx={bankingStyles.statLabel}>
                        Monthly Income
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={bankingStyles.statCard}>
                    <Box sx={{ ...bankingStyles.statIcon, ...bankingStyles.statIconWarning }}>
                      <ArrowDownward />
                    </Box>
                    <Box>
                      <Typography sx={bankingStyles.statValue}>
                        ₹23,800
                      </Typography>
                      <Typography sx={bankingStyles.statLabel}>
                        Monthly Expenses
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={bankingStyles.statCard}>
                    <Box sx={{ ...bankingStyles.statIcon, ...bankingStyles.statIconInfo }}>
                      <PiggyBank />
                    </Box>
                    <Box>
                      <Typography sx={bankingStyles.statValue}>
                        ₹3,87,500
                      </Typography>
                      <Typography sx={bankingStyles.statLabel}>
                        Total Savings
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={bankingStyles.dashboardCard}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  sx={bankingStyles.quickActionButton}
                  startIcon={<CompareArrows />}
                  onClick={() => setTransferDialogOpen(true)}
                >
                  Transfer Money
                </Button>
                <Button
                  sx={bankingStyles.quickActionButton}
                  startIcon={<Payment />}
                >
                  Pay Bills
                </Button>
                <Button
                  sx={bankingStyles.quickActionButton}
                  startIcon={<AccountBalance />}
                >
                  Open New Account
                </Button>
                <Button
                  sx={bankingStyles.quickActionButton}
                  startIcon={<MonetizationOn />}
                  onClick={() => setLoanDialogOpen(true)}
                >
                  Apply for Loan
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Transactions and Security */}
        <Grid container spacing={3}>
          {/* Recent Transactions */}
          <Grid item xs={12} md={8}>
            <Card sx={bankingStyles.dashboardCard}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Recent Transactions
                </Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.recentTransactions.slice(0, 5).map((transaction) => (
                      <TableRow 
                        key={transaction.id} 
                        sx={bankingStyles.transactionRow}
                      >
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Typography 
                            color={transaction.type === 'Credit' ? 'success.main' : 'error.main'}
                            sx={{ fontWeight: 600 }}
                          >
                            {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="Completed" 
                            color="success" 
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="outlined" color="primary">
                  View All Transactions
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Account Security */}
          <Grid item xs={12} md={4}>
            <Card sx={bankingStyles.dashboardCard}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Account Security
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Last Login:</strong> Today, 09:23 AM from Chrome, Windows
                </Typography>
              </Alert>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Security Level
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  color="success"
                  sx={{ height: '8px', borderRadius: '4px', mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Your account security is strong. Keep your password safe and do not share it with anyone.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<Security />}
                  fullWidth
                >
                  Change Password
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<Shield />}
                  fullWidth
                >
                  Enable 2FA
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Dialogs */}
      {/* Transfer Money Dialog */}
      <Dialog open={transferDialogOpen} onClose={() => setTransferDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Transfer Money</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="To Account Number"
            fullWidth
            variant="outlined"
            value={transferData.toAccount}
            onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={transferData.description}
            onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleTransferSubmit} variant="contained">Transfer</Button>
        </DialogActions>
      </Dialog>

      {/* Loan Application Dialog */}
      <Dialog open={loanDialogOpen} onClose={() => setLoanDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for Loan</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Loan Type</InputLabel>
            <Select
              value={loanData.loanType}
              onChange={(e) => setLoanData({ ...loanData, loanType: e.target.value })}
            >
              <MenuItem value="Personal Loan">Personal Loan</MenuItem>
              <MenuItem value="Home Loan">Home Loan</MenuItem>
              <MenuItem value="Car Loan">Car Loan</MenuItem>
              <MenuItem value="Education Loan">Education Loan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Loan Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={loanData.amount}
            onChange={(e) => setLoanData({ ...loanData, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Purpose"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={loanData.purpose}
            onChange={(e) => setLoanData({ ...loanData, purpose: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Tenure</InputLabel>
            <Select
              value={loanData.tenure}
              onChange={(e) => setLoanData({ ...loanData, tenure: e.target.value })}
            >
              <MenuItem value="1 year">1 year</MenuItem>
              <MenuItem value="2 years">2 years</MenuItem>
              <MenuItem value="5 years">5 years</MenuItem>
              <MenuItem value="10 years">10 years</MenuItem>
              <MenuItem value="15 years">15 years</MenuItem>
              <MenuItem value="20 years">20 years</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLoanSubmit} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Profile Information</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                value={userData.profile.name}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={userData.profile.email}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                value={userData.profile.phone}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Customer ID"
                value={userData.profile.customerId}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={userData.profile.address}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>Edit Profile</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;
