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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  AccountBalance,
  Block,
  Warning,
  Timeline,
  Security,
  ExpandMore,
  Approval,
  MonetizationOn,
  Edit,
  Flag,
  Lock,
  Unlock,
  Search
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const ManagerAccountManagement = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Account Opening/Closing Requests
  const [accountRequests, setAccountRequests] = useState([
    {
      id: 1,
      requestType: 'OPENING',
      customerName: 'Alice Johnson',
      customerId: 'CUST001',
      accountType: 'Premium Savings',
      initialDeposit: 25000,
      requestDate: '2024-08-29 14:30:00',
      status: 'PENDING',
      priority: 'HIGH',
      kycStatus: 'COMPLETED',
      amlStatus: 'CLEAR',
      requestedBy: 'sarah.wilson@obs.com',
      reason: 'High-value customer with investment portfolio'
    },
    {
      id: 2,
      requestType: 'CLOSING',
      customerName: 'Robert Davis',
      customerId: 'CUST002',
      accountType: 'Business Checking',
      currentBalance: 150,
      requestDate: '2024-08-29 13:15:00',
      status: 'PENDING',
      priority: 'MEDIUM',
      kycStatus: 'VALID',
      amlStatus: 'CLEAR',
      requestedBy: 'mike.brown@obs.com',
      reason: 'Business closure, funds to be transferred'
    },
    {
      id: 3,
      requestType: 'OPENING',
      customerName: 'Maria Garcia',
      customerId: 'CUST003',
      accountType: 'Student Checking',
      initialDeposit: 500,
      requestDate: '2024-08-29 11:45:00',
      status: 'APPROVED',
      priority: 'LOW',
      kycStatus: 'COMPLETED',
      amlStatus: 'CLEAR',
      requestedBy: 'lisa.chen@obs.com',
      reason: 'Student account with university verification'
    }
  ]);

  // High-Value Transactions for Authorization
  const [pendingTransactions, setPendingTransactions] = useState([
    {
      id: 1,
      transactionId: 'TXN001',
      customerName: 'James Wilson',
      accountNumber: '****5678',
      transactionType: 'WIRE_TRANSFER',
      amount: 75000,
      recipient: 'International Business Corp',
      initiatedBy: 'david.kim@obs.com',
      timestamp: '2024-08-29 14:25:00',
      status: 'PENDING_AUTHORIZATION',
      flagReason: 'High-value international transfer',
      riskScore: 7.2
    },
    {
      id: 2,
      transactionId: 'TXN002',
      customerName: 'Susan Thompson',
      accountNumber: '****9012',
      transactionType: 'CASH_WITHDRAWAL',
      amount: 45000,
      recipient: 'Cash Withdrawal',
      initiatedBy: 'emily.davis@obs.com',
      timestamp: '2024-08-29 14:10:00',
      status: 'PENDING_AUTHORIZATION',
      flagReason: 'Large cash withdrawal exceeding daily limit',
      riskScore: 6.8
    },
    {
      id: 3,
      transactionId: 'TXN003',
      customerName: 'Michael Rodriguez',
      accountNumber: '****3456',
      transactionType: 'ACH_TRANSFER',
      amount: 35000,
      recipient: 'Property Investment LLC',
      initiatedBy: 'anna.white@obs.com',
      timestamp: '2024-08-29 13:55:00',
      status: 'REQUIRES_OVERRIDE',
      flagReason: 'Unusual transaction pattern detected',
      riskScore: 8.1
    }
  ]);

  // Suspicious Accounts
  const [suspiciousAccounts, setSuspiciousAccounts] = useState([
    {
      id: 1,
      customerName: 'Thomas Anderson',
      accountNumber: '****7890',
      accountType: 'Business Checking',
      currentBalance: 125000,
      flaggedDate: '2024-08-29 12:30:00',
      flagReason: 'Multiple large cash deposits in short timeframe',
      riskLevel: 'HIGH',
      investigationStatus: 'OPEN',
      flaggedBy: 'fraud-detection-system',
      lastActivity: '2024-08-29 14:20:00'
    },
    {
      id: 2,
      customerName: 'Jennifer Martinez',
      accountNumber: '****2468',
      accountType: 'Personal Savings',
      currentBalance: 85000,
      flaggedDate: '2024-08-29 10:15:00',
      flagReason: 'Transactions from sanctioned countries',
      riskLevel: 'CRITICAL',
      investigationStatus: 'ESCALATED',
      flaggedBy: 'aml-monitoring',
      lastActivity: '2024-08-29 11:45:00'
    },
    {
      id: 3,
      customerName: 'Richard Brown',
      accountNumber: '****1357',
      accountType: 'Investment Account',
      currentBalance: 250000,
      flaggedDate: '2024-08-28 16:20:00',
      flagReason: 'Unusual trading patterns detected',
      riskLevel: 'MEDIUM',
      investigationStatus: 'UNDER_REVIEW',
      flaggedBy: 'trading-surveillance',
      lastActivity: '2024-08-29 09:30:00'
    }
  ]);

  const [requestDialog, setRequestDialog] = useState({ open: false, request: null, type: '' });
  const [transactionDialog, setTransactionDialog] = useState({ open: false, transaction: null });
  const [accountDialog, setAccountDialog] = useState({ open: false, account: null });

  const handleAccountRequest = async (requestId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Account ${action.toLowerCase()} request processed successfully`
        };
        
        // Update local state
        setAccountRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: action.toUpperCase() }
            : req
        ));
      } else {
        response = await apiService.processAccountRequest(requestId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setRequestDialog({ open: false, request: null, type: '' });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} request`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} request`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAuthorization = async (transactionId, action, overrideReason = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Transaction ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setPendingTransactions(prev => prev.map(txn => 
          txn.id === transactionId 
            ? { ...txn, status: action === 'APPROVE' ? 'AUTHORIZED' : 'REJECTED' }
            : txn
        ));
      } else {
        response = await apiService.authorizeTransaction(transactionId, action, overrideReason);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setTransactionDialog({ open: false, transaction: null });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} transaction`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} transaction`);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountAction = async (accountId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Account ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state based on action
        setSuspiciousAccounts(prev => prev.map(acc => 
          acc.id === accountId 
            ? { ...acc, investigationStatus: action === 'FREEZE' ? 'FROZEN' : 'CLEARED' }
            : acc
        ));
      } else {
        response = await apiService.performAccountAction(accountId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setAccountDialog({ open: false, account: null });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} account`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} account`);
    } finally {
      setLoading(false);
    }
  };

  const adjustAccountParameters = async (accountId, parameters) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: 'Account parameters updated successfully'
        };
      } else {
        response = await apiService.adjustAccountParameters(accountId, parameters);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to update account parameters');
      }
    } catch (error) {
      setError(error.message || 'Failed to update account parameters');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': case 'PENDING_AUTHORIZATION': case 'OPEN': return 'warning';
      case 'APPROVED': case 'AUTHORIZED': case 'CLEAR': return 'success';
      case 'REJECTED': case 'FROZEN': return 'error';
      case 'REQUIRES_OVERRIDE': case 'ESCALATED': return 'error';
      case 'UNDER_REVIEW': return 'info';
      default: return 'default';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Account Management & Authorization
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Account Requests" />
        <Tab label="Transaction Authorization" />
        <Tab label="Suspicious Accounts" />
      </Tabs>

      {/* Account Requests Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Account Opening & Closing Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>KYC/AML</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Chip 
                          label={request.requestType} 
                          size="small" 
                          color={request.requestType === 'OPENING' ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {request.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {request.customerId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{request.accountType}</TableCell>
                      <TableCell>
                        ${(request.initialDeposit || request.currentBalance || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Chip 
                            label={`KYC: ${request.kycStatus}`} 
                            size="small" 
                            color={request.kycStatus === 'COMPLETED' ? 'success' : 'warning'}
                            sx={{ mb: 0.5, display: 'block' }}
                          />
                          <Chip 
                            label={`AML: ${request.amlStatus}`} 
                            size="small" 
                            color={request.amlStatus === 'CLEAR' ? 'success' : 'error'}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={request.priority} 
                          size="small" 
                          color={getRiskColor(request.priority)}
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
                          <IconButton 
                            size="small"
                            onClick={() => setRequestDialog({ 
                              open: true, 
                              request, 
                              type: 'account' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {request.status === 'PENDING' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleAccountRequest(request.id, 'APPROVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleAccountRequest(request.id, 'REJECT')}
                              >
                                <Cancel />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Transaction Authorization Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              High-Value Transactions Requiring Authorization
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Risk Score</TableCell>
                    <TableCell>Flag Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {transaction.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {transaction.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{transaction.transactionType.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ${transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{transaction.riskScore}/10</Typography>
                          <Chip 
                            label={transaction.riskScore >= 8 ? 'HIGH' : transaction.riskScore >= 6 ? 'MEDIUM' : 'LOW'} 
                            size="small" 
                            color={transaction.riskScore >= 8 ? 'error' : transaction.riskScore >= 6 ? 'warning' : 'success'}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transaction.flagReason}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(transaction.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setTransactionDialog({ 
                              open: true, 
                              transaction 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {(transaction.status === 'PENDING_AUTHORIZATION' || transaction.status === 'REQUIRES_OVERRIDE') && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleTransactionAuthorization(transaction.id, 'APPROVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleTransactionAuthorization(transaction.id, 'REJECT')}
                              >
                                <Cancel />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Suspicious Accounts Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Flagged & Suspicious Accounts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Flag Reason</TableCell>
                    <TableCell>Investigation</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suspiciousAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {account.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {account.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{account.accountType}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ${account.currentBalance.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={account.riskLevel} 
                          size="small" 
                          color={getRiskColor(account.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {account.flagReason}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={account.investigationStatus.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(account.investigationStatus)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setAccountDialog({ 
                              open: true, 
                              account 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleAccountAction(account.id, 'FREEZE')}
                            title="Freeze Account"
                          >
                            <Block />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleAccountAction(account.id, 'FLAG')}
                            title="Add Investigation Flag"
                          >
                            <Flag />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Request Details Dialog */}
      <Dialog 
        open={requestDialog.open} 
        onClose={() => setRequestDialog({ open: false, request: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Account Request Details</DialogTitle>
        <DialogContent>
          {requestDialog.request && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Request Type</Typography>
                <Typography>{requestDialog.request.requestType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{requestDialog.request.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Account Type</Typography>
                <Typography>{requestDialog.request.accountType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount</Typography>
                <Typography>
                  ${(requestDialog.request.initialDeposit || requestDialog.request.currentBalance || 0).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">KYC Status</Typography>
                <Chip 
                  label={requestDialog.request.kycStatus} 
                  size="small" 
                  color={requestDialog.request.kycStatus === 'COMPLETED' ? 'success' : 'warning'}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">AML Status</Typography>
                <Chip 
                  label={requestDialog.request.amlStatus} 
                  size="small" 
                  color={requestDialog.request.amlStatus === 'CLEAR' ? 'success' : 'error'}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Reason</Typography>
                <Typography>{requestDialog.request.reason}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Requested By</Typography>
                <Typography>{requestDialog.request.requestedBy}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialog({ open: false, request: null, type: '' })}>
            Close
          </Button>
          {requestDialog.request?.status === 'PENDING' && (
            <>
              <Button 
                color="success" 
                variant="contained"
                onClick={() => handleAccountRequest(requestDialog.request.id, 'APPROVE')}
              >
                Approve
              </Button>
              <Button 
                color="error" 
                variant="outlined"
                onClick={() => handleAccountRequest(requestDialog.request.id, 'REJECT')}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Transaction Details Dialog */}
      <Dialog 
        open={transactionDialog.open} 
        onClose={() => setTransactionDialog({ open: false, transaction: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Transaction Authorization</DialogTitle>
        <DialogContent>
          {transactionDialog.transaction && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Transaction ID</Typography>
                <Typography>{transactionDialog.transaction.transactionId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{transactionDialog.transaction.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Account</Typography>
                <Typography>{transactionDialog.transaction.accountNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{transactionDialog.transaction.transactionType.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount</Typography>
                <Typography variant="h6" color="primary">
                  ${transactionDialog.transaction.amount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Score</Typography>
                <Typography>{transactionDialog.transaction.riskScore}/10</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Recipient</Typography>
                <Typography>{transactionDialog.transaction.recipient}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Flag Reason</Typography>
                <Alert severity="warning">{transactionDialog.transaction.flagReason}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Initiated By</Typography>
                <Typography>{transactionDialog.transaction.initiatedBy}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransactionDialog({ open: false, transaction: null })}>
            Close
          </Button>
          {(transactionDialog.transaction?.status === 'PENDING_AUTHORIZATION' || 
            transactionDialog.transaction?.status === 'REQUIRES_OVERRIDE') && (
            <>
              <Button 
                color="success" 
                variant="contained"
                onClick={() => handleTransactionAuthorization(transactionDialog.transaction.id, 'APPROVE')}
              >
                Authorize
              </Button>
              <Button 
                color="error" 
                variant="outlined"
                onClick={() => handleTransactionAuthorization(transactionDialog.transaction.id, 'REJECT')}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Suspicious Account Details Dialog */}
      <Dialog 
        open={accountDialog.open} 
        onClose={() => setAccountDialog({ open: false, account: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Suspicious Account Investigation</DialogTitle>
        <DialogContent>
          {accountDialog.account && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{accountDialog.account.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Account</Typography>
                <Typography>{accountDialog.account.accountNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Account Type</Typography>
                <Typography>{accountDialog.account.accountType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Current Balance</Typography>
                <Typography>${accountDialog.account.currentBalance.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Level</Typography>
                <Chip 
                  label={accountDialog.account.riskLevel} 
                  color={getRiskColor(accountDialog.account.riskLevel)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Investigation Status</Typography>
                <Chip 
                  label={accountDialog.account.investigationStatus.replace('_', ' ')} 
                  color={getStatusColor(accountDialog.account.investigationStatus)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Flag Reason</Typography>
                <Alert severity="warning">{accountDialog.account.flagReason}</Alert>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Flagged By</Typography>
                <Typography>{accountDialog.account.flaggedBy}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Last Activity</Typography>
                <Typography>{new Date(accountDialog.account.lastActivity).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccountDialog({ open: false, account: null })}>
            Close
          </Button>
          <Button 
            color="error" 
            variant="contained"
            onClick={() => handleAccountAction(accountDialog.account?.id, 'FREEZE')}
          >
            Freeze Account
          </Button>
          <Button 
            color="warning" 
            variant="outlined"
            onClick={() => handleAccountAction(accountDialog.account?.id, 'ESCALATE')}
          >
            Escalate Investigation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerAccountManagement;
