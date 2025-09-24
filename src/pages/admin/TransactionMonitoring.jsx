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
  InputAdornment,
  Stack
} from '@mui/material';
import {
  Visibility,
  Search,
  Refresh,
  CheckCircle,
  Cancel,
  Warning,
  Block,
  MonetizationOn,
  TrendingUp,
  Security,
  History,
  FilterList,
  Settings
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const TransactionMonitoring = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [suspiciousTransactions, setSuspiciousTransactions] = useState([]);
  const [highValueTransactions, setHighValueTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    status: '',
    type: '',
    riskLevel: ''
  });

  // Dialog states
  const [transactionDialog, setTransactionDialog] = useState({ open: false, transaction: null });
  const [approvalDialog, setApprovalDialog] = useState({ open: false, transaction: null });
  const [limitsDialog, setLimitsDialog] = useState({ open: false });
  const [reversalDialog, setReversalDialog] = useState({ open: false, transaction: null });

  // Transaction limits state
  const [limits, setLimits] = useState({
    dailyLimit: 100000,
    monthlyLimit: 500000,
    highValueThreshold: 50000,
    suspiciousVelocityCount: 5,
    maxSingleTransaction: 200000
  });

  useEffect(() => {
    loadTransactions();
    loadSuspiciousTransactions();
    loadHighValueTransactions();
  }, [activeTab]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      let data;
      if (isDemoMode) {
        data = [
          {
            id: 1,
            transactionId: 'TXN001234567',
            fromAccount: 'ACC001234567',
            toAccount: 'ACC001234568',
            amount: 75000,
            type: 'TRANSFER',
            status: 'PENDING_APPROVAL',
            description: 'High-value wire transfer',
            timestamp: '2024-08-29 10:30:00',
            riskScore: 85,
            riskLevel: 'HIGH',
            flags: ['HIGH_VALUE', 'CROSS_BORDER'],
            customerName: 'John Doe',
            ipAddress: '192.168.1.100',
            deviceInfo: 'Chrome/Windows'
          },
          {
            id: 2,
            transactionId: 'TXN001234568',
            fromAccount: 'ACC001234569',
            toAccount: 'ACC001234570',
            amount: 2500,
            type: 'TRANSFER',
            status: 'COMPLETED',
            description: 'Monthly salary transfer',
            timestamp: '2024-08-29 09:15:00',
            riskScore: 15,
            riskLevel: 'LOW',
            flags: [],
            customerName: 'Jane Smith',
            ipAddress: '192.168.1.101',
            deviceInfo: 'Safari/iOS'
          },
          {
            id: 3,
            transactionId: 'TXN001234569',
            fromAccount: 'ACC001234571',
            toAccount: 'ACC001234572',
            amount: 150000,
            type: 'WIRE_TRANSFER',
            status: 'FLAGGED',
            description: 'International wire transfer',
            timestamp: '2024-08-29 08:45:00',
            riskScore: 95,
            riskLevel: 'CRITICAL',
            flags: ['HIGH_VALUE', 'SUSPICIOUS_PATTERN', 'INTERNATIONAL'],
            customerName: 'Bob Johnson',
            ipAddress: '10.0.0.55',
            deviceInfo: 'Firefox/Linux'
          }
        ];
      } else {
        data = await apiService.getAllTransactions();
      }
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadSuspiciousTransactions = async () => {
    try {
      let data;
      if (isDemoMode) {
        data = transactions.filter(t => t.riskLevel === 'HIGH' || t.riskLevel === 'CRITICAL');
      } else {
        data = await apiService.getSuspiciousTransactions();
      }
      setSuspiciousTransactions(data);
    } catch (error) {
      console.error('Error loading suspicious transactions:', error);
    }
  };

  const loadHighValueTransactions = async () => {
    try {
      let data;
      if (isDemoMode) {
        data = transactions.filter(t => t.amount >= 50000);
      } else {
        data = await apiService.getHighValueTransactions();
      }
      setHighValueTransactions(data);
    } catch (error) {
      console.error('Error loading high-value transactions:', error);
    }
  };

  const handleTransactionAction = async (action, transaction, reason = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: `Transaction ${action} successful` };
      } else {
        switch (action) {
          case 'approve':
            response = await apiService.approveTransaction(transaction.id);
            break;
          case 'reject':
            response = await apiService.rejectTransaction(transaction.id, reason);
            break;
          case 'reverse':
            response = await apiService.reverseTransaction(transaction.id, reason);
            break;
          case 'flag':
            response = await apiService.flagTransaction(transaction.id, reason);
            break;
          default:
            throw new Error('Invalid action');
        }
      }
      
      if (response.success) {
        setSuccess(response.message);
        loadTransactions();
        loadSuspiciousTransactions();
        loadHighValueTransactions();
      } else {
        setError(response.message || `Failed to ${action} transaction`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action} transaction`);
    } finally {
      setLoading(false);
      setApprovalDialog({ open: false, transaction: null });
      setReversalDialog({ open: false, transaction: null });
    }
  };

  const updateTransactionLimits = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: 'Transaction limits updated successfully' };
      } else {
        response = await apiService.updateTransactionLimits(limits);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setLimitsDialog({ open: false });
      } else {
        setError(response.message || 'Failed to update limits');
      }
    } catch (error) {
      setError(error.message || 'Failed to update limits');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'PENDING_APPROVAL': return 'info';
      case 'REJECTED': return 'error';
      case 'FLAGGED': return 'error';
      case 'REVERSED': return 'secondary';
      default: return 'default';
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'error';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.fromAccount?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.toAccount?.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilters = 
      (!filters.status || transaction.status === filters.status) &&
      (!filters.type || transaction.type === filters.type) &&
      (!filters.riskLevel || transaction.riskLevel === filters.riskLevel) &&
      (!filters.amountMin || transaction.amount >= parseFloat(filters.amountMin)) &&
      (!filters.amountMax || transaction.amount <= parseFloat(filters.amountMax));
    
    return matchesSearch && matchesFilters;
  });

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Transaction Monitoring</Typography>
        <Box display="flex" gap={2}>
          <Button 
            variant="outlined" 
            startIcon={<Settings />} 
            onClick={() => setLimitsDialog({ open: true })}
          >
            Set Limits
          </Button>
          <Button variant="contained" startIcon={<Refresh />} onClick={loadTransactions}>
            Refresh
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="All Transactions" />
            <Tab 
              label={
                <Badge badgeContent={suspiciousTransactions.length} color="error">
                  Suspicious
                </Badge>
              }
            />
            <Tab 
              label={
                <Badge badgeContent={highValueTransactions.length} color="warning">
                  High Value
                </Badge>
              }
            />
            <Tab label="Pending Approval" />
          </Tabs>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="PENDING_APPROVAL">Pending Approval</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                  <MenuItem value="FLAGGED">Flagged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="TRANSFER">Transfer</MenuItem>
                  <MenuItem value="WIRE_TRANSFER">Wire Transfer</MenuItem>
                  <MenuItem value="ACH">ACH</MenuItem>
                  <MenuItem value="CARD_PAYMENT">Card Payment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={filters.riskLevel}
                  onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="CRITICAL">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                variant="outlined" 
                startIcon={<FilterList />}
                onClick={() => setFilters({
                  dateFrom: '', dateTo: '', amountMin: '', amountMax: '', 
                  status: '', type: '', riskLevel: ''
                })}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Risk</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {transaction.transactionId}
                        </Typography>
                        {transaction.flags && transaction.flags.length > 0 && (
                          <Box mt={1}>
                            {transaction.flags.map((flag, index) => (
                              <Chip 
                                key={index}
                                label={flag.replace('_', ' ')} 
                                size="small" 
                                color="warning"
                                variant="outlined"
                                sx={{ mr: 0.5, fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transaction.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transaction.fromAccount} → {transaction.toAccount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          ${transaction.amount?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.type.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(transaction.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={`${transaction.riskLevel} (${transaction.riskScore})`} 
                          size="small" 
                          color={getRiskColor(transaction.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View Details">
                            <IconButton 
                              size="small" 
                              onClick={() => setTransactionDialog({ open: true, transaction })}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          {transaction.status === 'PENDING_APPROVAL' && (
                            <>
                              <Tooltip title="Approve">
                                <IconButton 
                                  size="small" 
                                  color="success"
                                  onClick={() => setApprovalDialog({ open: true, transaction, action: 'approve' })}
                                >
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => setApprovalDialog({ open: true, transaction, action: 'reject' })}
                                >
                                  <Cancel />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {transaction.status === 'COMPLETED' && (
                            <Tooltip title="Reverse">
                              <IconButton 
                                size="small" 
                                color="warning"
                                onClick={() => setReversalDialog({ open: true, transaction })}
                              >
                                <History />
                              </IconButton>
                            </Tooltip>
                          )}
                          {transaction.status !== 'FLAGGED' && (
                            <Tooltip title="Flag as Suspicious">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleTransactionAction('flag', transaction, 'Flagged for review')}
                              >
                                <Warning />
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
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog 
        open={transactionDialog.open} 
        onClose={() => setTransactionDialog({ open: false, transaction: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {transactionDialog.transaction && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transaction ID"
                  value={transactionDialog.transaction.transactionId || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  value={`$${transactionDialog.transaction.amount?.toLocaleString() || '0'}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="From Account"
                  value={transactionDialog.transaction.fromAccount || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="To Account"
                  value={transactionDialog.transaction.toAccount || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer"
                  value={transactionDialog.transaction.customerName || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Risk Score"
                  value={`${transactionDialog.transaction.riskScore}/100 (${transactionDialog.transaction.riskLevel})`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={transactionDialog.transaction.description || ''}
                  InputProps={{ readOnly: true }}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IP Address"
                  value={transactionDialog.transaction.ipAddress || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Device Info"
                  value={transactionDialog.transaction.deviceInfo || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransactionDialog({ open: false, transaction: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approval/Rejection Dialog */}
      <Dialog 
        open={approvalDialog.open} 
        onClose={() => setApprovalDialog({ open: false, transaction: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {approvalDialog.action === 'approve' ? 'Approve Transaction' : 'Reject Transaction'}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Transaction: {approvalDialog.transaction?.transactionId}
          </Typography>
          <Typography gutterBottom>
            Amount: ${approvalDialog.transaction?.amount?.toLocaleString()}
          </Typography>
          {approvalDialog.action === 'reject' && (
            <TextField
              fullWidth
              label="Reason for rejection"
              multiline
              rows={3}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog({ open: false, transaction: null })}>
            Cancel
          </Button>
          <Button 
            color={approvalDialog.action === 'approve' ? 'success' : 'error'}
            variant="contained"
            onClick={() => handleTransactionAction(approvalDialog.action, approvalDialog.transaction)}
            disabled={loading}
          >
            {approvalDialog.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transaction Limits Dialog */}
      <Dialog 
        open={limitsDialog.open} 
        onClose={() => setLimitsDialog({ open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Transaction Limits & Settings</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Daily Transaction Limit"
                type="number"
                value={limits.dailyLimit}
                onChange={(e) => setLimits({...limits, dailyLimit: e.target.value})}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monthly Transaction Limit"
                type="number"
                value={limits.monthlyLimit}
                onChange={(e) => setLimits({...limits, monthlyLimit: e.target.value})}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="High Value Threshold"
                type="number"
                value={limits.highValueThreshold}
                onChange={(e) => setLimits({...limits, highValueThreshold: e.target.value})}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Max Single Transaction"
                type="number"
                value={limits.maxSingleTransaction}
                onChange={(e) => setLimits({...limits, maxSingleTransaction: e.target.value})}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLimitsDialog({ open: false })}>
            Cancel
          </Button>
          <Button 
            color="primary"
            variant="contained"
            onClick={updateTransactionLimits}
            disabled={loading}
          >
            Update Limits
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reversal Dialog */}
      <Dialog 
        open={reversalDialog.open} 
        onClose={() => setReversalDialog({ open: false, transaction: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reverse Transaction</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Transaction: {reversalDialog.transaction?.transactionId}
          </Typography>
          <Typography gutterBottom>
            Amount: ${reversalDialog.transaction?.amount?.toLocaleString()}
          </Typography>
          <TextField
            fullWidth
            label="Reason for reversal"
            multiline
            rows={3}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReversalDialog({ open: false, transaction: null })}>
            Cancel
          </Button>
          <Button 
            color="warning"
            variant="contained"
            onClick={() => handleTransactionAction('reverse', reversalDialog.transaction, 'Admin reversal')}
            disabled={loading}
          >
            Reverse Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionMonitoring;
