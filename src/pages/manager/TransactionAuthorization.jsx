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
  FormControlLabel,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  MonetizationOn,
  Warning,
  Timeline,
  Security,
  ExpandMore,
  Approval,
  Block,
  Undo,
  Receipt,
  CreditCard,
  AccountBalance,
  TrendingUp,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const TransactionAuthorization = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // High-Value Transactions Above Threshold
  const [highValueTransactions, setHighValueTransactions] = useState([
    {
      id: 1,
      transactionId: 'TXN2024-001',
      customerName: 'Enterprise Solutions Inc.',
      customerId: 'CORP001',
      accountNumber: '****5678',
      transactionType: 'WIRE_TRANSFER',
      amount: 250000,
      recipient: 'Global Manufacturing Ltd.',
      recipientBank: 'International Bank AG',
      purpose: 'Equipment Purchase',
      initiatedBy: 'sarah.manager@obs.com',
      timestamp: '2024-08-29 14:25:00',
      status: 'PENDING_AUTHORIZATION',
      thresholdType: 'AMOUNT_THRESHOLD',
      currentThreshold: 100000,
      riskScore: 6.5,
      complianceFlags: []
    },
    {
      id: 2,
      transactionId: 'TXN2024-002',
      customerName: 'Medical Center Holdings',
      customerId: 'CORP002',
      accountNumber: '****9012',
      transactionType: 'ACH_TRANSFER',
      amount: 150000,
      recipient: 'Pharmaceutical Suppliers Co.',
      recipientBank: 'National Trust Bank',
      purpose: 'Medical Supplies',
      initiatedBy: 'mike.associate@obs.com',
      timestamp: '2024-08-29 13:45:00',
      status: 'PENDING_AUTHORIZATION',
      thresholdType: 'DAILY_LIMIT_EXCEEDED',
      currentThreshold: 75000,
      riskScore: 4.2,
      complianceFlags: ['KYC_VERIFICATION_REQUIRED']
    },
    {
      id: 3,
      transactionId: 'TXN2024-003',
      customerName: 'Johnson Family Trust',
      customerId: 'TRUST001',
      accountNumber: '****3456',
      transactionType: 'INVESTMENT_TRANSFER',
      amount: 500000,
      recipient: 'Premium Investment Fund',
      recipientBank: 'Investment Bank LLC',
      purpose: 'Portfolio Diversification',
      initiatedBy: 'lisa.advisor@obs.com',
      timestamp: '2024-08-29 12:30:00',
      status: 'APPROVED',
      thresholdType: 'INVESTMENT_THRESHOLD',
      currentThreshold: 250000,
      riskScore: 3.8,
      complianceFlags: []
    }
  ]);

  // Transaction Overrides & Exceptions
  const [transactionOverrides, setTransactionOverrides] = useState([
    {
      id: 1,
      transactionId: 'TXN2024-004',
      customerName: 'Robert Chen',
      customerId: 'IND001',
      accountNumber: '****7890',
      originalAmount: 25000,
      declineReason: 'Insufficient funds',
      overrideRequested: 'Temporary overdraft approval',
      requestedBy: 'branch.manager@obs.com',
      requestTime: '2024-08-29 14:10:00',
      status: 'PENDING_OVERRIDE',
      justification: 'Customer has salary deposit scheduled for tomorrow, long-standing customer with excellent credit',
      riskAssessment: 'LOW'
    },
    {
      id: 2,
      transactionId: 'TXN2024-005',
      customerName: 'Tech Startup LLC',
      customerId: 'STARTUP001',
      accountNumber: '****2468',
      originalAmount: 75000,
      declineReason: 'International transfer restrictions',
      overrideRequested: 'Sanctions screening override',
      requestedBy: 'compliance.officer@obs.com',
      requestTime: '2024-08-29 13:20:00',
      status: 'REQUIRES_SENIOR_APPROVAL',
      justification: 'Recipient cleared by enhanced due diligence, legitimate business transaction',
      riskAssessment: 'MEDIUM'
    },
    {
      id: 3,
      transactionId: 'TXN2024-006',
      customerName: 'Maria Rodriguez',
      customerId: 'IND002',
      accountNumber: '****1357',
      originalAmount: 12000,
      declineReason: 'Daily limit exceeded',
      overrideRequested: 'Emergency medical payment',
      requestedBy: 'customer.service@obs.com',
      requestTime: '2024-08-29 11:45:00',
      status: 'APPROVED',
      justification: 'Medical emergency, supporting documentation provided',
      riskAssessment: 'LOW'
    }
  ]);

  // Chargeback & Reversal Requests
  const [chargebackRequests, setChargebackRequests] = useState([
    {
      id: 1,
      requestId: 'CB2024-001',
      originalTransactionId: 'TXN2024-100',
      customerName: 'Alexandra Smith',
      customerId: 'IND003',
      accountNumber: '****4567',
      merchantName: 'Online Electronics Store',
      transactionAmount: 1250,
      transactionDate: '2024-08-25 16:30:00',
      disputeReason: 'Unauthorized transaction',
      investigationStatus: 'OPEN',
      evidenceProvided: ['Bank statements', 'Police report'],
      requestedBy: 'fraud.team@obs.com',
      requestTime: '2024-08-28 10:15:00',
      status: 'PENDING_INVESTIGATION',
      estimatedResolution: '2024-09-05'
    },
    {
      id: 2,
      requestId: 'CB2024-002',
      originalTransactionId: 'TXN2024-101',
      customerName: 'Business Solutions Corp',
      customerId: 'CORP003',
      accountNumber: '****8901',
      merchantName: 'Software Licensing Inc',
      transactionAmount: 5000,
      transactionDate: '2024-08-20 14:00:00',
      disputeReason: 'Service not delivered',
      investigationStatus: 'EVIDENCE_REVIEW',
      evidenceProvided: ['Contract', 'Email correspondence', 'Delivery receipts'],
      requestedBy: 'commercial.team@obs.com',
      requestTime: '2024-08-27 09:30:00',
      status: 'READY_FOR_DECISION',
      estimatedResolution: '2024-09-01'
    },
    {
      id: 3,
      requestId: 'CB2024-003',
      originalTransactionId: 'TXN2024-102',
      customerName: 'David Wilson',
      customerId: 'IND004',
      accountNumber: '****2345',
      merchantName: 'Travel Booking Platform',
      transactionAmount: 2800,
      transactionDate: '2024-08-15 11:20:00',
      disputeReason: 'Cancelled service - refund not processed',
      investigationStatus: 'RESOLVED',
      evidenceProvided: ['Cancellation confirmation', 'Refund policy'],
      requestedBy: 'customer.service@obs.com',
      requestTime: '2024-08-26 14:45:00',
      status: 'CHARGEBACK_INITIATED',
      estimatedResolution: '2024-08-30'
    }
  ]);

  const [transactionDialog, setTransactionDialog] = useState({ open: false, transaction: null, type: '' });
  const [overrideReason, setOverrideReason] = useState('');

  const handleTransactionAuthorization = async (transactionId, action, reason = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = { 
          success: true, 
          message: `Transaction ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setHighValueTransactions(prev => prev.map(txn => 
          txn.id === transactionId 
            ? { ...txn, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
            : txn
        ));
      } else {
        response = await apiService.authorizeHighValueTransaction(transactionId, action, reason);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setTransactionDialog({ open: false, transaction: null, type: '' });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} transaction`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} transaction`);
    } finally {
      setLoading(false);
    }
  };

  const handleOverrideDecision = async (overrideId, action, reason = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Override request ${action.toLowerCase()}ed`
        };
        
        // Update local state
        setTransactionOverrides(prev => prev.map(override => 
          override.id === overrideId 
            ? { ...override, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
            : override
        ));
      } else {
        response = await apiService.processTransactionOverride(overrideId, action, reason);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setTransactionDialog({ open: false, transaction: null, type: '' });
        setOverrideReason('');
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} override`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} override`);
    } finally {
      setLoading(false);
    }
  };

  const handleChargebackDecision = async (chargebackId, action, reason = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = { 
          success: true, 
          message: `Chargeback ${action.toLowerCase()} processed successfully`
        };
        
        // Update local state
        setChargebackRequests(prev => prev.map(chargeback => 
          chargeback.id === chargebackId 
            ? { ...chargeback, status: action === 'APPROVE' ? 'CHARGEBACK_INITIATED' : 'DENIED' }
            : chargeback
        ));
      } else {
        response = await apiService.processChargeback(chargebackId, action, reason);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setTransactionDialog({ open: false, transaction: null, type: '' });
      } else {
        setError(response.message || `Failed to process chargeback`);
      }
    } catch (error) {
      setError(error.message || `Failed to process chargeback`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_AUTHORIZATION': case 'PENDING_OVERRIDE': case 'PENDING_INVESTIGATION': return 'warning';
      case 'APPROVED': case 'CHARGEBACK_INITIATED': return 'success';
      case 'REJECTED': case 'DENIED': return 'error';
      case 'REQUIRES_SENIOR_APPROVAL': case 'READY_FOR_DECISION': return 'error';
      case 'EVIDENCE_REVIEW': case 'OPEN': return 'info';
      default: return 'default';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 8) return 'error';
    if (score >= 6) return 'warning';
    if (score >= 4) return 'info';
    return 'success';
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Transaction Authorization & Control
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="High-Value Transactions" />
        <Tab label="Transaction Overrides" />
        <Tab label="Chargebacks & Reversals" />
      </Tabs>

      {/* High-Value Transactions Tab */}
      {activeTab === 0 && (
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
                    <TableCell>Threshold</TableCell>
                    <TableCell>Risk Score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {highValueTransactions.map((transaction) => (
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
                      <TableCell>
                        <Chip 
                          label={transaction.transactionType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="primary">
                          ${transaction.amount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Threshold: ${transaction.currentThreshold.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.thresholdType.replace('_', ' ')} 
                          size="small" 
                          color="warning"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{transaction.riskScore}/10</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={transaction.riskScore * 10} 
                            color={getRiskScoreColor(transaction.riskScore)}
                            sx={{ width: 50, height: 6 }}
                          />
                        </Box>
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
                              transaction, 
                              type: 'highValue' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {transaction.status === 'PENDING_AUTHORIZATION' && (
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

      {/* Transaction Overrides Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction Override Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Decline Reason</TableCell>
                    <TableCell>Override Requested</TableCell>
                    <TableCell>Risk</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionOverrides.map((override) => (
                    <TableRow key={override.id}>
                      <TableCell>{override.transactionId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {override.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {override.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ${override.originalAmount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="error">
                          {override.declineReason}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {override.overrideRequested}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={override.riskAssessment} 
                          size="small" 
                          color={getRiskColor(override.riskAssessment)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={override.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(override.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setTransactionDialog({ 
                              open: true, 
                              transaction: override, 
                              type: 'override' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {(override.status === 'PENDING_OVERRIDE' || override.status === 'REQUIRES_SENIOR_APPROVAL') && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleOverrideDecision(override.id, 'APPROVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleOverrideDecision(override.id, 'REJECT')}
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

      {/* Chargebacks Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Chargeback & Reversal Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Merchant</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Dispute Reason</TableCell>
                    <TableCell>Investigation</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chargebackRequests.map((chargeback) => (
                    <TableRow key={chargeback.id}>
                      <TableCell>{chargeback.requestId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {chargeback.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {chargeback.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {chargeback.merchantName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ${chargeback.transactionAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(chargeback.transactionDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {chargeback.disputeReason}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={chargeback.investigationStatus.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(chargeback.investigationStatus)}
                        />
                        <Typography variant="caption" display="block" color="textSecondary">
                          Est: {new Date(chargeback.estimatedResolution).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={chargeback.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(chargeback.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setTransactionDialog({ 
                              open: true, 
                              transaction: chargeback, 
                              type: 'chargeback' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {chargeback.status === 'READY_FOR_DECISION' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleChargebackDecision(chargeback.id, 'APPROVE')}
                                title="Initiate Chargeback"
                              >
                                <Undo />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleChargebackDecision(chargeback.id, 'DENY')}
                                title="Deny Chargeback"
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

      {/* Transaction Details Dialog */}
      <Dialog 
        open={transactionDialog.open} 
        onClose={() => setTransactionDialog({ open: false, transaction: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {transactionDialog.type === 'highValue' && 'High-Value Transaction Authorization'}
          {transactionDialog.type === 'override' && 'Transaction Override Request'}
          {transactionDialog.type === 'chargeback' && 'Chargeback Investigation'}
        </DialogTitle>
        <DialogContent>
          {transactionDialog.transaction && transactionDialog.type === 'highValue' && (
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
                <Typography variant="subtitle2">Purpose</Typography>
                <Typography>{transactionDialog.transaction.purpose}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Initiated By</Typography>
                <Typography>{transactionDialog.transaction.initiatedBy}</Typography>
              </Grid>
              {transactionDialog.transaction.complianceFlags.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Compliance Flags</Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {transactionDialog.transaction.complianceFlags.map((flag, index) => (
                      <Chip key={index} label={flag} size="small" color="warning" />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
          
          {transactionDialog.transaction && transactionDialog.type === 'override' && (
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
                <Typography variant="subtitle2">Amount</Typography>
                <Typography>${transactionDialog.transaction.originalAmount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Assessment</Typography>
                <Chip 
                  label={transactionDialog.transaction.riskAssessment} 
                  color={getRiskColor(transactionDialog.transaction.riskAssessment)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Decline Reason</Typography>
                <Alert severity="error">{transactionDialog.transaction.declineReason}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Override Requested</Typography>
                <Typography>{transactionDialog.transaction.overrideRequested}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Justification</Typography>
                <Typography>{transactionDialog.transaction.justification}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Requested By</Typography>
                <Typography>{transactionDialog.transaction.requestedBy}</Typography>
              </Grid>
            </Grid>
          )}

          {transactionDialog.transaction && transactionDialog.type === 'chargeback' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Request ID</Typography>
                <Typography>{transactionDialog.transaction.requestId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Original Transaction</Typography>
                <Typography>{transactionDialog.transaction.originalTransactionId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{transactionDialog.transaction.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount</Typography>
                <Typography>${transactionDialog.transaction.transactionAmount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Merchant</Typography>
                <Typography>{transactionDialog.transaction.merchantName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Dispute Reason</Typography>
                <Alert severity="warning">{transactionDialog.transaction.disputeReason}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Evidence Provided</Typography>
                <List dense>
                  {transactionDialog.transaction.evidenceProvided.map((evidence, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><Receipt /></ListItemIcon>
                      <ListItemText primary={evidence} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Investigation Status</Typography>
                <Chip 
                  label={transactionDialog.transaction.investigationStatus.replace('_', ' ')} 
                  color={getStatusColor(transactionDialog.transaction.investigationStatus)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Estimated Resolution</Typography>
                <Typography>{new Date(transactionDialog.transaction.estimatedResolution).toLocaleDateString()}</Typography>
              </Grid>
            </Grid>
          )}

          {transactionDialog.type === 'override' && (
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Authorization Reason"
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransactionDialog({ open: false, transaction: null, type: '' })}>
            Close
          </Button>
          {transactionDialog.transaction && (
            <>
              {transactionDialog.type === 'highValue' && transactionDialog.transaction.status === 'PENDING_AUTHORIZATION' && (
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
              
              {transactionDialog.type === 'override' && 
               (transactionDialog.transaction.status === 'PENDING_OVERRIDE' || 
                transactionDialog.transaction.status === 'REQUIRES_SENIOR_APPROVAL') && (
                <>
                  <Button 
                    color="success" 
                    variant="contained"
                    onClick={() => handleOverrideDecision(transactionDialog.transaction.id, 'APPROVE', overrideReason)}
                  >
                    Approve Override
                  </Button>
                  <Button 
                    color="error" 
                    variant="outlined"
                    onClick={() => handleOverrideDecision(transactionDialog.transaction.id, 'REJECT', overrideReason)}
                  >
                    Reject Override
                  </Button>
                </>
              )}

              {transactionDialog.type === 'chargeback' && transactionDialog.transaction.status === 'READY_FOR_DECISION' && (
                <>
                  <Button 
                    color="success" 
                    variant="contained"
                    onClick={() => handleChargebackDecision(transactionDialog.transaction.id, 'APPROVE')}
                  >
                    Initiate Chargeback
                  </Button>
                  <Button 
                    color="error" 
                    variant="outlined"
                    onClick={() => handleChargebackDecision(transactionDialog.transaction.id, 'DENY')}
                  >
                    Deny Chargeback
                  </Button>
                </>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionAuthorization;
