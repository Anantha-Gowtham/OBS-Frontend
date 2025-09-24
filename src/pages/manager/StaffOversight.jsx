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
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Divider
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  Person,
  AccountBalance,
  Lock,
  VpnKey,
  Warning,
  Timeline,
  Security,
  ExpandMore,
  Approval,
  Block,
  Edit
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const StaffOversight = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Staff Account Requests
  const [accountRequests, setAccountRequests] = useState([
    {
      id: 1,
      requestType: 'ACCOUNT_CREATION',
      customerName: 'John Smith',
      accountType: 'Savings',
      requestedBy: 'jane.doe@obs.com',
      requestDate: '2024-08-29 14:30:00',
      status: 'PENDING',
      priority: 'MEDIUM',
      details: 'New customer account opening request with initial deposit of $5,000'
    },
    {
      id: 2,
      requestType: 'ACCOUNT_MODIFICATION',
      customerName: 'Sarah Johnson',
      accountType: 'Business Checking',
      requestedBy: 'mike.wilson@obs.com',
      requestDate: '2024-08-29 13:45:00',
      status: 'PENDING',
      priority: 'HIGH',
      details: 'Request to increase daily transaction limit from $10,000 to $25,000'
    },
    {
      id: 3,
      requestType: 'ACCOUNT_CLOSURE',
      customerName: 'Robert Brown',
      accountType: 'Checking',
      requestedBy: 'lisa.anderson@obs.com',
      requestDate: '2024-08-29 12:15:00',
      status: 'APPROVED',
      priority: 'LOW',
      details: 'Customer requested account closure due to relocation'
    }
  ]);

  // Staff Access Requests
  const [accessRequests, setAccessRequests] = useState([
    {
      id: 1,
      employeeName: 'David Miller',
      employeeId: 'EMP001',
      requestType: 'SYSTEM_ACCESS',
      currentRole: 'Teller',
      requestedAccess: 'Loan Processing Module',
      requestDate: '2024-08-29 11:30:00',
      status: 'PENDING',
      justification: 'Temporary access needed to assist with loan application backlog'
    },
    {
      id: 2,
      employeeName: 'Jennifer Davis',
      employeeId: 'EMP002',
      requestType: 'PASSWORD_RESET',
      currentRole: 'Customer Service',
      requestedAccess: 'Account Reset',
      requestDate: '2024-08-29 10:45:00',
      status: 'PENDING',
      justification: 'Locked out after multiple failed login attempts'
    },
    {
      id: 3,
      employeeName: 'Mark Thompson',
      employeeId: 'EMP003',
      requestType: 'PERMISSION_ESCALATION',
      currentRole: 'Junior Associate',
      requestedAccess: 'Transaction Override',
      requestDate: '2024-08-29 09:20:00',
      status: 'APPROVED',
      justification: 'Promoted to Senior Associate, requires elevated permissions'
    }
  ]);

  // Staff Performance
  const [staffActivities, setStaffActivities] = useState([
    {
      id: 1,
      employeeName: 'Jane Doe',
      employeeId: 'EMP004',
      todayTransactions: 45,
      todayCustomers: 28,
      errorRate: 0.02,
      avgProcessingTime: '3.2 minutes',
      status: 'ACTIVE',
      lastActivity: '2024-08-29 14:45:00'
    },
    {
      id: 2,
      employeeName: 'Mike Wilson',
      employeeId: 'EMP005',
      todayTransactions: 52,
      todayCustomers: 31,
      errorRate: 0.01,
      avgProcessingTime: '2.8 minutes',
      status: 'ACTIVE',
      lastActivity: '2024-08-29 14:40:00'
    },
    {
      id: 3,
      employeeName: 'Lisa Anderson',
      employeeId: 'EMP006',
      todayTransactions: 38,
      todayCustomers: 25,
      errorRate: 0.03,
      avgProcessingTime: '4.1 minutes',
      status: 'BREAK',
      lastActivity: '2024-08-29 14:15:00'
    }
  ]);

  const [requestDialog, setRequestDialog] = useState({ open: false, request: null, type: '' });

  const handleAccountRequest = async (requestId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Account request ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setAccountRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: action.toUpperCase() }
            : req
        ));
      } else {
        response = await apiService.handleAccountRequest(requestId, action);
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

  const handleAccessRequest = async (requestId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Access request ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setAccessRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: action.toUpperCase() }
            : req
        ));
      } else {
        response = await apiService.handleAccessRequest(requestId, action);
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

  const resetEmployeePassword = async (employeeId) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: 'Password reset email sent to employee'
        };
      } else {
        response = await apiService.resetEmployeePassword(employeeId);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (error) {
      setError(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const unlockEmployeeAccount = async (employeeId) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: 'Employee account unlocked successfully'
        };
      } else {
        response = await apiService.unlockEmployeeAccount(employeeId);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to unlock account');
      }
    } catch (error) {
      setError(error.message || 'Failed to unlock account');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'error';
      case 'ACTIVE': return 'success';
      case 'BREAK': return 'info';
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

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Staff Oversight & Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Account Requests" />
        <Tab label="Access Requests" />
        <Tab label="Staff Monitoring" />
      </Tabs>

      {/* Account Requests Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Account Requests Requiring Approval
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Request Type</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Requested By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.requestType.replace('_', ' ')}</TableCell>
                      <TableCell>{request.customerName}</TableCell>
                      <TableCell>{request.accountType}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{new Date(request.requestDate).toLocaleString()}</TableCell>
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

      {/* Access Requests Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Staff Access & Permission Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Request Type</TableCell>
                    <TableCell>Current Role</TableCell>
                    <TableCell>Requested Access</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accessRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {request.employeeName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {request.employeeId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{request.requestType.replace('_', ' ')}</TableCell>
                      <TableCell>{request.currentRole}</TableCell>
                      <TableCell>{request.requestedAccess}</TableCell>
                      <TableCell>{new Date(request.requestDate).toLocaleString()}</TableCell>
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
                              type: 'access' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {request.status === 'PENDING' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleAccessRequest(request.id, 'APPROVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleAccessRequest(request.id, 'REJECT')}
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

      {/* Staff Monitoring Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {staffActivities.map((staff) => (
            <Grid item xs={12} md={6} lg={4} key={staff.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                    <Box>
                      <Typography variant="h6">{staff.employeeName}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {staff.employeeId}
                      </Typography>
                    </Box>
                    <Chip 
                      label={staff.status} 
                      size="small" 
                      color={getStatusColor(staff.status)}
                    />
                  </Box>
                  
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Today's Transactions" 
                        secondary={staff.todayTransactions}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Customers Served" 
                        secondary={staff.todayCustomers}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Error Rate" 
                        secondary={`${(staff.errorRate * 100).toFixed(1)}%`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Avg Processing Time" 
                        secondary={staff.avgProcessingTime}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Last Activity" 
                        secondary={new Date(staff.lastActivity).toLocaleString()}
                      />
                    </ListItem>
                  </List>

                  <Box mt={2} display="flex" gap={1}>
                    <Button 
                      size="small" 
                      startIcon={<VpnKey />}
                      onClick={() => resetEmployeePassword(staff.employeeId)}
                    >
                      Reset Password
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<Lock />}
                      onClick={() => unlockEmployeeAccount(staff.employeeId)}
                    >
                      Unlock Account
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Request Details Dialog */}
      <Dialog 
        open={requestDialog.open} 
        onClose={() => setRequestDialog({ open: false, request: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {requestDialog.type === 'account' ? 'Account Request Details' : 'Access Request Details'}
        </DialogTitle>
        <DialogContent>
          {requestDialog.request && (
            <Box>
              {requestDialog.type === 'account' ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Request Type</Typography>
                    <Typography>{requestDialog.request.requestType.replace('_', ' ')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Customer Name</Typography>
                    <Typography>{requestDialog.request.customerName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Account Type</Typography>
                    <Typography>{requestDialog.request.accountType}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Requested By</Typography>
                    <Typography>{requestDialog.request.requestedBy}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Priority</Typography>
                    <Chip 
                      label={requestDialog.request.priority} 
                      size="small" 
                      color={getPriorityColor(requestDialog.request.priority)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Status</Typography>
                    <Chip 
                      label={requestDialog.request.status} 
                      size="small" 
                      color={getStatusColor(requestDialog.request.status)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Details</Typography>
                    <Typography>{requestDialog.request.details}</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Employee Name</Typography>
                    <Typography>{requestDialog.request.employeeName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Employee ID</Typography>
                    <Typography>{requestDialog.request.employeeId}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Request Type</Typography>
                    <Typography>{requestDialog.request.requestType.replace('_', ' ')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Current Role</Typography>
                    <Typography>{requestDialog.request.currentRole}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Requested Access</Typography>
                    <Typography>{requestDialog.request.requestedAccess}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Justification</Typography>
                    <Typography>{requestDialog.request.justification}</Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
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
                onClick={() => {
                  if (requestDialog.type === 'account') {
                    handleAccountRequest(requestDialog.request.id, 'APPROVE');
                  } else {
                    handleAccessRequest(requestDialog.request.id, 'APPROVE');
                  }
                }}
              >
                Approve
              </Button>
              <Button 
                color="error" 
                variant="outlined"
                onClick={() => {
                  if (requestDialog.type === 'account') {
                    handleAccountRequest(requestDialog.request.id, 'REJECT');
                  } else {
                    handleAccessRequest(requestDialog.request.id, 'REJECT');
                  }
                }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffOversight;
