import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  AccountBalance as AccountIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Refresh as RefreshIcon,
  Send as SendIcon,
  Receipt as ReceiptIcon,
  CreditCard as CardIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Try to load real data from API, fallback to mock data
      try {
        const [accountsResponse, transactionsResponse, cardsResponse, profileResponse] = await Promise.all([
          apiService.get('/user/accounts'),
          apiService.get('/user/transactions'),
          apiService.get('/user/cards'),
          apiService.get('/user/profile')
        ]);

        setAccounts(accountsResponse || []);
        setTransactions(transactionsResponse || []);
        setCards(cardsResponse || []);
        setProfile(profileResponse || {});
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Fallback to mock data
        setAccounts(mockAccounts);
        setTransactions(mockTransactions);
        setCards(mockCards);
        setProfile(mockProfile);
      }
      
    } catch (error) {
      console.error('Error loading user data:', error);
      showAlert('Error loading user data: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 5000);
  };

  const handleTransfer = async () => {
    // Will be implemented with transfer dialog
    showAlert('Transfer feature coming soon!', 'info');
  };

  const handlePayment = async () => {
    // Will be implemented with payment dialog
    showAlert('Payment feature coming soon!', 'info');
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle, action }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" color={color}>
              {value}
            </Typography>
            {subtitle && (
              <Typography color="textSecondary" variant="body2">
                {subtitle}
              </Typography>
            )}
            {action && (
              <Button size="small" sx={{ mt: 1 }} onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Alert */}
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.firstName || user?.username}!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your banking needs with ease and security.
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Balance"
            value={`₹${totalBalance.toLocaleString()}`}
            icon={<AccountIcon />}
            color="success"
            subtitle={`${accounts.length} accounts`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="This Month"
            value={`₹${transactions.filter(t => t.type === 'CREDIT').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`}
            icon={<TrendingUpIcon />}
            color="primary"
            subtitle="Credits received"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Quick Transfer"
            value="Send Money"
            icon={<SendIcon />}
            color="info"
            action={{ label: 'Transfer', onClick: handleTransfer }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Quick Payment"
            value="Pay Bills"
            icon={<PaymentIcon />}
            color="warning"
            action={{ label: 'Pay', onClick: handlePayment }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Accounts Section */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  My Accounts
                </Typography>
                <IconButton onClick={loadUserData}>
                  <RefreshIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                {accounts.map((account) => (
                  <Grid item xs={12} sm={6} key={account.id}>
                    <Card variant="outlined" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6">
                            {account.accountType || 'Savings Account'}
                          </Typography>
                          <Chip
                            label={account.status || 'Active'}
                            color={account.status === 'ACTIVE' ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                        <Typography variant="h4" gutterBottom>
                          ₹{(account.balance || 0).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Account: {account.accountNumber || '****1234'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Branch: {account.branchName || 'Main Branch'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Transactions
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.slice(0, 10).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.createdAt || Date.now()).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{transaction.description || 'Transaction'}</TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.type || 'TRANSFER'}
                            color={transaction.type === 'CREDIT' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ 
                          color: transaction.type === 'CREDIT' ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}>
                          {transaction.type === 'CREDIT' ? '+' : '-'}₹{(transaction.amount || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status || 'COMPLETED'}
                            color={transaction.status === 'COMPLETED' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Profile */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2}>
            {/* Profile Summary */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Profile Summary
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">
                        {profile.firstName} {profile.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {profile.email || user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    Customer ID: {profile.customerId || user?.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Member since: {new Date(profile.createdAt || Date.now()).getFullYear()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Cards */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    My Cards
                  </Typography>
                  <List dense>
                    {cards.map((card, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                              <CardIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${card.cardType || 'Debit'} Card`}
                            secondary={`****${card.lastFourDigits || '1234'}`}
                          />
                          <Chip
                            label={card.status || 'Active'}
                            color={card.status === 'ACTIVE' ? 'success' : 'default'}
                            size="small"
                          />
                        </ListItem>
                        {index < cards.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Quick Actions
                  </Typography>
                  <List dense>
                    <ListItem button onClick={handleTransfer}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                          <SendIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Fund Transfer"
                        secondary="Send money to other accounts"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handlePayment}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'warning.main' }}>
                          <PaymentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Bill Payment"
                        secondary="Pay utility bills and more"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <ReceiptIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Statements"
                        secondary="Download account statements"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

// Mock data for demonstration
const mockAccounts = [
  {
    id: 1,
    accountNumber: '1234567890',
    accountType: 'SAVINGS',
    balance: 125000,
    status: 'ACTIVE',
    branchName: 'Main Branch'
  },
  {
    id: 2,
    accountNumber: '0987654321',
    accountType: 'CURRENT',
    balance: 75000,
    status: 'ACTIVE',
    branchName: 'Corporate Branch'
  }
];

const mockTransactions = [
  {
    id: 1,
    description: 'Salary Credit',
    amount: 50000,
    type: 'CREDIT',
    status: 'COMPLETED',
    createdAt: '2025-08-29T10:00:00Z'
  },
  {
    id: 2,
    description: 'Online Shopping',
    amount: 5000,
    type: 'DEBIT',
    status: 'COMPLETED',
    createdAt: '2025-08-28T15:30:00Z'
  },
  {
    id: 3,
    description: 'Fund Transfer',
    amount: 10000,
    type: 'DEBIT',
    status: 'COMPLETED',
    createdAt: '2025-08-27T12:15:00Z'
  }
];

const mockCards = [
  {
    id: 1,
    cardType: 'DEBIT',
    lastFourDigits: '1234',
    status: 'ACTIVE'
  },
  {
    id: 2,
    cardType: 'CREDIT',
    lastFourDigits: '5678',
    status: 'ACTIVE'
  }
];

const mockProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  customerId: 'CUST001',
  createdAt: '2023-01-15T00:00:00Z'
};

export default UserDashboard;
