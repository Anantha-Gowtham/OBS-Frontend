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
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tab,
  Tabs,
  Badge,
  Stack,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as KycIcon,
  AccountBalance as AccountIcon,
  Flag as FlagIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Pending as PendingIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Description as DocumentIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({});
  const [pendingKyc, setPendingKyc] = useState([]);
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [flaggedTransactions, setFlaggedTransactions] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  // KYC processing form state
  const [kycDecision, setKycDecision] = useState({
    decision: '',
    comments: ''
  });

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      setLoading(true);
      
      // Try to load real data from API, fallback to mock data
      try {
        const [dashboardResponse, kycResponse, accountsResponse, transactionsResponse, tasksResponse] = await Promise.all([
          apiService.get('/employee/dashboard'),
          apiService.get('/employee/kyc/pending'),
          apiService.get('/employee/accounts/pending'),
          apiService.get('/employee/transactions/flagged'),
          apiService.get('/employee/tasks')
        ]);

        setDashboardStats(dashboardResponse || {});
        setPendingKyc(kycResponse || []);
        setPendingAccounts(accountsResponse || []);
        setFlaggedTransactions(transactionsResponse || []);
        setMyTasks(tasksResponse || []);
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Fallback to mock data
        setDashboardStats(mockDashboardStats);
        setPendingKyc(mockPendingKyc);
        setPendingAccounts(mockPendingAccounts);
        setFlaggedTransactions(mockFlaggedTransactions);
        setMyTasks(mockTasks);
      }
      
    } catch (error) {
      console.error('Error loading employee data:', error);
      showAlert('Error loading employee data: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 5000);
  };

  const handleProcessKyc = async () => {
    try {
      await apiService.post(`/employee/kyc/${selectedKyc.id}/process`, kycDecision);
      showAlert(`KYC ${kycDecision.decision.toLowerCase()}d successfully`, 'success');
      setKycDialogOpen(false);
      setSelectedKyc(null);
      setKycDecision({ decision: '', comments: '' });
      loadEmployeeData();
    } catch (error) {
      showAlert('Error processing KYC: ' + error.message, 'error');
    }
  };

  const handleProcessAccount = async (accountId, decision) => {
    try {
      await apiService.post(`/employee/accounts/${accountId}/process`, { decision });
      showAlert(`Account ${decision.toLowerCase()}d successfully`, 'success');
      loadEmployeeData();
    } catch (error) {
      showAlert('Error processing account: ' + error.message, 'error');
    }
  };

  const handleFlagTransaction = async (transactionId, reason) => {
    try {
      await apiService.post(`/employee/transactions/${transactionId}/flag`, { reason });
      showAlert('Transaction flagged successfully', 'success');
      loadEmployeeData();
    } catch (error) {
      showAlert('Error flagging transaction: ' + error.message, 'error');
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle, badge }) => (
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
          </Box>
          <Badge badgeContent={badge} color="error">
            <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
              {icon}
            </Avatar>
          </Badge>
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
          Employee Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome back, {user?.firstName || user?.username}! Manage customer requests and daily operations.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending KYC"
            value={pendingKyc.length}
            icon={<KycIcon />}
            color="warning"
            subtitle="Require verification"
            badge={pendingKyc.length > 0 ? pendingKyc.length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Accounts"
            value={pendingAccounts.length}
            icon={<AccountIcon />}
            color="info"
            subtitle="Pending approval"
            badge={pendingAccounts.length > 0 ? pendingAccounts.length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Flagged Transactions"
            value={flaggedTransactions.length}
            icon={<FlagIcon />}
            color="error"
            subtitle="Need review"
            badge={flaggedTransactions.length > 0 ? flaggedTransactions.length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Tasks"
            value={myTasks.length}
            icon={<AssignmentIcon />}
            color="primary"
            subtitle="Active assignments"
          />
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`KYC Verification (${pendingKyc.length})`} />
            <Tab label={`Account Processing (${pendingAccounts.length})`} />
            <Tab label={`Transaction Review (${flaggedTransactions.length})`} />
            <Tab label={`My Tasks (${myTasks.length})`} />
          </Tabs>
        </Box>

        <CardContent>
          {/* KYC Verification Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pending KYC Verifications</Typography>
                <IconButton onClick={loadEmployeeData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell>Document Type</TableCell>
                      <TableCell>Document Number</TableCell>
                      <TableCell>Submitted Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingKyc.map((kyc) => (
                      <TableRow key={kyc.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2 }}>
                              {kyc.customerName?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {kyc.customerName}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {kyc.customerEmail}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={kyc.documentType}
                            color="primary"
                            size="small"
                            icon={<DocumentIcon />}
                          />
                        </TableCell>
                        <TableCell>{kyc.documentNumber}</TableCell>
                        <TableCell>{new Date(kyc.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={kyc.status}
                            color="warning"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<ApproveIcon />}
                              onClick={() => {
                                setSelectedKyc(kyc);
                                setKycDecision({ decision: 'APPROVE', comments: '' });
                                setKycDialogOpen(true);
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<RejectIcon />}
                              onClick={() => {
                                setSelectedKyc(kyc);
                                setKycDecision({ decision: 'REJECT', comments: '' });
                                setKycDialogOpen(true);
                              }}
                            >
                              Reject
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Account Processing Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pending Account Applications</Typography>
                <IconButton onClick={loadEmployeeData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                {pendingAccounts.map((account) => (
                  <Grid item xs={12} sm={6} md={4} key={account.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2 }}>
                            {account.customerName?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">{account.customerName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {account.accountType}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          <strong>Email:</strong> {account.customerEmail}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Phone:</strong> {account.phoneNumber}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Initial Deposit:</strong> ₹{account.initialDeposit?.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Applied:</strong> {new Date(account.appliedDate).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={() => handleProcessAccount(account.id, 'APPROVE')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            fullWidth
                            onClick={() => handleProcessAccount(account.id, 'REJECT')}
                          >
                            Reject
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Transaction Review Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Flagged Transactions for Review</Typography>
                <IconButton onClick={loadEmployeeData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Flag Reason</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {flaggedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            TXN{transaction.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                              {transaction.customerName?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2">
                              {transaction.customerName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          ₹{transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.type}
                            size="small"
                            color={transaction.type === 'TRANSFER' ? 'primary' : 'secondary'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.flagReason}
                            size="small"
                            color="warning"
                          />
                        </TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                            >
                              Clear
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                            >
                              Block
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* My Tasks Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>My Daily Tasks</Typography>
              <List>
                {myTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: task.priority === 'HIGH' ? 'error.main' : 
                                   task.priority === 'MEDIUM' ? 'warning.main' : 'info.main' 
                        }}>
                          <TimelineIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <>
                            <Typography variant="body2" color="textSecondary">
                              {task.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={task.priority}
                        color={task.priority === 'HIGH' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'info'}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Chip
                        label={task.status}
                        color={task.status === 'COMPLETED' ? 'success' : 'default'}
                        size="small"
                      />
                    </ListItem>
                    {index < myTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* KYC Processing Dialog */}
      <Dialog open={kycDialogOpen} onClose={() => setKycDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {kycDecision.decision === 'APPROVE' ? 'Approve' : 'Reject'} KYC Verification
        </DialogTitle>
        <DialogContent>
          {selectedKyc && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Customer: {selectedKyc.customerName}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Document: {selectedKyc.documentType} - {selectedKyc.documentNumber}
              </Typography>
              <TextField
                fullWidth
                label="Comments"
                multiline
                rows={4}
                value={kycDecision.comments}
                onChange={(e) => setKycDecision({ ...kycDecision, comments: e.target.value })}
                placeholder={
                  kycDecision.decision === 'APPROVE' 
                    ? 'Document verified successfully. All details match.'
                    : 'Please specify the reason for rejection...'
                }
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setKycDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleProcessKyc}
            color={kycDecision.decision === 'APPROVE' ? 'success' : 'error'}
          >
            {kycDecision.decision === 'APPROVE' ? 'Approve' : 'Reject'} KYC
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mock data for demonstration
const mockDashboardStats = {
  pendingKyc: 5,
  pendingAccounts: 8,
  flaggedTransactions: 3,
  myTasks: 12
};

const mockPendingKyc = [
  {
    id: 1,
    customerName: 'Rahul Gupta',
    customerEmail: 'rahul.gupta@email.com',
    documentType: 'AADHAAR',
    documentNumber: '1234-5678-9012',
    submittedDate: '2025-08-28T00:00:00Z',
    status: 'PENDING'
  },
  {
    id: 2,
    customerName: 'Sneha Patel',
    customerEmail: 'sneha.patel@email.com',
    documentType: 'PAN',
    documentNumber: 'ABCDE1234F',
    submittedDate: '2025-08-27T00:00:00Z',
    status: 'PENDING'
  }
];

const mockPendingAccounts = [
  {
    id: 1,
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.singh@email.com',
    phoneNumber: '+91-9876543210',
    accountType: 'SAVINGS',
    initialDeposit: 10000,
    appliedDate: '2025-08-26T00:00:00Z'
  },
  {
    id: 2,
    customerName: 'Meera Joshi',
    customerEmail: 'meera.joshi@email.com',
    phoneNumber: '+91-9876543211',
    accountType: 'CURRENT',
    initialDeposit: 25000,
    appliedDate: '2025-08-25T00:00:00Z'
  }
];

const mockFlaggedTransactions = [
  {
    id: 1,
    customerName: 'Arjun Mehta',
    amount: 500000,
    type: 'TRANSFER',
    flagReason: 'HIGH_AMOUNT',
    date: '2025-08-29T00:00:00Z',
    status: 'FLAGGED'
  },
  {
    id: 2,
    customerName: 'Pooja Sharma',
    amount: 100000,
    type: 'WITHDRAWAL',
    flagReason: 'UNUSUAL_PATTERN',
    date: '2025-08-28T00:00:00Z',
    status: 'FLAGGED'
  }
];

const mockTasks = [
  {
    id: 1,
    title: 'Review customer complaints',
    description: 'Process and respond to 5 pending customer complaints',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '2025-08-30T00:00:00Z'
  },
  {
    id: 2,
    title: 'Update customer profiles',
    description: 'Update contact information for 10 customer profiles',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: '2025-08-31T00:00:00Z'
  },
  {
    id: 3,
    title: 'Generate monthly report',
    description: 'Prepare monthly performance report for branch',
    priority: 'LOW',
    status: 'COMPLETED',
    dueDate: '2025-08-29T00:00:00Z'
  }
];

export default EmployeeDashboard;
