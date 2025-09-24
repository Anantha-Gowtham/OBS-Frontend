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
  LinearProgress,
  CircularProgress,
  Switch,
  FormControlLabel,
  Checkbox,
  Avatar,
  Rating,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/material';
import {
  Support,
  ContactSupport,
  Report,
  Assignment,
  Phone,
  Email,
  Chat,
  Schedule,
  Person,
  Business,
  MonetizationOn,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  ExpandMore,
  Visibility,
  Edit,
  Send,
  Escalate,
  Close,
  AccessTime,
  Star,
  ThumbUp,
  ThumbDown,
  AttachFile,
  CommentBank,
  Resolution
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const CustomerIssueResolution = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Customer Complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complaintId: 'CMP2024-001',
      customerName: 'Rajesh Kumar',
      customerId: 'CUST001',
      accountNumber: '****5678',
      complaintType: 'TRANSACTION_DISPUTE',
      category: 'FINANCIAL',
      priority: 'HIGH',
      status: 'ESCALATED',
      description: 'Unauthorized transaction of ₹50,000 debited from account',
      submittedDate: '2024-08-28 14:30:00',
      assignedTo: 'manager.mumbai@obs.com',
      dueDate: '2024-08-30 17:00:00',
      channel: 'BRANCH',
      customerRating: null,
      resolution: null,
      attachments: ['transaction_receipt.pdf', 'bank_statement.pdf'],
      lastUpdated: '2024-08-29 10:30:00',
      resolutionTime: null,
      escalationLevel: 'MANAGER'
    },
    {
      id: 2,
      complaintId: 'CMP2024-002',
      customerName: 'Priya Sharma',
      customerId: 'CUST002',
      accountNumber: '****9012',
      complaintType: 'SERVICE_QUALITY',
      category: 'OPERATIONAL',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      description: 'Long waiting time at branch and unprofessional behavior from staff',
      submittedDate: '2024-08-27 16:45:00',
      assignedTo: 'support.team@obs.com',
      dueDate: '2024-08-31 17:00:00',
      channel: 'ONLINE',
      customerRating: null,
      resolution: null,
      attachments: [],
      lastUpdated: '2024-08-29 09:15:00',
      resolutionTime: null,
      escalationLevel: 'STAFF'
    },
    {
      id: 3,
      complaintId: 'CMP2024-003',
      customerName: 'Amit Singh',
      customerId: 'CUST003',
      accountNumber: '****3456',
      complaintType: 'CARD_ISSUE',
      category: 'TECHNICAL',
      priority: 'LOW',
      status: 'RESOLVED',
      description: 'Debit card not working at ATM, transaction failed multiple times',
      submittedDate: '2024-08-25 11:20:00',
      assignedTo: 'card.support@obs.com',
      dueDate: '2024-08-28 17:00:00',
      channel: 'PHONE',
      customerRating: 4,
      resolution: 'Card was blocked due to suspicious activity. New card issued and activated.',
      attachments: ['card_replacement_form.pdf'],
      lastUpdated: '2024-08-26 14:30:00',
      resolutionTime: '1 day 3 hours',
      escalationLevel: 'STAFF'
    }
  ]);

  // Dispute Cases
  const [disputes, setDisputes] = useState([
    {
      id: 1,
      disputeId: 'DSP2024-001',
      customerName: 'Sunita Patel',
      customerId: 'CUST004',
      accountNumber: '****7890',
      disputeType: 'CHARGEBACK',
      amount: 15000,
      currency: 'INR',
      transactionDate: '2024-08-20 15:30:00',
      merchantName: 'Online Electronics Store',
      reason: 'Product not received as per order',
      status: 'INVESTIGATING',
      priority: 'HIGH',
      submittedDate: '2024-08-25 10:00:00',
      investigatorAssigned: 'dispute.team@obs.com',
      dueDate: '2024-09-10 17:00:00',
      evidence: ['order_confirmation.pdf', 'delivery_receipt.jpg', 'email_correspondence.pdf'],
      merchantResponse: null,
      resolution: null,
      refundAmount: null,
      lastUpdated: '2024-08-29 11:00:00'
    },
    {
      id: 2,
      disputeId: 'DSP2024-002',
      customerName: 'Vikash Reddy',
      customerId: 'CUST005',
      accountNumber: '****2345',
      disputeType: 'FRAUDULENT_TRANSACTION',
      amount: 25000,
      currency: 'INR',
      transactionDate: '2024-08-22 20:45:00',
      merchantName: 'International Payment Gateway',
      reason: 'Unauthorized international transaction',
      status: 'RESOLVED',
      priority: 'CRITICAL',
      submittedDate: '2024-08-23 09:30:00',
      investigatorAssigned: 'fraud.team@obs.com',
      dueDate: '2024-08-28 17:00:00',
      evidence: ['police_complaint.pdf', 'affidavit.pdf'],
      merchantResponse: 'Transaction confirmed fraudulent by merchant',
      resolution: 'Full refund processed. Card blocked and replaced.',
      refundAmount: 25000,
      lastUpdated: '2024-08-27 16:20:00'
    }
  ]);

  // Escalation Queue
  const [escalations, setEscalations] = useState([
    {
      id: 1,
      ticketId: 'ESC2024-001',
      originalComplaint: 'CMP2024-001',
      customerName: 'Rajesh Kumar',
      issueType: 'TRANSACTION_DISPUTE',
      escalatedFrom: 'STAFF',
      escalatedTo: 'MANAGER',
      escalationReason: 'Amount exceeds staff authorization limit',
      escalatedDate: '2024-08-29 08:00:00',
      urgency: 'HIGH',
      businessImpact: 'HIGH',
      customerTier: 'PREMIUM',
      managerNotes: null,
      actionRequired: 'INVESTIGATION_AND_APPROVAL',
      timeToResolve: '4 hours',
      statusUpdates: [
        { time: '2024-08-29 08:00:00', status: 'ESCALATED', note: 'Escalated to manager for review' },
        { time: '2024-08-29 10:30:00', status: 'ASSIGNED', note: 'Assigned to senior manager for investigation' }
      ]
    },
    {
      id: 2,
      ticketId: 'ESC2024-002',
      originalComplaint: 'CMP2024-004',
      customerName: 'Corporate Client Ltd',
      issueType: 'BULK_PAYMENT_FAILURE',
      escalatedFrom: 'OPERATIONS',
      escalatedTo: 'MANAGER',
      escalationReason: 'Critical business impact, multiple payment failures',
      escalatedDate: '2024-08-29 12:15:00',
      urgency: 'CRITICAL',
      businessImpact: 'CRITICAL',
      customerTier: 'CORPORATE',
      managerNotes: 'Investigating with technical team',
      actionRequired: 'IMMEDIATE_RESOLUTION',
      timeToResolve: '2 hours',
      statusUpdates: [
        { time: '2024-08-29 12:15:00', status: 'ESCALATED', note: 'Critical escalation - business impact' },
        { time: '2024-08-29 13:00:00', status: 'IN_PROGRESS', note: 'Technical team engaged' }
      ]
    }
  ]);

  const [detailsDialog, setDetailsDialog] = useState({ open: false, item: null, type: '' });
  const [actionDialog, setActionDialog] = useState({ open: false, type: '', item: null });
  const [resolution, setResolution] = useState('');
  const [notes, setNotes] = useState('');

  const handleComplaintAction = async (complaintId, action, data = {}) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = { 
          success: true, 
          message: `Complaint ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setComplaints(prev => prev.map(complaint => 
          complaint.id === complaintId 
            ? { 
                ...complaint, 
                status: action === 'RESOLVE' ? 'RESOLVED' : action === 'ESCALATE' ? 'ESCALATED' : 'IN_PROGRESS',
                resolution: action === 'RESOLVE' ? data.resolution : complaint.resolution,
                lastUpdated: new Date().toISOString()
              }
            : complaint
        ));
      } else {
        response = await apiService.processComplaint(complaintId, action, data);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setActionDialog({ open: false, type: '', item: null });
        setResolution('');
        setNotes('');
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} complaint`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} complaint`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisputeAction = async (disputeId, action, data = {}) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = { 
          success: true, 
          message: `Dispute ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setDisputes(prev => prev.map(dispute => 
          dispute.id === disputeId 
            ? { 
                ...dispute, 
                status: action === 'RESOLVE' ? 'RESOLVED' : action === 'REJECT' ? 'REJECTED' : 'IN_PROGRESS',
                resolution: action === 'RESOLVE' ? data.resolution : dispute.resolution,
                refundAmount: action === 'RESOLVE' ? data.refundAmount : dispute.refundAmount,
                lastUpdated: new Date().toISOString()
              }
            : dispute
        ));
      } else {
        response = await apiService.processDispute(disputeId, action, data);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setActionDialog({ open: false, type: '', item: null });
        setResolution('');
        setNotes('');
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} dispute`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} dispute`);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalationAction = async (escalationId, action, data = {}) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Escalation ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setEscalations(prev => prev.map(escalation => 
          escalation.id === escalationId 
            ? { 
                ...escalation, 
                managerNotes: data.notes || escalation.managerNotes,
                statusUpdates: [...escalation.statusUpdates, {
                  time: new Date().toISOString(),
                  status: action.toUpperCase(),
                  note: data.notes || `${action} by manager`
                }]
              }
            : escalation
        ));
      } else {
        response = await apiService.processEscalation(escalationId, action, data);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setActionDialog({ open: false, type: '', item: null });
        setNotes('');
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} escalation`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} escalation`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RESOLVED': return 'success';
      case 'IN_PROGRESS': case 'INVESTIGATING': case 'ASSIGNED': return 'info';
      case 'ESCALATED': case 'PENDING': return 'warning';
      case 'REJECTED': case 'CLOSED': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'PHONE': return <Phone />;
      case 'EMAIL': return <Email />;
      case 'ONLINE': case 'BRANCH': return <Business />;
      case 'CHAT': return <Chat />;
      default: return <ContactSupport />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Customer Issue Resolution
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Customer Complaints" />
        <Tab label="Dispute Resolution" />
        <Tab label="Escalation Queue" />
      </Tabs>

      {/* Customer Complaints Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Complaints Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Complaint ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>{complaint.complaintId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {complaint.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {complaint.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={complaint.complaintType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={complaint.priority} 
                          size="small" 
                          color={getPriorityColor(complaint.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={complaint.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(complaint.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getChannelIcon(complaint.channel)}
                          <Typography variant="body2">{complaint.channel}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={new Date(complaint.dueDate) < new Date() ? 'error' : 'textPrimary'}
                        >
                          {new Date(complaint.dueDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {complaint.customerRating ? (
                          <Rating value={complaint.customerRating} readOnly size="small" />
                        ) : (
                          <Typography variant="caption">Pending</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: complaint, 
                              type: 'complaint' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {complaint.status !== 'RESOLVED' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => setActionDialog({ 
                                  open: true, 
                                  type: 'resolve', 
                                  item: complaint 
                                })}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="warning"
                                onClick={() => setActionDialog({ 
                                  open: true, 
                                  type: 'escalate', 
                                  item: complaint 
                                })}
                              >
                                <Escalate />
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

      {/* Dispute Resolution Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dispute Resolution Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dispute ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Merchant</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell>{dispute.disputeId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {dispute.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {dispute.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={dispute.disputeType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          ₹{dispute.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dispute.merchantName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={dispute.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(dispute.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={dispute.priority} 
                          size="small" 
                          color={getPriorityColor(dispute.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={new Date(dispute.dueDate) < new Date() ? 'error' : 'textPrimary'}
                        >
                          {new Date(dispute.dueDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: dispute, 
                              type: 'dispute' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {dispute.status === 'INVESTIGATING' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => setActionDialog({ 
                                  open: true, 
                                  type: 'resolve_dispute', 
                                  item: dispute 
                                })}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => setActionDialog({ 
                                  open: true, 
                                  type: 'reject_dispute', 
                                  item: dispute 
                                })}
                              >
                                <Close />
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

      {/* Escalation Queue Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Manager Escalation Queue
            </Typography>
            <Grid container spacing={3}>
              {escalations.map((escalation) => (
                <Grid item xs={12} key={escalation.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Typography variant="h6">{escalation.ticketId}</Typography>
                            <Chip 
                              label={escalation.urgency} 
                              color={getUrgencyColor(escalation.urgency)} 
                            />
                            <Chip 
                              label={escalation.customerTier} 
                              variant="outlined" 
                            />
                          </Box>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Customer: {escalation.customerName}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Issue: {escalation.issueType.replace('_', ' ')}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Escalation Reason: {escalation.escalationReason}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Action Required: {escalation.actionRequired.replace('_', ' ')}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Box textAlign="right">
                            <Typography variant="body2" color="error" gutterBottom>
                              Time to Resolve: {escalation.timeToResolve}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                              Escalated: {new Date(escalation.escalatedDate).toLocaleString()}
                            </Typography>
                            <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
                              <IconButton 
                                size="small"
                                onClick={() => setDetailsDialog({ 
                                  open: true, 
                                  item: escalation, 
                                  type: 'escalation' 
                                })}
                              >
                                <Visibility />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="primary"
                                onClick={() => setActionDialog({ 
                                  open: true, 
                                  type: 'update_escalation', 
                                  item: escalation 
                                })}
                              >
                                <Edit />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      
                      {escalation.statusUpdates.length > 0 && (
                        <Box mt={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Status Timeline
                          </Typography>
                          <Timeline>
                            {escalation.statusUpdates.map((update, index) => (
                              <TimelineItem key={index}>
                                <TimelineOppositeContent color="textSecondary" variant="caption">
                                  {new Date(update.time).toLocaleString()}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineDot color="primary" />
                                  {index < escalation.statusUpdates.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent>
                                  <Typography variant="body2" fontWeight={500}>
                                    {update.status}
                                  </Typography>
                                  <Typography variant="caption">
                                    {update.note}
                                  </Typography>
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                          </Timeline>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, item: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detailsDialog.type === 'complaint' && 'Complaint Details'}
          {detailsDialog.type === 'dispute' && 'Dispute Details'}
          {detailsDialog.type === 'escalation' && 'Escalation Details'}
        </DialogTitle>
        <DialogContent>
          {detailsDialog.item && detailsDialog.type === 'complaint' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Complaint ID</Typography>
                <Typography>{detailsDialog.item.complaintId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{detailsDialog.item.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{detailsDialog.item.complaintType.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Priority</Typography>
                <Typography>{detailsDialog.item.priority}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{detailsDialog.item.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Submitted Date</Typography>
                <Typography>{new Date(detailsDialog.item.submittedDate).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Due Date</Typography>
                <Typography>{new Date(detailsDialog.item.dueDate).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Channel</Typography>
                <Typography>{detailsDialog.item.channel}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Assigned To</Typography>
                <Typography>{detailsDialog.item.assignedTo}</Typography>
              </Grid>
              {detailsDialog.item.attachments.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Attachments</Typography>
                  <List dense>
                    {detailsDialog.item.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><AttachFile /></ListItemIcon>
                        <ListItemText primary={attachment} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
              {detailsDialog.item.resolution && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Resolution</Typography>
                  <Typography>{detailsDialog.item.resolution}</Typography>
                </Grid>
              )}
              {detailsDialog.item.customerRating && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Customer Rating</Typography>
                  <Rating value={detailsDialog.item.customerRating} readOnly />
                </Grid>
              )}
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'dispute' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Dispute ID</Typography>
                <Typography>{detailsDialog.item.disputeId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{detailsDialog.item.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{detailsDialog.item.disputeType.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount</Typography>
                <Typography>₹{detailsDialog.item.amount.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Merchant</Typography>
                <Typography>{detailsDialog.item.merchantName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Transaction Date</Typography>
                <Typography>{new Date(detailsDialog.item.transactionDate).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Reason</Typography>
                <Typography>{detailsDialog.item.reason}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Evidence</Typography>
                <List dense>
                  {detailsDialog.item.evidence.map((evidence, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><AttachFile /></ListItemIcon>
                      <ListItemText primary={evidence} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              {detailsDialog.item.merchantResponse && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Merchant Response</Typography>
                  <Typography>{detailsDialog.item.merchantResponse}</Typography>
                </Grid>
              )}
              {detailsDialog.item.resolution && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Resolution</Typography>
                  <Typography>{detailsDialog.item.resolution}</Typography>
                </Grid>
              )}
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'escalation' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Ticket ID</Typography>
                <Typography>{detailsDialog.item.ticketId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Original Complaint</Typography>
                <Typography>{detailsDialog.item.originalComplaint}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{detailsDialog.item.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer Tier</Typography>
                <Typography>{detailsDialog.item.customerTier}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Escalation Reason</Typography>
                <Typography>{detailsDialog.item.escalationReason}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Urgency</Typography>
                <Typography>{detailsDialog.item.urgency}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Business Impact</Typography>
                <Typography>{detailsDialog.item.businessImpact}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Action Required</Typography>
                <Typography>{detailsDialog.item.actionRequired.replace('_', ' ')}</Typography>
              </Grid>
              {detailsDialog.item.managerNotes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Manager Notes</Typography>
                  <Typography>{detailsDialog.item.managerNotes}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, item: null, type: '' })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Dialog */}
      <Dialog 
        open={actionDialog.open} 
        onClose={() => setActionDialog({ open: false, type: '', item: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {actionDialog.type === 'resolve' && 'Resolve Complaint'}
          {actionDialog.type === 'escalate' && 'Escalate Complaint'}
          {actionDialog.type === 'resolve_dispute' && 'Resolve Dispute'}
          {actionDialog.type === 'reject_dispute' && 'Reject Dispute'}
          {actionDialog.type === 'update_escalation' && 'Update Escalation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {(actionDialog.type === 'resolve' || actionDialog.type === 'resolve_dispute') && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Resolution Details"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes/Comments"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {actionDialog.type === 'resolve_dispute' && (
              <TextField
                fullWidth
                type="number"
                label="Refund Amount (₹)"
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ open: false, type: '', item: null })}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            color={actionDialog.type.includes('reject') ? 'error' : 'primary'}
            onClick={() => {
              if (actionDialog.type === 'resolve' && actionDialog.item) {
                handleComplaintAction(actionDialog.item.id, 'RESOLVE', { resolution, notes });
              } else if (actionDialog.type === 'escalate' && actionDialog.item) {
                handleComplaintAction(actionDialog.item.id, 'ESCALATE', { notes });
              } else if (actionDialog.type === 'resolve_dispute' && actionDialog.item) {
                handleDisputeAction(actionDialog.item.id, 'RESOLVE', { resolution, notes, refundAmount: 25000 });
              } else if (actionDialog.type === 'reject_dispute' && actionDialog.item) {
                handleDisputeAction(actionDialog.item.id, 'REJECT', { notes });
              } else if (actionDialog.type === 'update_escalation' && actionDialog.item) {
                handleEscalationAction(actionDialog.item.id, 'UPDATE', { notes });
              }
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerIssueResolution;
