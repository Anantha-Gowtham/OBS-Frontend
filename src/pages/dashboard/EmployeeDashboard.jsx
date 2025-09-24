import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Grid
} from '@mui/material';
import {
  Assignment,
  MonitorHeart,
  AccountBox,
  TrendingUp,
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  Warning,
  Description,
  Person,
  Phone,
  Email,
  Home
} from '@mui/icons-material';

const EmployeeDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    accountType: '',
    initialDeposit: ''
  });

  // Mock data for employee dashboard
  const [dashboardData, setDashboardData] = useState({
    summary: {
      kycPending: 15,
      transactionsToday: 127,
      accountsOpened: 8,
      tasksCompleted: 42
    },
    kycApplications: [
      {
        id: 'KYC001',
        customerName: 'David Brown',
        applicationDate: '2024-01-20',
        documentsSubmitted: ['Aadhaar', 'PAN', 'Bank Statement'],
        status: 'Pending Verification',
        priority: 'High',
        accountType: 'Savings',
        phone: '+91-9876543210',
        email: 'david.brown@email.com'
      },
      {
        id: 'KYC002',
        customerName: 'Emma Wilson',
        applicationDate: '2024-01-21',
        documentsSubmitted: ['Passport', 'Utility Bill', 'Income Certificate'],
        status: 'Under Review',
        priority: 'Medium',
        accountType: 'Current',
        phone: '+91-9876543211',
        email: 'emma.wilson@email.com'
      },
      {
        id: 'KYC003',
        customerName: 'James Taylor',
        applicationDate: '2024-01-22',
        documentsSubmitted: ['Driving License', 'Voter ID', 'Salary Slip'],
        status: 'Pending Verification',
        priority: 'Low',
        accountType: 'Savings',
        phone: '+91-9876543212',
        email: 'james.taylor@email.com'
      }
    ],
    transactions: [
      {
        id: 'TXN001',
        accountNumber: 'ACC001234567',
        customerName: 'Alice Johnson',
        type: 'Transfer',
        amount: 25000,
        timestamp: '2024-01-22 10:30:00',
        status: 'Flagged',
        reason: 'High Amount Transfer'
      },
      {
        id: 'TXN002',
        accountNumber: 'ACC001234568',
        customerName: 'Bob Smith',
        type: 'Withdrawal',
        amount: 50000,
        timestamp: '2024-01-22 11:15:00',
        status: 'Under Review',
        reason: 'Unusual Pattern'
      },
      {
        id: 'TXN003',
        accountNumber: 'ACC001234569',
        customerName: 'Carol Davis',
        type: 'Deposit',
        amount: 100000,
        timestamp: '2024-01-22 12:00:00',
        status: 'Flagged',
        reason: 'Large Cash Deposit'
      }
    ],
    recentAccounts: [
      {
        accountNumber: 'ACC001234570',
        customerName: 'Michael Brown',
        accountType: 'Savings',
        openedDate: '2024-01-22',
        initialDeposit: 10000,
        status: 'Active'
      },
      {
        accountNumber: 'ACC001234571',
        customerName: 'Sarah Wilson',
        accountType: 'Current',
        openedDate: '2024-01-21',
        initialDeposit: 25000,
        status: 'Active'
      }
    ]
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleKycAction = (kycId, action) => {
    setDashboardData(prev => ({
      ...prev,
      kycApplications: prev.kycApplications.map(kyc =>
        kyc.id === kycId 
          ? { ...kyc, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : kyc
      )
    }));
    setKycDialogOpen(false);
  };

  const handleViewKycDetails = (kyc) => {
    setSelectedKyc(kyc);
    setKycDialogOpen(true);
  };

  const handleNewAccountSubmit = () => {
    const newAccount = {
      accountNumber: `ACC00123457${dashboardData.recentAccounts.length + 2}`,
      customerName: newAccountData.customerName,
      accountType: newAccountData.accountType,
      openedDate: new Date().toISOString().split('T')[0],
      initialDeposit: parseInt(newAccountData.initialDeposit),
      status: 'Active'
    };

    setDashboardData(prev => ({
      ...prev,
      recentAccounts: [newAccount, ...prev.recentAccounts],
      summary: {
        ...prev.summary,
        accountsOpened: prev.summary.accountsOpened + 1
      }
    }));

    setNewAccountData({
      customerName: '',
      email: '',
      phone: '',
      address: '',
      accountType: '',
      initialDeposit: ''
    });
    setAccountDialogOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Verification': return 'warning';
      case 'Under Review': return 'info';
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Flagged': return 'error';
      case 'Active': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">KYC Pending</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {dashboardData.summary.kycPending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonitorHeart color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Transactions Today</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {dashboardData.summary.transactionsToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBox color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Accounts Opened</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {dashboardData.summary.accountsOpened}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Tasks Completed</Typography>
              </Box>
              <Typography variant="h4" color="secondary">
                {dashboardData.summary.tasksCompleted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="KYC Processing" />
          <Tab label="Transaction Monitoring" />
          <Tab label="Account Opening" />
        </Tabs>
      </Box>

      {/* KYC Processing Tab */}
      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              KYC Applications for Review
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>KYC ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Application Date</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.kycApplications.map((kyc) => (
                    <TableRow key={kyc.id}>
                      <TableCell>{kyc.id}</TableCell>
                      <TableCell>{kyc.customerName}</TableCell>
                      <TableCell>{kyc.applicationDate}</TableCell>
                      <TableCell>{kyc.accountType}</TableCell>
                      <TableCell>
                        <Chip 
                          label={kyc.priority} 
                          color={getPriorityColor(kyc.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={kyc.status} 
                          color={getStatusColor(kyc.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleViewKycDetails(kyc)}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Transaction Monitoring Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Flagged Transactions
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Monitor transactions that require manual review due to suspicious patterns or high amounts.
            </Alert>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.accountNumber}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>{transaction.timestamp}</TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.status} 
                          color={getStatusColor(transaction.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{transaction.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Account Opening Tab */}
      {tabValue === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Open New Account
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setAccountDialogOpen(true)}
                    sx={{ mb: 2 }}
                  >
                    Open New Account
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Progress
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Accounts Opened Today: {dashboardData.summary.accountsOpened}/10
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(dashboardData.summary.accountsOpened / 10) * 100} 
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recently Opened Accounts
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Number</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Account Type</TableCell>
                      <TableCell>Opened Date</TableCell>
                      <TableCell>Initial Deposit</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.recentAccounts.map((account) => (
                      <TableRow key={account.accountNumber}>
                        <TableCell>{account.accountNumber}</TableCell>
                        <TableCell>{account.customerName}</TableCell>
                        <TableCell>{account.accountType}</TableCell>
                        <TableCell>{account.openedDate}</TableCell>
                        <TableCell>₹{account.initialDeposit.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={account.status} 
                            color={getStatusColor(account.status)}
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
        </Box>
      )}

      {/* KYC Details Dialog */}
      <Dialog open={kycDialogOpen} onClose={() => setKycDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>KYC Application Details</DialogTitle>
        <DialogContent>
          {selectedKyc && (
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="KYC ID"
                    value={selectedKyc.id}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Customer Name"
                    value={selectedKyc.customerName}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Phone"
                    value={selectedKyc.phone}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Email"
                    value={selectedKyc.email}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Account Type"
                    value={selectedKyc.accountType}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Priority"
                    value={selectedKyc.priority}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Documents Submitted:
              </Typography>
              {selectedKyc.documentsSubmitted.map((doc, index) => (
                <Chip key={index} label={doc} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setKycDialogOpen(false)}>Close</Button>
          {selectedKyc && (selectedKyc.status === 'Pending Verification' || selectedKyc.status === 'Under Review') && (
            <>
              <Button 
                onClick={() => handleKycAction(selectedKyc.id, 'reject')} 
                color="error"
                startIcon={<Cancel />}
              >
                Reject
              </Button>
              <Button 
                onClick={() => handleKycAction(selectedKyc.id, 'approve')} 
                color="success"
                startIcon={<CheckCircle />}
              >
                Approve
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* New Account Dialog */}
      <Dialog open={accountDialogOpen} onClose={() => setAccountDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Open New Account</DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Name"
            value={newAccountData.customerName}
            onChange={(e) => setNewAccountData({...newAccountData, customerName: e.target.value})}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={newAccountData.email}
            onChange={(e) => setNewAccountData({...newAccountData, email: e.target.value})}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            value={newAccountData.phone}
            onChange={(e) => setNewAccountData({...newAccountData, phone: e.target.value})}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            value={newAccountData.address}
            onChange={(e) => setNewAccountData({...newAccountData, address: e.target.value})}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={newAccountData.accountType}
              onChange={(e) => setNewAccountData({...newAccountData, accountType: e.target.value})}
            >
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Current">Current</MenuItem>
              <MenuItem value="Fixed Deposit">Fixed Deposit</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Initial Deposit"
            value={newAccountData.initialDeposit}
            onChange={(e) => setNewAccountData({...newAccountData, initialDeposit: e.target.value})}
            fullWidth
            margin="normal"
            type="number"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccountDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleNewAccountSubmit}
            variant="contained"
            disabled={!newAccountData.customerName || !newAccountData.email || !newAccountData.phone || !newAccountData.accountType}
          >
            Open Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDashboard;
