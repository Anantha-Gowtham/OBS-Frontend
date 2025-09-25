import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Tooltip,
  Menu,
  MenuList,
  ListItemButton
} from '@mui/material';
import {
  AccountBalance,
  Add,
  Visibility,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  Savings,
  Business,
  MoreVert,
  Security,
  Notifications,
  History,
  Print,
  Share,
  Block,
  Lock,
  LockOpen,
  Edit,
  Info,
  ExpandMore,
  AttachMoney,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  LocalAtm,
  SwapHoriz,
  AccountBalanceWallet,
  Phone,
  Wifi,
  Power,
  DirectionsCar,
  Home,
  School,
  ShoppingCart
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const UserAccounts = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
  const [newAccountOpen, setNewAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Account data
  const [accounts, setAccounts] = useState([
    {
      id: 'ACC001234567',
      accountNumber: '1234567890',
      accountType: 'Savings',
      balance: 125000,
      availableBalance: 120000,
      status: 'Active',
      branch: 'Main Branch, Downtown',
      openDate: '2023-06-15',
      interestRate: 4.5,
      minimumBalance: 5000,
      overdraftLimit: 0,
      debitCard: {
        number: '**** **** **** 4567',
        expiryDate: '12/26',
        status: 'Active',
        type: 'Visa Debit'
      },
      features: ['Online Banking', 'Mobile Banking', 'SMS Alerts', 'Debit Card']
    },
    {
      id: 'ACC001234568',
      accountNumber: '1234567891',
      accountType: 'Current',
      balance: 75000,
      availableBalance: 125000,
      status: 'Active',
      branch: 'Main Branch, Downtown',
      openDate: '2023-08-20',
      interestRate: 0,
      minimumBalance: 10000,
      overdraftLimit: 50000,
      debitCard: {
        number: '**** **** **** 4568',
        expiryDate: '10/27',
        status: 'Active',
        type: 'Visa Business'
      },
      features: ['Online Banking', 'Mobile Banking', 'Checkbook', 'Overdraft']
    },
    {
      id: 'ACC001234569',
      accountNumber: '1234567892',
      accountType: 'Fixed Deposit',
      balance: 200000,
      availableBalance: 0,
      status: 'Active',
      branch: 'Main Branch, Downtown',
      openDate: '2024-01-10',
      interestRate: 7.5,
      minimumBalance: 0,
      maturityDate: '2025-01-10',
      tenure: '1 Year',
      features: ['High Interest', 'Tax Benefits', 'Auto Renewal']
    }
  ]);

  // Recent transactions
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      date: '2024-01-22',
      description: 'Salary Credit',
      type: 'Credit',
      amount: 45000,
      account: 'ACC001234567',
      balance: 125000,
      category: 'Income'
    },
    {
      id: 'TXN002',
      date: '2024-01-21',
      description: 'Electricity Bill Payment',
      type: 'Debit',
      amount: 1250,
      account: 'ACC001234567',
      balance: 80000,
      category: 'Utilities'
    },
    {
      id: 'TXN003',
      date: '2024-01-20',
      description: 'Online Shopping - Amazon',
      type: 'Debit',
      amount: 2850,
      account: 'ACC001234567',
      balance: 81250,
      category: 'Shopping'
    },
    {
      id: 'TXN004',
      date: '2024-01-19',
      description: 'Fund Transfer to John Smith',
      type: 'Debit',
      amount: 5000,
      account: 'ACC001234567',
      balance: 84100,
      category: 'Transfer'
    },
    {
      id: 'TXN005',
      date: '2024-01-18',
      description: 'ATM Cash Withdrawal',
      type: 'Debit',
      amount: 3000,
      account: 'ACC001234567',
      balance: 89100,
      category: 'Cash'
    }
  ]);

  // Bills and services
  const [services, setServices] = useState([
    { id: 1, name: 'Mobile Recharge', icon: <Phone />, lastUsed: '2024-01-20', amount: 350 },
    { id: 2, name: 'Electricity Bill', icon: <Power />, lastUsed: '2024-01-21', amount: 1250 },
    { id: 3, name: 'Internet Bill', icon: <Wifi />, lastUsed: '2024-01-15', amount: 899 },
    { id: 4, name: 'Car Loan EMI', icon: <DirectionsCar />, lastUsed: '2024-01-05', amount: 12500 },
    { id: 5, name: 'Home Loan EMI', icon: <Home />, lastUsed: '2024-01-05', amount: 25000 },
    { id: 6, name: 'Education Loan EMI', icon: <School />, lastUsed: '2024-01-05', amount: 8500 }
  ]);

  const [newAccountData, setNewAccountData] = useState({
    accountType: '',
    initialDeposit: '',
    purpose: '',
    branch: ''
  });

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getAccountTypeIcon = (type) => {
    switch (type) {
      case 'Savings':
        return <Savings />;
      case 'Current':
        return <Business />;
      case 'Fixed Deposit':
        return <TrendingUp />;
      default:
        return <AccountBalance />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Blocked':
        return 'error';
      case 'Dormant':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTransactionIcon = (category) => {
    switch (category) {
      case 'Income':
        return <TrendingUp color="success" />;
      case 'Transfer':
        return <SwapHoriz color="primary" />;
      case 'Cash':
        return <LocalAtm color="info" />;
      case 'Shopping':
        return <ShoppingCart color="secondary" />;
      case 'Utilities':
        return <Power color="warning" />;
      default:
        return <Receipt />;
    }
  };

  const handleAccountAction = (action, accountId) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`${action} performed on account ${accountId}`);
      setLoading(false);
      setAnchorEl(null);
    }, 1000);
  };

  const handleNewAccountSubmit = () => {
    setLoading(true);
    // Simulate account creation
    setTimeout(() => {
      setNewAccountOpen(false);
      setNewAccountData({ accountType: '', initialDeposit: '', purpose: '', branch: '' });
      setLoading(false);
      // Show success message
    }, 2000);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          My Accounts
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage all your bank accounts and view transaction history
        </Typography>
      </Box>

      {/* Account Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Balance
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    ₹{getTotalBalance().toLocaleString()}
                  </Typography>
                </Box>
                <AccountBalanceWallet sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Accounts
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="primary">
                    {accounts.filter(acc => acc.status === 'Active').length}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    This Month Spending
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="error">
                    ₹12,495
                  </Typography>
                </Box>
                <TrendingDown sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setNewAccountOpen(true)}
        >
          Open New Account
        </Button>
        <Button
          variant="outlined"
          startIcon={<SwapHoriz />}
          href="/user/transfer"
        >
          Transfer Money
        </Button>
        <Button
          variant="outlined"
          startIcon={<Receipt />}
          href="/user/statements"
        >
          Statements
        </Button>
        <Button
          variant="outlined"
          startIcon={<Settings />}
          onClick={() => setSettingsOpen(true)}
        >
          Settings
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<AccountBalance />} label="All Accounts" />
        <Tab icon={<History />} label="Recent Transactions" />
        <Tab icon={<Receipt />} label="Bills & Services" />
        <Tab icon={<CreditCard />} label="Cards" />
      </Tabs>

      {/* All Accounts Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          {accounts.map((account) => (
            <Grid size={{ xs: 12, lg: 6 }} key={account.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {getAccountTypeIcon(account.accountType)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {account.accountType} Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {account.accountNumber}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={account.status}
                        color={getStatusColor(account.status)}
                        size="small"
                      />
                      <IconButton
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Current Balance
                      </Typography>
                      <Typography variant="h5" fontWeight={600} color="primary">
                        ₹{account.balance.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Available Balance
                      </Typography>
                      <Typography variant="h6" fontWeight={500}>
                        ₹{account.availableBalance.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Interest Rate
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {account.interestRate}% p.a.
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Branch
                      </Typography>
                      <Typography variant="body2">
                        {account.branch}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {account.features.map((feature, index) => (
                      <Chip key={index} label={feature} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => {
                        setSelectedAccount(account);
                        setAccountDetailsOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download />}
                    >
                      Statement
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Recent Transactions Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Transactions</Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="7">Last 7 Days</MenuItem>
                  <MenuItem value="30">Last 30 Days</MenuItem>
                  <MenuItem value="90">Last 3 Months</MenuItem>
                  <MenuItem value="365">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTransactionIcon(transaction.category)}
                          {transaction.description}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={transaction.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          color={transaction.type === 'Credit' ? 'success.main' : 'error.main'}
                          fontWeight={500}
                        >
                          {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        ₹{transaction.balance.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Bills & Services Tab */}
      <TabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
              <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {service.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{service.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last used: {service.lastUsed}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ₹{service.amount.toLocaleString()}
                  </Typography>
                  <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Cards Tab */}
      <TabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          {accounts.filter(acc => acc.debitCard).map((account) => (
            <Grid size={{ xs: 12, md: 6 }} key={account.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Debit Card</Typography>
                    <Chip
                      label={account.debitCard.status}
                      color={getStatusColor(account.debitCard.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Box sx={{ 
                    backgroundColor: 'primary.main', // Solid black background
                    color: 'white',
                    p: 3,
                    borderRadius: 2,
                    mb: 2
                  }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {account.debitCard.type}
                    </Typography>
                    <Typography variant="h5" fontWeight={600} sx={{ my: 2, letterSpacing: 2 }}>
                      {account.debitCard.number}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Valid Thru
                        </Typography>
                        <Typography variant="body1">
                          {account.debitCard.expiryDate}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Account
                        </Typography>
                        <Typography variant="body1">
                          {account.accountNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" startIcon={<Block />}>
                      Block Card
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<Settings />}>
                      Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuList>
          <ListItemButton onClick={() => handleAccountAction('View Statement', selectedAccount?.id)}>
            <ListItemIcon><Download /></ListItemIcon>
            <ListItemText>Download Statement</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => handleAccountAction('Block Account', selectedAccount?.id)}>
            <ListItemIcon><Block /></ListItemIcon>
            <ListItemText>Block Account</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => handleAccountAction('Account Settings', selectedAccount?.id)}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText>Account Settings</ListItemText>
          </ListItemButton>
        </MenuList>
      </Menu>

      {/* Account Details Dialog */}
      <Dialog open={accountDetailsOpen} onClose={() => setAccountDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Account Details</DialogTitle>
        <DialogContent>
          {selectedAccount && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Account Number</Typography>
                <Typography variant="body1">{selectedAccount.accountNumber}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Account Type</Typography>
                <Typography variant="body1">{selectedAccount.accountType}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Current Balance</Typography>
                <Typography variant="h6" color="primary">₹{selectedAccount.balance.toLocaleString()}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Available Balance</Typography>
                <Typography variant="h6">₹{selectedAccount.availableBalance.toLocaleString()}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Interest Rate</Typography>
                <Typography variant="body1">{selectedAccount.interestRate}% per annum</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Minimum Balance</Typography>
                <Typography variant="body1">₹{selectedAccount.minimumBalance.toLocaleString()}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">Branch</Typography>
                <Typography variant="body1">{selectedAccount.branch}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="text.secondary">Account Features</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {selectedAccount.features.map((feature, index) => (
                    <Chip key={index} label={feature} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccountDetailsOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Download />}>Download Statement</Button>
        </DialogActions>
      </Dialog>

      {/* New Account Dialog */}
      <Dialog open={newAccountOpen} onClose={() => setNewAccountOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Open New Account</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={newAccountData.accountType}
                  label="Account Type"
                  onChange={(e) => setNewAccountData(prev => ({ ...prev, accountType: e.target.value }))}
                >
                  <MenuItem value="savings">Savings Account</MenuItem>
                  <MenuItem value="current">Current Account</MenuItem>
                  <MenuItem value="fixed">Fixed Deposit</MenuItem>
                  <MenuItem value="recurring">Recurring Deposit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Initial Deposit"
                type="number"
                fullWidth
                required
                value={newAccountData.initialDeposit}
                onChange={(e) => setNewAccountData(prev => ({ ...prev, initialDeposit: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Purpose"
                fullWidth
                multiline
                rows={3}
                value={newAccountData.purpose}
                onChange={(e) => setNewAccountData(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="Describe the purpose of this account"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Preferred Branch</InputLabel>
                <Select
                  value={newAccountData.branch}
                  label="Preferred Branch"
                  onChange={(e) => setNewAccountData(prev => ({ ...prev, branch: e.target.value }))}
                >
                  <MenuItem value="main">Main Branch</MenuItem>
                  <MenuItem value="east">East Branch</MenuItem>
                  <MenuItem value="west">West Branch</MenuItem>
                  <MenuItem value="north">North Branch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewAccountOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleNewAccountSubmit}
            disabled={loading || !newAccountData.accountType || !newAccountData.initialDeposit}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserAccounts;
