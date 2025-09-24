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
  Avatar
} from '@mui/material';
import {
  Security,
  VpnKey,
  Shield,
  Lock,
  LockOpen,
  Person,
  Group,
  Settings,
  Visibility,
  VisibilityOff,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  ExpandMore,
  AdminPanelSettings,
  ManageAccounts,
  SupervisorAccount,
  Business,
  Computer,
  Smartphone,
  AccessTime,
  LocationOn,
  Block,
  Refresh
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const ManagerSystemAccess = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // System Access Control
  const [systemAccess, setSystemAccess] = useState([
    {
      id: 1,
      systemName: 'Core Banking System',
      systemCode: 'CBS-01',
      accessLevel: 'MANAGER',
      status: 'ACTIVE',
      lastAccess: '2024-08-29 14:30:00',
      permissions: ['VIEW_ACCOUNTS', 'APPROVE_TRANSACTIONS', 'MANAGE_STAFF', 'GENERATE_REPORTS'],
      riskLevel: 'HIGH',
      description: 'Primary banking operations system',
      maintenanceWindow: '02:00-04:00 IST',
      complianceRequired: true
    },
    {
      id: 2,
      systemName: 'Customer Relationship Management',
      systemCode: 'CRM-02',
      accessLevel: 'MANAGER',
      status: 'ACTIVE',
      lastAccess: '2024-08-29 13:45:00',
      permissions: ['VIEW_CUSTOMERS', 'UPDATE_PROFILES', 'MANAGE_RELATIONSHIPS', 'VIEW_ANALYTICS'],
      riskLevel: 'MEDIUM',
      description: 'Customer data and relationship management',
      maintenanceWindow: '01:00-02:00 IST',
      complianceRequired: true
    },
    {
      id: 3,
      systemName: 'Loan Management System',
      systemCode: 'LMS-03',
      accessLevel: 'MANAGER',
      status: 'RESTRICTED',
      lastAccess: '2024-08-28 16:20:00',
      permissions: ['VIEW_LOANS', 'APPROVE_APPLICATIONS', 'MANAGE_DISBURSEMENTS'],
      riskLevel: 'HIGH',
      description: 'Loan processing and management system',
      maintenanceWindow: '03:00-05:00 IST',
      complianceRequired: true
    },
    {
      id: 4,
      systemName: 'Risk Assessment Platform',
      systemCode: 'RAP-04',
      accessLevel: 'MANAGER',
      status: 'ACTIVE',
      lastAccess: '2024-08-29 12:15:00',
      permissions: ['VIEW_RISK_REPORTS', 'CONFIGURE_PARAMETERS', 'APPROVE_EXCEPTIONS'],
      riskLevel: 'CRITICAL',
      description: 'Risk analysis and assessment tools',
      maintenanceWindow: '00:30-01:30 IST',
      complianceRequired: true
    }
  ]);

  // Team Access Management
  const [teamAccess, setTeamAccess] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Suresh Patel',
      designation: 'Senior Teller',
      department: 'Operations',
      accessLevel: 'STAFF',
      systems: ['CBS-01', 'CRM-02'],
      permissions: ['PROCESS_TRANSACTIONS', 'VIEW_ACCOUNTS', 'UPDATE_CUSTOMER_INFO'],
      status: 'ACTIVE',
      lastLogin: '2024-08-29 14:00:00',
      sessionDuration: '6h 30m',
      failedAttempts: 0,
      accountLocked: false,
      passwordExpiry: '2024-09-15',
      mfaEnabled: true,
      deviceRegistered: 'WORKSTATION-001'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Kavita Reddy',
      designation: 'Relationship Manager',
      department: 'Sales',
      accessLevel: 'SENIOR_STAFF',
      systems: ['CRM-02', 'LMS-03'],
      permissions: ['MANAGE_CUSTOMERS', 'PROCESS_LOANS', 'VIEW_ANALYTICS', 'GENERATE_LEADS'],
      status: 'ACTIVE',
      lastLogin: '2024-08-29 13:30:00',
      sessionDuration: '7h 15m',
      failedAttempts: 0,
      accountLocked: false,
      passwordExpiry: '2024-09-20',
      mfaEnabled: true,
      deviceRegistered: 'LAPTOP-002'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Rahul Joshi',
      designation: 'Customer Service Representative',
      department: 'Support',
      accessLevel: 'STAFF',
      systems: ['CRM-02'],
      permissions: ['VIEW_CUSTOMER_INFO', 'UPDATE_CONTACT_DETAILS', 'HANDLE_COMPLAINTS'],
      status: 'LOCKED',
      lastLogin: '2024-08-29 11:45:00',
      sessionDuration: '0m',
      failedAttempts: 3,
      accountLocked: true,
      passwordExpiry: '2024-08-30',
      mfaEnabled: false,
      deviceRegistered: 'WORKSTATION-003'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Priya Sharma',
      designation: 'Junior Analyst',
      department: 'Risk',
      accessLevel: 'ANALYST',
      systems: ['RAP-04', 'CBS-01'],
      permissions: ['VIEW_RISK_REPORTS', 'ANALYZE_TRANSACTIONS', 'CREATE_ASSESSMENTS'],
      status: 'SUSPENDED',
      lastLogin: '2024-08-27 15:20:00',
      sessionDuration: '0m',
      failedAttempts: 0,
      accountLocked: false,
      passwordExpiry: '2024-09-10',
      mfaEnabled: true,
      deviceRegistered: 'LAPTOP-004'
    }
  ]);

  // Security Logs
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 14:35:00',
      eventType: 'LOGIN_SUCCESS',
      severity: 'INFO',
      userId: 'EMP001',
      userName: 'Suresh Patel',
      systemAccessed: 'CBS-01',
      ipAddress: '192.168.1.45',
      location: 'Mumbai Branch',
      deviceInfo: 'WORKSTATION-001',
      sessionId: 'SES-20240829-001',
      description: 'Successful login to Core Banking System'
    },
    {
      id: 2,
      timestamp: '2024-08-29 14:20:00',
      eventType: 'PRIVILEGE_ESCALATION',
      severity: 'HIGH',
      userId: 'EMP002',
      userName: 'Kavita Reddy',
      systemAccessed: 'LMS-03',
      ipAddress: '192.168.1.52',
      location: 'Mumbai Branch',
      deviceInfo: 'LAPTOP-002',
      sessionId: 'SES-20240829-002',
      description: 'Temporary admin privileges granted for loan approval'
    },
    {
      id: 3,
      timestamp: '2024-08-29 14:10:00',
      eventType: 'FAILED_LOGIN',
      severity: 'WARNING',
      userId: 'EMP003',
      userName: 'Rahul Joshi',
      systemAccessed: 'CRM-02',
      ipAddress: '192.168.1.33',
      location: 'Mumbai Branch',
      deviceInfo: 'WORKSTATION-003',
      sessionId: null,
      description: 'Multiple failed login attempts - account locked'
    },
    {
      id: 4,
      timestamp: '2024-08-29 13:55:00',
      eventType: 'UNAUTHORIZED_ACCESS',
      severity: 'CRITICAL',
      userId: 'UNKNOWN',
      userName: 'Unknown User',
      systemAccessed: 'CBS-01',
      ipAddress: '203.142.56.78',
      location: 'External',
      deviceInfo: 'Unknown Device',
      sessionId: null,
      description: 'Unauthorized access attempt from external IP'
    },
    {
      id: 5,
      timestamp: '2024-08-29 13:30:00',
      eventType: 'PASSWORD_CHANGE',
      severity: 'INFO',
      userId: 'EMP002',
      userName: 'Kavita Reddy',
      systemAccessed: 'IDENTITY_MGMT',
      ipAddress: '192.168.1.52',
      location: 'Mumbai Branch',
      deviceInfo: 'LAPTOP-002',
      sessionId: 'SES-20240829-003',
      description: 'Password successfully changed'
    }
  ]);

  const [detailsDialog, setDetailsDialog] = useState({ open: false, item: null, type: '' });
  const [accessDialog, setAccessDialog] = useState({ open: false, type: '', employee: null });

  const handleSystemAccess = async (systemId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `System access ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setSystemAccess(prev => prev.map(system => 
          system.id === systemId 
            ? { ...system, status: action === 'ENABLE' ? 'ACTIVE' : action === 'RESTRICT' ? 'RESTRICTED' : 'INACTIVE' }
            : system
        ));
      } else {
        response = await apiService.manageSystemAccess(systemId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} system access`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} system access`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeAccess = async (employeeId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Employee access ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setTeamAccess(prev => prev.map(emp => 
          emp.id === employeeId 
            ? { 
                ...emp, 
                status: action === 'UNLOCK' ? 'ACTIVE' : action === 'SUSPEND' ? 'SUSPENDED' : action === 'ACTIVATE' ? 'ACTIVE' : 'LOCKED',
                accountLocked: action === 'UNLOCK' ? false : action === 'LOCK' ? true : emp.accountLocked,
                failedAttempts: action === 'UNLOCK' ? 0 : emp.failedAttempts
              }
            : emp
        ));
      } else {
        response = await apiService.manageEmployeeAccess(employeeId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setAccessDialog({ open: false, type: '', employee: null });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} employee access`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} employee access`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'RESTRICTED': case 'LOCKED': return 'warning';
      case 'INACTIVE': case 'SUSPENDED': return 'error';
      default: return 'default';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'WARNING': return 'warning';
      case 'INFO': return 'info';
      default: return 'default';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'MANAGER': return 'error';
      case 'SENIOR_STAFF': case 'ANALYST': return 'warning';
      case 'STAFF': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        System Access & Security
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="System Access" />
        <Tab label="Team Access Management" />
        <Tab label="Security Monitoring" />
      </Tabs>

      {/* System Access Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Restricted System Access Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>System</TableCell>
                    <TableCell>Access Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Last Access</TableCell>
                    <TableCell>Maintenance Window</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemAccess.map((system) => (
                    <TableRow key={system.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {system.systemName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {system.systemCode}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={system.accessLevel} 
                          size="small" 
                          color={getAccessLevelColor(system.accessLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={system.status} 
                          size="small" 
                          color={getStatusColor(system.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={system.riskLevel} 
                          size="small" 
                          color={getRiskColor(system.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(system.lastAccess).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {system.maintenanceWindow}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: system, 
                              type: 'system' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {system.status === 'ACTIVE' && (
                            <IconButton 
                              size="small" 
                              color="warning"
                              onClick={() => handleSystemAccess(system.id, 'RESTRICT')}
                            >
                              <Block />
                            </IconButton>
                          )}
                          {system.status === 'RESTRICTED' && (
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => handleSystemAccess(system.id, 'ENABLE')}
                            >
                              <LockOpen />
                            </IconButton>
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

      {/* Team Access Management Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Team Access Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Access Level</TableCell>
                    <TableCell>Systems</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>MFA Status</TableCell>
                    <TableCell>Password Expiry</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamAccess.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {employee.employeeName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {employee.employeeName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {employee.designation}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={employee.accessLevel} 
                          size="small" 
                          color={getAccessLevelColor(employee.accessLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={0.5} flexWrap="wrap">
                          {employee.systems.map((system, index) => (
                            <Chip key={index} label={system} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip 
                            label={employee.status} 
                            size="small" 
                            color={getStatusColor(employee.status)}
                          />
                          {employee.failedAttempts > 0 && (
                            <Chip 
                              label={`${employee.failedAttempts} failed`} 
                              size="small" 
                              color="warning"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(employee.lastLogin).toLocaleString()}
                        </Typography>
                        {employee.sessionDuration !== '0m' && (
                          <Typography variant="caption" color="textSecondary">
                            Session: {employee.sessionDuration}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {employee.mfaEnabled ? (
                            <Chip label="Enabled" size="small" color="success" />
                          ) : (
                            <Chip label="Disabled" size="small" color="error" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={new Date(employee.passwordExpiry) < new Date() ? 'error' : 'textPrimary'}
                        >
                          {new Date(employee.passwordExpiry).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: employee, 
                              type: 'employee' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {employee.status === 'LOCKED' && (
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => handleEmployeeAccess(employee.id, 'UNLOCK')}
                            >
                              <LockOpen />
                            </IconButton>
                          )}
                          {employee.status === 'ACTIVE' && (
                            <IconButton 
                              size="small" 
                              color="warning"
                              onClick={() => setAccessDialog({ 
                                open: true, 
                                type: 'suspend', 
                                employee: employee 
                              })}
                            >
                              <Block />
                            </IconButton>
                          )}
                          {employee.status === 'SUSPENDED' && (
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => handleEmployeeAccess(employee.id, 'ACTIVATE')}
                            >
                              <CheckCircle />
                            </IconButton>
                          )}
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => setAccessDialog({ 
                              open: true, 
                              type: 'reset', 
                              employee: employee 
                            })}
                          >
                            <Refresh />
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

      {/* Security Monitoring Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Security Event Monitoring
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Event Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>System</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(log.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={log.eventType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={log.severity} 
                          size="small" 
                          color={getSeverityColor(log.severity)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {log.userName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {log.userId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{log.systemAccessed}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationOn fontSize="small" />
                          <Typography variant="body2">{log.location}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={log.ipAddress.startsWith('192.168') ? 'textPrimary' : 'error'}
                        >
                          {log.ipAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={() => setDetailsDialog({ 
                            open: true, 
                            item: log, 
                            type: 'security' 
                          })}
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

      {/* Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, item: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detailsDialog.type === 'system' && 'System Access Details'}
          {detailsDialog.type === 'employee' && 'Employee Access Details'}
          {detailsDialog.type === 'security' && 'Security Event Details'}
        </DialogTitle>
        <DialogContent>
          {detailsDialog.item && detailsDialog.type === 'system' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">System Name</Typography>
                <Typography>{detailsDialog.item.systemName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">System Code</Typography>
                <Typography>{detailsDialog.item.systemCode}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Access Level</Typography>
                <Typography>{detailsDialog.item.accessLevel}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Level</Typography>
                <Chip 
                  label={detailsDialog.item.riskLevel} 
                  color={getRiskColor(detailsDialog.item.riskLevel)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{detailsDialog.item.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Permissions</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {detailsDialog.item.permissions.map((permission, index) => (
                    <Chip key={index} label={permission.replace('_', ' ')} size="small" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Last Access</Typography>
                <Typography>{new Date(detailsDialog.item.lastAccess).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Maintenance Window</Typography>
                <Typography>{detailsDialog.item.maintenanceWindow}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={detailsDialog.item.complianceRequired} disabled />}
                  label="Compliance Monitoring Required"
                />
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'employee' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Employee ID</Typography>
                <Typography>{detailsDialog.item.employeeId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Department</Typography>
                <Typography>{detailsDialog.item.department}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Access Level</Typography>
                <Typography>{detailsDialog.item.accessLevel}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Account Status</Typography>
                <Chip 
                  label={detailsDialog.item.status} 
                  color={getStatusColor(detailsDialog.item.status)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">System Access</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {detailsDialog.item.systems.map((system, index) => (
                    <Chip key={index} label={system} size="small" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Permissions</Typography>
                <List dense>
                  {detailsDialog.item.permissions.map((permission, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><CheckCircle /></ListItemIcon>
                      <ListItemText primary={permission.replace('_', ' ')} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Last Login</Typography>
                <Typography>{new Date(detailsDialog.item.lastLogin).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Session Duration</Typography>
                <Typography>{detailsDialog.item.sessionDuration}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Failed Attempts</Typography>
                <Typography color={detailsDialog.item.failedAttempts > 0 ? 'error' : 'textPrimary'}>
                  {detailsDialog.item.failedAttempts}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Registered Device</Typography>
                <Typography>{detailsDialog.item.deviceRegistered}</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Switch checked={detailsDialog.item.mfaEnabled} disabled />}
                  label="Multi-Factor Authentication"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Switch checked={detailsDialog.item.accountLocked} disabled />}
                  label="Account Locked"
                />
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'security' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Event Type</Typography>
                <Typography>{detailsDialog.item.eventType.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Severity</Typography>
                <Chip 
                  label={detailsDialog.item.severity} 
                  color={getSeverityColor(detailsDialog.item.severity)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">User</Typography>
                <Typography>{detailsDialog.item.userName} ({detailsDialog.item.userId})</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">System Accessed</Typography>
                <Typography>{detailsDialog.item.systemAccessed}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{detailsDialog.item.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">IP Address</Typography>
                <Typography>{detailsDialog.item.ipAddress}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Location</Typography>
                <Typography>{detailsDialog.item.location}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Device Info</Typography>
                <Typography>{detailsDialog.item.deviceInfo}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Session ID</Typography>
                <Typography>{detailsDialog.item.sessionId || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Timestamp</Typography>
                <Typography>{new Date(detailsDialog.item.timestamp).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, item: null, type: '' })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Access Management Dialog */}
      <Dialog 
        open={accessDialog.open} 
        onClose={() => setAccessDialog({ open: false, type: '', employee: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {accessDialog.type === 'suspend' && 'Suspend Employee Access'}
          {accessDialog.type === 'reset' && 'Reset Employee Password'}
        </DialogTitle>
        <DialogContent>
          {accessDialog.employee && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Employee: {accessDialog.employee.employeeName}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                ID: {accessDialog.employee.employeeId}
              </Typography>
              
              {accessDialog.type === 'suspend' && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  This will suspend all system access for this employee. They will not be able to log in to any systems.
                </Alert>
              )}
              
              {accessDialog.type === 'reset' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  This will reset the employee's password and require them to set a new password on next login.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccessDialog({ open: false, type: '', employee: null })}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            color={accessDialog.type === 'suspend' ? 'warning' : 'primary'}
            onClick={() => {
              if (accessDialog.type === 'suspend') {
                handleEmployeeAccess(accessDialog.employee.id, 'SUSPEND');
              } else if (accessDialog.type === 'reset') {
                handleEmployeeAccess(accessDialog.employee.id, 'RESET_PASSWORD');
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

export default ManagerSystemAccess;
