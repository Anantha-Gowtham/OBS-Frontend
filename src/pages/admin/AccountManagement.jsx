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
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Switch,
  FormControlLabel,
  Tooltip,
  Badge,
  InputAdornment
} from '@mui/material';
import {
  Add,
  Edit,
  Block,
  CheckCircle,
  Cancel,
  Visibility,
  Search,
  Refresh,
  AccountBalance,
  CreditCard,
  Security,
  Lock,
  MonetizationOn
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const AccountManagement = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Dialog states
  const [accountDialog, setAccountDialog] = useState({ open: false, account: null });
  const [requestDialog, setRequestDialog] = useState({ open: false, request: null });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: '', account: null });

  // Account form state
  const [accountForm, setAccountForm] = useState({
    customerId: '',
    accountType: '',
    balance: '',
    interestRate: '',
    dailyLimit: '',
    monthlyLimit: '',
    status: 'ACTIVE',
    branch: ''
  });

  useEffect(() => {
    loadAccounts();
    loadRequests();
  }, [activeTab]);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      let data;
      if (isDemoMode) {
        data = [
          {
            id: 1,
            accountNumber: 'ACC001234567',
            customerId: 'CUST001',
            customerName: 'John Doe',
            accountType: 'SAVINGS',
            balance: 25000.50,
            status: 'ACTIVE',
            interestRate: 3.5,
            dailyLimit: 50000,
            monthlyLimit: 200000,
            branch: 'Main Branch',
            openDate: '2024-01-15',
            lastActivity: '2024-08-28'
          },
          {
            id: 2,
            accountNumber: 'ACC001234568',
            customerId: 'CUST002',
            customerName: 'Jane Smith',
            accountType: 'CHECKING',
            balance: 15000.00,
            status: 'FROZEN',
            interestRate: 1.5,
            dailyLimit: 25000,
            monthlyLimit: 100000,
            branch: 'Downtown Branch',
            openDate: '2024-02-20',
            lastActivity: '2024-08-27'
          },
          {
            id: 3,
            accountNumber: 'ACC001234569',
            customerId: 'CUST003',
            customerName: 'Bob Johnson',
            accountType: 'LOAN',
            balance: -50000.00,
            status: 'ACTIVE',
            interestRate: 8.5,
            dailyLimit: 0,
            monthlyLimit: 0,
            branch: 'Suburban Branch',
            openDate: '2024-03-10',
            lastActivity: '2024-08-26'
          }
        ];
      } else {
        data = await apiService.getAllAccounts();
      }
      setAccounts(data);
    } catch (error) {
      console.error('Error loading accounts:', error);
      setError('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    try {
      let data;
      if (isDemoMode) {
        data = [
          {
            id: 1,
            type: 'ACCOUNT_OPENING',
            customerId: 'CUST004',
            customerName: 'Alice Brown',
            accountType: 'SAVINGS',
            requestedAmount: 10000,
            status: 'PENDING',
            submittedDate: '2024-08-28',
            documents: ['ID_PROOF', 'ADDRESS_PROOF', 'INCOME_PROOF'],
            priority: 'HIGH'
          },
          {
            id: 2,
            type: 'CREDIT_LIMIT_INCREASE',
            customerId: 'CUST002',
            customerName: 'Jane Smith',
            accountNumber: 'ACC001234568',
            currentLimit: 25000,
            requestedLimit: 50000,
            status: 'PENDING',
            submittedDate: '2024-08-27',
            priority: 'MEDIUM'
          },
          {
            id: 3,
            type: 'ACCOUNT_CLOSURE',
            customerId: 'CUST005',
            customerName: 'Charlie Wilson',
            accountNumber: 'ACC001234570',
            accountType: 'SAVINGS',
            balance: 1250.75,
            status: 'PENDING',
            submittedDate: '2024-08-25',
            priority: 'LOW'
          }
        ];
      } else {
        data = await apiService.getAccountRequests();
      }
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const handleAccountAction = async (action, account) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        // Simulate API response
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: `Account ${action} successful` };
      } else {
        switch (action) {
          case 'freeze':
            response = await apiService.freezeAccount(account.id);
            break;
          case 'unfreeze':
            response = await apiService.unfreezeAccount(account.id);
            break;
          case 'close':
            response = await apiService.closeAccount(account.id);
            break;
          default:
            throw new Error('Invalid action');
        }
      }
      
      if (response.success) {
        setSuccess(response.message);
        loadAccounts();
      } else {
        setError(response.message || `Failed to ${action} account`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action} account`);
    } finally {
      setLoading(false);
      setConfirmDialog({ open: false, action: '', account: null });
    }
  };

  const handleRequestAction = async (action, request) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: `Request ${action} successful` };
      } else {
        response = await apiService.handleAccountRequest(request.id, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
        loadRequests();
        if (action === 'approve') {
          loadAccounts(); // Refresh accounts if request was approved
        }
      } else {
        setError(response.message || `Failed to ${action} request`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action} request`);
    } finally {
      setLoading(false);
      setRequestDialog({ open: false, request: null });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'FROZEN': return 'warning';
      case 'CLOSED': return 'error';
      case 'PENDING': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'default';
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.accountNumber?.toLowerCase().includes(search.toLowerCase()) ||
    account.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    account.customerId?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRequests = requests.filter(request =>
    request.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    request.customerId?.toLowerCase().includes(search.toLowerCase()) ||
    request.type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Account Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAccountDialog({ open: true, account: null })}>
          New Account Request
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="All Accounts" />
            <Tab 
              label={
                <Badge badgeContent={requests.filter(r => r.status === 'PENDING').length} color="error">
                  Pending Requests
                </Badge>
              }
            />
            <Tab label="Frozen Accounts" />
            <Tab label="Closed Accounts" />
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
              placeholder="Search accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
              }}
              sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={activeTab === 0 ? loadAccounts : loadRequests} disabled={loading}>
              <Refresh />
            </IconButton>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {activeTab === 0 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>{account.accountNumber}</TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {account.customerName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {account.customerId}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={account.accountType} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color={account.balance < 0 ? 'error.main' : 'text.primary'}>
                              ${account.balance?.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={account.status} 
                              size="small" 
                              color={getStatusColor(account.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small" 
                                  onClick={() => setAccountDialog({ open: true, account })}
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              {account.status === 'ACTIVE' && (
                                <Tooltip title="Freeze Account">
                                  <IconButton 
                                    size="small" 
                                    color="warning"
                                    onClick={() => setConfirmDialog({ open: true, action: 'freeze', account })}
                                  >
                                    <Lock />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {account.status === 'FROZEN' && (
                                <Tooltip title="Unfreeze Account">
                                  <IconButton 
                                    size="small" 
                                    color="success"
                                    onClick={() => setConfirmDialog({ open: true, action: 'unfreeze', account })}
                                  >
                                    <CheckCircle />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {account.status !== 'CLOSED' && (
                                <Tooltip title="Close Account">
                                  <IconButton 
                                    size="small" 
                                    color="error"
                                    onClick={() => setConfirmDialog({ open: true, action: 'close', account })}
                                  >
                                    <Block />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {activeTab === 1 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Request Type</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Chip 
                              label={request.type.replace('_', ' ')} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {request.customerName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {request.customerId}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {request.type === 'ACCOUNT_OPENING' && (
                              <Typography variant="body2">
                                {request.accountType} - ${request.requestedAmount?.toLocaleString()}
                              </Typography>
                            )}
                            {request.type === 'CREDIT_LIMIT_INCREASE' && (
                              <Typography variant="body2">
                                ${request.currentLimit?.toLocaleString()} → ${request.requestedLimit?.toLocaleString()}
                              </Typography>
                            )}
                            {request.type === 'ACCOUNT_CLOSURE' && (
                              <Typography variant="body2">
                                {request.accountType} - ${request.balance?.toLocaleString()}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={request.priority} 
                              size="small" 
                              color={getPriorityColor(request.priority)}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={request.status} 
                              size="small" 
                              color={getStatusColor(request.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small" 
                                  onClick={() => setRequestDialog({ open: true, request })}
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Account Details Dialog */}
      <Dialog 
        open={accountDialog.open} 
        onClose={() => setAccountDialog({ open: false, account: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {accountDialog.account ? 'Account Details' : 'New Account Request'}
        </DialogTitle>
        <DialogContent>
          {accountDialog.account && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={accountDialog.account.accountNumber || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={accountDialog.account.customerName || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Type"
                  value={accountDialog.account.accountType || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Balance"
                  value={`$${accountDialog.account.balance?.toLocaleString() || '0'}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Interest Rate (%)"
                  value={accountDialog.account.interestRate || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Daily Limit"
                  value={`$${accountDialog.account.dailyLimit?.toLocaleString() || '0'}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Monthly Limit"
                  value={`$${accountDialog.account.monthlyLimit?.toLocaleString() || '0'}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Status"
                  value={accountDialog.account.status || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccountDialog({ open: false, account: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Details Dialog */}
      <Dialog 
        open={requestDialog.open} 
        onClose={() => setRequestDialog({ open: false, request: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {requestDialog.request && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {requestDialog.request.type.replace('_', ' ')}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customer: {requestDialog.request.customerName} ({requestDialog.request.customerId})
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Submitted: {requestDialog.request.submittedDate}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Priority: {requestDialog.request.priority}
              </Typography>
              
              {requestDialog.request.status === 'PENDING' && (
                <Box mt={3} display="flex" gap={2}>
                  <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => handleRequestAction('approve', requestDialog.request)}
                    disabled={loading}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleRequestAction('reject', requestDialog.request)}
                    disabled={loading}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialog({ open: false, request: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, action: '', account: null })}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmDialog.action} account {confirmDialog.account?.accountNumber}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, action: '', account: null })}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            variant="contained"
            onClick={() => handleAccountAction(confirmDialog.action, confirmDialog.account)}
            disabled={loading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountManagement;
