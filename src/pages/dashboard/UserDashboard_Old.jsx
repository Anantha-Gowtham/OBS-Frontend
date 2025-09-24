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
import { bankingStyles } from '../../styles/BankingTheme';

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
        description: 'Online Transfer to ACC987654321',
        type: 'Debit',
        amount: 5000,
        balance: 125000
      },
      {
        id: 'TXN002',
        date: '2024-01-21',
        description: 'Salary Credit',
        type: 'Credit',
        amount: 50000,
        balance: 130000
      },
      {
        id: 'TXN003',
        date: '2024-01-20',
        description: 'ATM Withdrawal',
        type: 'Debit',
        amount: 2000,
        balance: 80000
      },
      {
        id: 'TXN004',
        date: '2024-01-19',
        description: 'Online Purchase',
        type: 'Debit',
        amount: 1500,
        balance: 82000
      },
      {
        id: 'TXN005',
        date: '2024-01-18',
        description: 'Dividend Credit',
        type: 'Credit',
        amount: 3500,
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
      },
      {
        id: 'LOAN002',
        type: 'Personal Loan',
        amount: 200000,
        remainingAmount: 0,
        emi: 0,
        nextDueDate: null,
        status: 'Closed',
        tenure: '3 years'
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
    const newTransaction = {
      id: `TXN${String(userData.recentTransactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      description: `Transfer to ${transferData.toAccount} - ${transferData.description}`,
      type: 'Debit',
      amount: parseInt(transferData.amount),
      balance: userData.accounts[0].balance - parseInt(transferData.amount)
    };

    setUserData(prev => ({
      ...prev,
      accounts: prev.accounts.map((acc, index) => 
        index === 0 ? { ...acc, balance: acc.balance - parseInt(transferData.amount) } : acc
      ),
      recentTransactions: [newTransaction, ...prev.recentTransactions]
    }));

    setTransferData({ toAccount: '', amount: '', description: '' });
    setTransferDialogOpen(false);
  };

  const handleLoanApplication = () => {
    const newApplication = {
      id: `APP${String(userData.loanApplications.length + 1).padStart(3, '0')}`,
      type: loanData.loanType,
      amount: parseInt(loanData.amount),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      expectedDecision: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setUserData(prev => ({
      ...prev,
      loanApplications: [newApplication, ...prev.loanApplications]
    }));

    setLoanData({ loanType: '', amount: '', purpose: '', tenure: '' });
    setLoanDialogOpen(false);
  };

  const getTotalBalance = () => {
    return userData.accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getTransactionTypeColor = (type) => {
    return type === 'Credit' ? 'success' : 'error';
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

  return (
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
                      ₹53,500
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
                sx={bankingStyles.securityProgress}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
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
              <Button
                variant="outlined"
                fullWidth
                startIcon={<RequestPage />}
                onClick={() => setLoanDialogOpen(true)}
              >
                Apply for Loan
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Download />}
              >
                Download Statement
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Person />}
                onClick={() => setProfileDialogOpen(true)}
              >
                Manage Profile
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Account Overview" />
          <Tab label="Recent Transactions" />
          <Tab label="Loans & Applications" />
        </Tabs>
      </Box>

      {/* Account Overview Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {userData.accounts.map((account) => (
            <Grid item xs={12} md={6} key={account.accountNumber}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{account.accountType} Account</Typography>
                    <Chip 
                      label={account.status} 
                      color={getStatusColor(account.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Account Number: {account.accountNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Branch: {account.branch}
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ mt: 2 }}>
                    ₹{account.balance.toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button size="small" startIcon={<Visibility />}>
                      View Details
                    </Button>
                    <Button size="small" startIcon={<Download />} sx={{ ml: 1 }}>
                      Statement
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Recent Transactions Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.type} 
                          color={getTransactionTypeColor(transaction.type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          color={transaction.type === 'Credit' ? 'success.main' : 'error.main'}
                        >
                          {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">₹{transaction.balance.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Loans & Applications Tab */}
      {tabValue === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Active Loans
                  </Typography>
                  {userData.loans.filter(loan => loan.status === 'Active').map((loan) => (
                    <Box key={loan.id} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {loan.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Loan ID: {loan.id}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Remaining: ₹{loan.remainingAmount.toLocaleString()} / ₹{loan.amount.toLocaleString()}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={((loan.amount - loan.remainingAmount) / loan.amount) * 100}
                          sx={{ mt: 1, mb: 1 }}
                        />
                        <Typography variant="body2">
                          Next EMI: ₹{loan.emi.toLocaleString()} on {loan.nextDueDate}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Loan Applications
                  </Typography>
                  {userData.loanApplications.map((application) => (
                    <Box key={application.id} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {application.type}
                        </Typography>
                        <Chip 
                          label={application.status} 
                          color={getStatusColor(application.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Application ID: {application.id}
                      </Typography>
                      <Typography variant="body2">
                        Amount: ₹{application.amount.toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Applied: {application.appliedDate}
                      </Typography>
                      {application.expectedDecision && (
                        <Typography variant="body2">
                          Expected Decision: {application.expectedDecision}
                        </Typography>
                      )}
                    </Box>
                  ))}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => setLoanDialogOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Apply for New Loan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Transfer Money Dialog */}
      <Dialog open={transferDialogOpen} onClose={() => setTransferDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Transfer Money</DialogTitle>
        <DialogContent>
          <TextField
            label="To Account Number"
            value={transferData.toAccount}
            onChange={(e) => setTransferData({...transferData, toAccount: e.target.value})}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Amount"
            value={transferData.amount}
            onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Description (Optional)"
            value={transferData.description}
            onChange={(e) => setTransferData({...transferData, description: e.target.value})}
            fullWidth
            margin="normal"
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Transfer will be processed from your Savings Account (₹{userData.accounts[0].balance.toLocaleString()} available)
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleTransferSubmit}
            variant="contained"
            disabled={!transferData.toAccount || !transferData.amount || parseInt(transferData.amount) > userData.accounts[0].balance}
          >
            Transfer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loan Application Dialog */}
      <Dialog open={loanDialogOpen} onClose={() => setLoanDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for Loan</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Loan Type</InputLabel>
            <Select
              value={loanData.loanType}
              onChange={(e) => setLoanData({...loanData, loanType: e.target.value})}
            >
              <MenuItem value="Personal Loan">Personal Loan</MenuItem>
              <MenuItem value="Home Loan">Home Loan</MenuItem>
              <MenuItem value="Car Loan">Car Loan</MenuItem>
              <MenuItem value="Education Loan">Education Loan</MenuItem>
              <MenuItem value="Business Loan">Business Loan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Loan Amount"
            value={loanData.amount}
            onChange={(e) => setLoanData({...loanData, amount: e.target.value})}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Purpose"
            value={loanData.purpose}
            onChange={(e) => setLoanData({...loanData, purpose: e.target.value})}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Tenure</InputLabel>
            <Select
              value={loanData.tenure}
              onChange={(e) => setLoanData({...loanData, tenure: e.target.value})}
            >
              <MenuItem value="1 year">1 year</MenuItem>
              <MenuItem value="2 years">2 years</MenuItem>
              <MenuItem value="3 years">3 years</MenuItem>
              <MenuItem value="5 years">5 years</MenuItem>
              <MenuItem value="10 years">10 years</MenuItem>
              <MenuItem value="15 years">15 years</MenuItem>
              <MenuItem value="20 years">20 years</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleLoanApplication}
            variant="contained"
            disabled={!loanData.loanType || !loanData.amount || !loanData.purpose || !loanData.tenure}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Management Dialog */}
      <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Profile Management</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText 
                primary="Personal Information" 
                secondary={`${userData.profile.name} | ${userData.profile.email}`}
              />
              <IconButton><Edit /></IconButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><Phone /></ListItemIcon>
              <ListItemText 
                primary="Contact Information" 
                secondary={`${userData.profile.phone}`}
              />
              <IconButton><Edit /></IconButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText 
                primary="Address" 
                secondary={userData.profile.address}
              />
              <IconButton><Edit /></IconButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><Security /></ListItemIcon>
              <ListItemText 
                primary="Security Settings" 
                secondary="Change password, enable 2FA"
              />
              <IconButton><Edit /></IconButton>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;
