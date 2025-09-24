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
  Switch,
  FormControlLabel,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Refresh as RefreshIcon,
  SupervisorAccount as AdminIcon,
  Business as BranchIcon,
  Assessment as ReportIcon,
  Timeline as AnalyticsIcon,
  Shield as ShieldIcon,
  Backup as BackupIcon,
  Storage as DatabaseIcon,
  VpnKey as ApiIcon,
  MonitorHeart as MonitorIcon,
  Groups as UsersIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({});
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [securityReports, setSecurityReports] = useState([]);
  const [systemConfig, setSystemConfig] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });
  
  // User management dialog states
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'USER',
    branchId: '',
    isActive: true
  });

  // Branch management dialog states
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({
    name: '',
    address: '',
    phone: '',
    managerName: '',
    isActive: true
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      
      // Try to load real data from API, fallback to mock data
      try {
        const [dashboardResponse, usersResponse, branchesResponse, securityResponse, configResponse] = await Promise.all([
          apiService.get('/admin/dashboard'),
          apiService.get('/admin/users'),
          apiService.get('/admin/branches'),
          apiService.get('/admin/security/reports'),
          apiService.get('/admin/system/config')
        ]);

        setDashboardStats(dashboardResponse || {});
        setUsers(usersResponse || []);
        setBranches(branchesResponse || []);
        setSecurityReports(securityResponse || []);
        setSystemConfig(configResponse || {});
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Fallback to mock data
        setDashboardStats(mockDashboardStats);
        setUsers(mockUsers);
        setBranches(mockBranches);
        setSecurityReports(mockSecurityReports);
        setSystemConfig(mockSystemConfig);
      }
      
    } catch (error) {
      console.error('Error loading admin data:', error);
      showAlert('Error loading admin data: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 5000);
  };

  const handleUserAction = async (userId, action) => {
    try {
      await apiService.post(`/admin/users/${userId}/${action}`);
      showAlert(`User ${action}ed successfully`, 'success');
      loadAdminData();
    } catch (error) {
      showAlert(`Error ${action}ing user: ` + error.message, 'error');
    }
  };

  const handleCreateUser = async () => {
    try {
      await apiService.post('/admin/users', userForm);
      showAlert('User created successfully', 'success');
      setUserDialogOpen(false);
      resetUserForm();
      loadAdminData();
    } catch (error) {
      showAlert('Error creating user: ' + error.message, 'error');
    }
  };

  const handleUpdateUser = async () => {
    try {
      await apiService.put(`/admin/users/${selectedUser.id}`, userForm);
      showAlert('User updated successfully', 'success');
      setUserDialogOpen(false);
      resetUserForm();
      loadAdminData();
    } catch (error) {
      showAlert('Error updating user: ' + error.message, 'error');
    }
  };

  const handleCreateBranch = async () => {
    try {
      await apiService.post('/admin/branches', branchForm);
      showAlert('Branch created successfully', 'success');
      setBranchDialogOpen(false);
      resetBranchForm();
      loadAdminData();
    } catch (error) {
      showAlert('Error creating branch: ' + error.message, 'error');
    }
  };

  const handleConfigUpdate = async (configKey, value) => {
    try {
      await apiService.post('/admin/system/config', { [configKey]: value });
      showAlert('Configuration updated successfully', 'success');
      setSystemConfig(prev => ({ ...prev, [configKey]: value }));
    } catch (error) {
      showAlert('Error updating configuration: ' + error.message, 'error');
    }
  };

  const resetUserForm = () => {
    setUserForm({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'USER',
      branchId: '',
      isActive: true
    });
    setSelectedUser(null);
  };

  const resetBranchForm = () => {
    setBranchForm({
      name: '',
      address: '',
      phone: '',
      managerName: '',
      isActive: true
    });
    setSelectedBranch(null);
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle, trend, badge }) => (
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
            {trend && (
              <Typography 
                variant="body2" 
                color={trend > 0 ? 'success.main' : 'error.main'}
                sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
              >
                {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% from last month
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
          Administrator Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome {user?.firstName || user?.username}! Manage system operations and oversee all banking activities.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers || users.length}
            icon={<PeopleIcon />}
            color="primary"
            subtitle="Active customers"
            trend={5.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Branches"
            value={dashboardStats.activeBranches || branches.filter(b => b.isActive).length}
            icon={<BranchIcon />}
            color="success"
            subtitle="Operational locations"
            trend={2.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Security Alerts"
            value={dashboardStats.securityAlerts || securityReports.filter(r => r.severity === 'HIGH').length}
            icon={<SecurityIcon />}
            color="warning"
            subtitle="Need attention"
            badge={securityReports.filter(r => r.severity === 'HIGH').length > 0 ? securityReports.filter(r => r.severity === 'HIGH').length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="System Health"
            value="98.5%"
            icon={<MonitorIcon />}
            color="info"
            subtitle="Uptime today"
            trend={0.3}
          />
        </Grid>
      </Grid>

      {/* Tabs for different admin sections */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`User Management (${users.length})`} />
            <Tab label={`Branch Management (${branches.length})`} />
            <Tab label={`Security Reports (${securityReports.length})`} />
            <Tab label="System Configuration" />
          </Tabs>
        </Box>

        <CardContent>
          {/* User Management Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">User Management</Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      resetUserForm();
                      setUserDialogOpen(true);
                    }}
                  >
                    Add User
                  </Button>
                  <IconButton onClick={loadAdminData}>
                    <RefreshIcon />
                  </IconButton>
                </Stack>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Branch</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((userItem) => (
                      <TableRow key={userItem.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2 }}>
                              {userItem.firstName?.charAt(0).toUpperCase() || userItem.username?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {userItem.firstName} {userItem.lastName}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {userItem.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={userItem.role}
                            color={
                              userItem.role === 'ADMIN' ? 'error' :
                              userItem.role === 'MANAGER' ? 'warning' :
                              userItem.role === 'EMPLOYEE' ? 'info' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{userItem.branchName || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip
                            label={userItem.isActive ? 'Active' : 'Inactive'}
                            color={userItem.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {userItem.lastLogin ? new Date(userItem.lastLogin).toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Edit User">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedUser(userItem);
                                  setUserForm({
                                    username: userItem.username,
                                    email: userItem.email,
                                    firstName: userItem.firstName,
                                    lastName: userItem.lastName,
                                    role: userItem.role,
                                    branchId: userItem.branchId || '',
                                    isActive: userItem.isActive
                                  });
                                  setUserDialogOpen(true);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={userItem.isActive ? "Lock User" : "Unlock User"}>
                              <IconButton
                                size="small"
                                color={userItem.isActive ? "error" : "success"}
                                onClick={() => handleUserAction(userItem.id, userItem.isActive ? 'lock' : 'unlock')}
                              >
                                {userItem.isActive ? <LockIcon /> : <LockOpenIcon />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Block User">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleUserAction(userItem.id, 'block')}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Branch Management Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Branch Management</Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      resetBranchForm();
                      setBranchDialogOpen(true);
                    }}
                  >
                    Add Branch
                  </Button>
                  <IconButton onClick={loadAdminData}>
                    <RefreshIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Grid container spacing={3}>
                {branches.map((branch) => (
                  <Grid item xs={12} sm={6} md={4} key={branch.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6">{branch.name}</Typography>
                          <Chip
                            label={branch.isActive ? 'Active' : 'Inactive'}
                            color={branch.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          <strong>Address:</strong> {branch.address}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Phone:</strong> {branch.phone}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Manager:</strong> {branch.managerName}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Employees:</strong> {branch.employeeCount || 0}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Customers:</strong> {branch.customerCount || 0}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => {
                              setSelectedBranch(branch);
                              setBranchForm({
                                name: branch.name,
                                address: branch.address,
                                phone: branch.phone,
                                managerName: branch.managerName,
                                isActive: branch.isActive
                              });
                              setBranchDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="info"
                            startIcon={<ReportIcon />}
                          >
                            Reports
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Security Reports Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Security Reports & Monitoring</Typography>
                <IconButton onClick={loadAdminData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Failed Logins (24h)
                      </Typography>
                      <Typography variant="h4" color="error">
                        {dashboardStats.failedLogins || 23}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Suspicious Activities
                      </Typography>
                      <Typography variant="h4" color="warning.main">
                        {dashboardStats.suspiciousActivities || 7}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Blocked IPs
                      </Typography>
                      <Typography variant="h4" color="info.main">
                        {dashboardStats.blockedIps || 12}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Active Sessions
                      </Typography>
                      <Typography variant="h4" color="success.main">
                        {dashboardStats.activeSessions || 1247}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Alert Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>User/IP</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {securityReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Chip
                            label={report.type}
                            color="primary"
                            size="small"
                            icon={<ShieldIcon />}
                          />
                        </TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>
                          <Chip
                            label={report.severity}
                            color={
                              report.severity === 'HIGH' ? 'error' :
                              report.severity === 'MEDIUM' ? 'warning' : 'info'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{report.userOrIp}</TableCell>
                        <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={report.status}
                            color={report.status === 'RESOLVED' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* System Configuration Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>System Configuration</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Security Settings
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary="Two-Factor Authentication" secondary="Require 2FA for all users" />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={systemConfig.require2FA || false}
                                onChange={(e) => handleConfigUpdate('require2FA', e.target.checked)}
                              />
                            }
                            label=""
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Session Timeout" secondary="Automatic logout after inactivity" />
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={systemConfig.sessionTimeout || 30}
                              onChange={(e) => handleConfigUpdate('sessionTimeout', e.target.value)}
                            >
                              <MenuItem value={15}>15 minutes</MenuItem>
                              <MenuItem value={30}>30 minutes</MenuItem>
                              <MenuItem value={60}>1 hour</MenuItem>
                              <MenuItem value={120}>2 hours</MenuItem>
                            </Select>
                          </FormControl>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Password Policy" secondary="Enforce strong passwords" />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={systemConfig.strongPasswordPolicy || true}
                                onChange={(e) => handleConfigUpdate('strongPasswordPolicy', e.target.checked)}
                              />
                            }
                            label=""
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        System Settings
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary="Maintenance Mode" secondary="Disable user access for maintenance" />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={systemConfig.maintenanceMode || false}
                                onChange={(e) => handleConfigUpdate('maintenanceMode', e.target.checked)}
                              />
                            }
                            label=""
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Email Notifications" secondary="Send system notifications via email" />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={systemConfig.emailNotifications || true}
                                onChange={(e) => handleConfigUpdate('emailNotifications', e.target.checked)}
                              />
                            }
                            label=""
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Audit Logging" secondary="Log all administrative actions" />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={systemConfig.auditLogging || true}
                                onChange={(e) => handleConfigUpdate('auditLogging', e.target.checked)}
                              />
                            }
                            label=""
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Database & Backup Status
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <DatabaseIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                            <Typography variant="h6">Database</Typography>
                            <Typography color="success.main">Online</Typography>
                            <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
                            <Typography variant="caption">85% Usage</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <BackupIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                            <Typography variant="h6">Last Backup</Typography>
                            <Typography color="textSecondary">2 hours ago</Typography>
                            <Typography variant="caption" color="success.main">Successful</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <ApiIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">API Status</Typography>
                            <Typography color="success.main">Operational</Typography>
                            <Typography variant="caption">Response: 150ms</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <MonitorIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                            <Typography variant="h6">System Load</Typography>
                            <Typography color="warning.main">Moderate</Typography>
                            <LinearProgress variant="determinate" value={68} color="warning" sx={{ mt: 1 }} />
                            <Typography variant="caption">68% CPU</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* User Management Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Username"
              value={userForm.username}
              onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
              disabled={selectedUser !== null}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="First Name"
              value={userForm.firstName}
              onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={userForm.lastName}
              onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={userForm.role}
                label="Role"
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
                <MenuItem value="MANAGER">Manager</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                value={userForm.branchId}
                label="Branch"
                onChange={(e) => setUserForm({ ...userForm, branchId: e.target.value })}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={userForm.isActive}
                  onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={selectedUser ? handleUpdateUser : handleCreateUser}
          >
            {selectedUser ? 'Update' : 'Create'} User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Branch Management Dialog */}
      <Dialog open={branchDialogOpen} onClose={() => setBranchDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedBranch ? 'Edit Branch' : 'Add New Branch'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Branch Name"
              value={branchForm.name}
              onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={branchForm.address}
              onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={branchForm.phone}
              onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
            />
            <TextField
              fullWidth
              label="Manager Name"
              value={branchForm.managerName}
              onChange={(e) => setBranchForm({ ...branchForm, managerName: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={branchForm.isActive}
                  onChange={(e) => setBranchForm({ ...branchForm, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBranchDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreateBranch}
          >
            {selectedBranch ? 'Update' : 'Create'} Branch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mock data for demonstration
const mockDashboardStats = {
  totalUsers: 1542,
  activeBranches: 12,
  securityAlerts: 3,
  systemHealth: 98.5,
  failedLogins: 23,
  suspiciousActivities: 7,
  blockedIps: 12,
  activeSessions: 1247
};

const mockUsers = [
  {
    id: 1,
    username: 'john.manager',
    email: 'john.manager@sbi.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'MANAGER',
    branchId: 1,
    branchName: 'Central Branch',
    isActive: true,
    lastLogin: '2025-08-29T09:30:00Z'
  },
  {
    id: 2,
    username: 'sarah.employee',
    email: 'sarah.employee@sbi.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'EMPLOYEE',
    branchId: 1,
    branchName: 'Central Branch',
    isActive: true,
    lastLogin: '2025-08-29T14:15:00Z'
  },
  {
    id: 3,
    username: 'customer123',
    email: 'customer@email.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'USER',
    branchId: 2,
    branchName: 'Downtown Branch',
    isActive: false,
    lastLogin: '2025-08-28T16:45:00Z'
  }
];

const mockBranches = [
  {
    id: 1,
    name: 'Central Branch',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    phone: '+91-22-12345678',
    managerName: 'John Smith',
    isActive: true,
    employeeCount: 25,
    customerCount: 1245
  },
  {
    id: 2,
    name: 'Downtown Branch',
    address: '456 Business District, Mumbai, Maharashtra 400002',
    phone: '+91-22-23456789',
    managerName: 'Lisa Davis',
    isActive: true,
    employeeCount: 18,
    customerCount: 892
  }
];

const mockSecurityReports = [
  {
    id: 1,
    type: 'FAILED_LOGIN',
    description: 'Multiple failed login attempts from same IP',
    severity: 'HIGH',
    userOrIp: '192.168.1.100',
    timestamp: '2025-08-29T15:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 2,
    type: 'SUSPICIOUS_TRANSACTION',
    description: 'Large transaction outside normal pattern',
    severity: 'MEDIUM',
    userOrIp: 'user123',
    timestamp: '2025-08-29T12:45:00Z',
    status: 'INVESTIGATING'
  },
  {
    id: 3,
    type: 'UNAUTHORIZED_ACCESS',
    description: 'Access attempt to admin panel',
    severity: 'HIGH',
    userOrIp: '10.0.0.55',
    timestamp: '2025-08-29T08:20:00Z',
    status: 'RESOLVED'
  }
];

const mockSystemConfig = {
  require2FA: true,
  sessionTimeout: 30,
  strongPasswordPolicy: true,
  maintenanceMode: false,
  emailNotifications: true,
  auditLogging: true
};

export default AdminDashboard;
