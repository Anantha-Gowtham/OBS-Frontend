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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  CircularProgress,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Checkbox,
  Rating,
  Tooltip,
  Menu,
  MenuList,
  ListItemButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  TablePagination
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Person,
  Email,
  Phone,
  Work,
  Schedule,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Warning,
  Star,
  Assessment,
  Settings,
  MoreVert,
  Search,
  FilterList,
  Download,
  Upload,
  Group,
  Business,
  LocationOn,
  CalendarToday,
  MonetizationOn,
  Security,
  Notifications,
  History,
  ExpandMore,
  Assignment,
  TimelapseOutlined,
  PersonAdd,
  Block,
  Lock,
  LockOpen,
  VpnKey,
  AdminPanelSettings,
  SupervisorAccount,
  AccountCircle,
  CreditCard,
  AccountBalance,
  Shield,
  Verified,
  Error,
  Info,
  Refresh,
  FileDownload,
  Print,
  Send,
  Backup,
  RestoreFromTrash
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const ManageUsers = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: '', user: null });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // User management data
  const [users, setUsers] = useState([
    {
      id: 'USER001',
      userId: 'ADM001',
      name: 'System Administrator',
      email: 'admin@obs.com',
      phone: '+91-9876543210',
      role: 'Admin',
      department: 'IT',
      branch: 'Head Office',
      status: 'Active',
      lastLogin: '2024-01-22 08:30:00',
      createdDate: '2023-01-15',
      permissions: ['Full Access', 'User Management', 'System Configuration', 'Security Management'],
      accountsLinked: 0,
      loginAttempts: 0,
      securityLevel: 'Maximum',
      mfaEnabled: true,
      ipRestrictions: ['192.168.1.0/24'],
      sessionTimeout: 30,
      passwordLastChanged: '2024-01-01',
      failedLogins: 0,
      accountLocked: false,
      address: 'Head Office, Banking Street, City - 123456',
      emergencyContact: '+91-9876543211',
      profileImage: null
    },
    {
      id: 'USER002',
      userId: 'MGR001',
      name: 'John Manager',
      email: 'john.manager@obs.com',
      phone: '+91-9876543220',
      role: 'Manager',
      department: 'Operations',
      branch: 'Main Branch',
      status: 'Active',
      lastLogin: '2024-01-22 09:15:00',
      createdDate: '2023-03-20',
      permissions: ['Branch Management', 'Employee Management', 'Loan Approval', 'Reports'],
      accountsLinked: 0,
      loginAttempts: 2,
      securityLevel: 'High',
      mfaEnabled: true,
      ipRestrictions: ['192.168.2.0/24'],
      sessionTimeout: 45,
      passwordLastChanged: '2024-01-10',
      failedLogins: 0,
      accountLocked: false,
      address: 'Manager Residency, Manager Street, City - 123457',
      emergencyContact: '+91-9876543221',
      profileImage: null
    },
    {
      id: 'USER003',
      userId: 'EMP001',
      name: 'Alice Cooper',
      email: 'alice.cooper@obs.com',
      phone: '+91-9876543230',
      role: 'Employee',
      department: 'Customer Service',
      branch: 'Main Branch',
      status: 'Active',
      lastLogin: '2024-01-22 09:00:00',
      createdDate: '2023-06-15',
      permissions: ['Customer Service', 'Transaction Processing', 'Account Management'],
      accountsLinked: 0,
      loginAttempts: 1,
      securityLevel: 'Medium',
      mfaEnabled: false,
      ipRestrictions: [],
      sessionTimeout: 60,
      passwordLastChanged: '2024-01-15',
      failedLogins: 0,
      accountLocked: false,
      address: 'Employee Colony, Worker Street, City - 123458',
      emergencyContact: '+91-9876543231',
      profileImage: null
    },
    {
      id: 'USER004',
      userId: 'CUST001',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+91-9876543240',
      role: 'Customer',
      department: null,
      branch: 'Main Branch',
      status: 'Active',
      lastLogin: '2024-01-22 10:30:00',
      createdDate: '2023-08-10',
      permissions: ['Account Access', 'Transaction History', 'Online Banking'],
      accountsLinked: 3,
      loginAttempts: 0,
      securityLevel: 'Standard',
      mfaEnabled: true,
      ipRestrictions: [],
      sessionTimeout: 120,
      passwordLastChanged: '2024-01-05',
      failedLogins: 0,
      accountLocked: false,
      address: 'Customer Avenue, Residential Area, City - 123459',
      emergencyContact: '+91-9876543241',
      profileImage: null
    },
    {
      id: 'USER005',
      userId: 'CUST002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+91-9876543250',
      role: 'Customer',
      department: null,
      branch: 'East Branch',
      status: 'Suspended',
      lastLogin: '2024-01-20 14:20:00',
      createdDate: '2023-09-05',
      permissions: ['Account Access', 'Transaction History'],
      accountsLinked: 2,
      loginAttempts: 5,
      securityLevel: 'Standard',
      mfaEnabled: false,
      ipRestrictions: [],
      sessionTimeout: 120,
      passwordLastChanged: '2023-12-15',
      failedLogins: 5,
      accountLocked: true,
      address: 'East District, Customer Street, City - 123460',
      emergencyContact: '+91-9876543251',
      profileImage: null
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    branch: '',
    address: '',
    emergencyContact: '',
    permissions: [],
    securityLevel: 'Standard',
    mfaEnabled: false,
    sessionTimeout: 120
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 1245,
    activeUsers: 1180,
    suspendedUsers: 45,
    lockedUsers: 20,
    adminUsers: 5,
    managerUsers: 25,
    employeeUsers: 115,
    customerUsers: 1100,
    mfaEnabled: 892,
    onlineUsers: 234
  });

  const roles = ['Admin', 'Manager', 'Employee', 'Customer'];
  const departments = ['IT', 'Operations', 'Customer Service', 'Loans', 'Security', 'Finance', 'HR'];
  const branches = ['Head Office', 'Main Branch', 'East Branch', 'West Branch', 'North Branch', 'South Branch'];
  const securityLevels = ['Standard', 'Medium', 'High', 'Maximum'];
  const permissions = {
    Admin: ['Full Access', 'User Management', 'System Configuration', 'Security Management', 'Audit Logs'],
    Manager: ['Branch Management', 'Employee Management', 'Loan Approval', 'Reports', 'Customer Management'],
    Employee: ['Customer Service', 'Transaction Processing', 'Account Management', 'KYC Processing'],
    Customer: ['Account Access', 'Transaction History', 'Online Banking', 'Mobile Banking']
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesBranch = filterBranch === 'all' || user.branch === filterBranch;
    return matchesSearch && matchesRole && matchesStatus && matchesBranch;
  });

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Suspended':
        return 'warning';
      case 'Inactive':
        return 'error';
      case 'Locked':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'error';
      case 'Manager':
        return 'warning';
      case 'Employee':
        return 'info';
      case 'Customer':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin':
        return <AdminPanelSettings />;
      case 'Manager':
        return <SupervisorAccount />;
      case 'Employee':
        return <Person />;
      case 'Customer':
        return <AccountCircle />;
      default:
        return <Person />;
    }
  };

  const getSecurityLevelColor = (level) => {
    switch (level) {
      case 'Maximum':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Standard':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleUserAction = async (action, userId, data = {}) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (action) {
        case 'activate':
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, status: 'Active', accountLocked: false, failedLogins: 0 } : user
          ));
          break;
        case 'suspend':
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, status: 'Suspended' } : user
          ));
          break;
        case 'lock':
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, accountLocked: true, status: 'Locked' } : user
          ));
          break;
        case 'unlock':
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, accountLocked: false, status: 'Active', failedLogins: 0 } : user
          ));
          break;
        case 'resetPassword':
          // Password reset logic
          break;
        case 'delete':
          setUsers(prev => prev.filter(user => user.id !== userId));
          break;
        case 'update':
          setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, ...data } : user
          ));
          break;
        default:
          break;
      }
      
      setConfirmDialog({ open: false, action: '', user: null });
      setAnchorEl(null);
    } catch (err) {
      console.error('Error performing action:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUserData = {
        ...newUser,
        id: `USER${String(users.length + 1).padStart(3, '0')}`,
        userId: `${newUser.role.toUpperCase().slice(0, 3)}${String(users.length + 1).padStart(3, '0')}`,
        status: 'Active',
        lastLogin: 'Never',
        createdDate: new Date().toISOString().split('T')[0],
        loginAttempts: 0,
        failedLogins: 0,
        accountLocked: false,
        passwordLastChanged: new Date().toISOString().split('T')[0],
        accountsLinked: newUser.role === 'Customer' ? 0 : 0,
        ipRestrictions: [],
        permissions: permissions[newUser.role] || []
      };
      
      setUsers(prev => [...prev, newUserData]);
      setAddUserOpen(false);
      setNewUser({
        name: '', email: '', phone: '', role: '', department: '', branch: '',
        address: '', emergencyContact: '', permissions: [], securityLevel: 'Standard',
        mfaEnabled: false, sessionTimeout: 120
      });
    } catch (err) {
      console.error('Error adding user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async (action) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUsers(prev => prev.map(user => {
        if (selectedUsers.includes(user.id)) {
          switch (action) {
            case 'activate':
              return { ...user, status: 'Active', accountLocked: false };
            case 'suspend':
              return { ...user, status: 'Suspended' };
            case 'enableMFA':
              return { ...user, mfaEnabled: true };
            case 'disableMFA':
              return { ...user, mfaEnabled: false };
            default:
              return user;
          }
        }
        return user;
      }));
      
      setSelectedUsers([]);
      setBulkActionOpen(false);
    } catch (err) {
      console.error('Error performing bulk action:', err);
    } finally {
      setLoading(false);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            User Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Comprehensive system user administration and security management
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            onClick={() => setBulkActionOpen(true)}
            disabled={selectedUsers.length === 0}
          >
            Bulk Actions ({selectedUsers.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setAddUserOpen(true)}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {dashboardStats.totalUsers.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Group />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="success.main">
                    {dashboardStats.activeUsers.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Online Now
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="info.main">
                    {dashboardStats.onlineUsers}
                  </Typography>
                </Box>
                <Badge badgeContent={dashboardStats.onlineUsers} color="info">
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <Schedule />
                  </Avatar>
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    MFA Enabled
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="warning.main">
                    {dashboardStats.mfaEnabled}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Security />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Distribution */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>User Distribution by Role</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="error.main">{dashboardStats.adminUsers}</Typography>
                    <Typography variant="body2">Admins</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="warning.main">{dashboardStats.managerUsers}</Typography>
                    <Typography variant="body2">Managers</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="info.main">{dashboardStats.employeeUsers}</Typography>
                    <Typography variant="body2">Employees</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="primary.main">{dashboardStats.customerUsers}</Typography>
                    <Typography variant="body2">Customers</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Overview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Security Status</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary={`${dashboardStats.suspendedUsers} Suspended`}
                    secondary="Require attention"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Error color="error" /></ListItemIcon>
                  <ListItemText 
                    primary={`${dashboardStats.lockedUsers} Locked`}
                    secondary="Security violations"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="success" /></ListItemIcon>
                  <ListItemText 
                    primary={`${((dashboardStats.mfaEnabled / dashboardStats.totalUsers) * 100).toFixed(1)}%`}
                    secondary="MFA adoption rate"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={filterRole}
                  label="Role"
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  {roles.map(role => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                  <MenuItem value="locked">Locked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={filterBranch}
                  label="Branch"
                  onChange={(e) => setFilterBranch(e.target.value)}
                >
                  <MenuItem value="all">All Branches</MenuItem>
                  {branches.map(branch => (
                    <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<Download />} fullWidth>
                  Export
                </Button>
                <Button variant="outlined" startIcon={<Print />} fullWidth>
                  Print
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              User List ({filteredUsers.length})
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(paginatedUsers.map(user => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              }
              label="Select All"
            />
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(paginatedUsers.map(user => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Security</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(prev => [...prev, user.id]);
                          } else {
                            setSelectedUsers(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: getRoleColor(user.role) + '.main' }}>
                          {getRoleIcon(user.role)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.userId} • {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role)}
                        size="small"
                        icon={getRoleIcon(user.role)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.department || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.branch}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Chip
                          label={user.status}
                          color={getStatusColor(user.status)}
                          size="small"
                        />
                        {user.accountLocked && (
                          <Chip
                            label="Locked"
                            color="error"
                            size="small"
                            icon={<Lock />}
                            sx={{ ml: 0.5 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={user.securityLevel}
                          color={getSecurityLevelColor(user.securityLevel)}
                          size="small"
                          variant="outlined"
                        />
                        {user.mfaEnabled && (
                          <Tooltip title="MFA Enabled">
                            <Verified color="success" fontSize="small" />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedUser(user);
                              setUserDialogOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setSelectedUser(user);
                            setAnchorEl(e.currentTarget);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuList>
          <ListItemButton onClick={() => {
            setConfirmDialog({ 
              open: true, 
              action: selectedUser?.status === 'Active' ? 'suspend' : 'activate',
              user: selectedUser 
            });
            setAnchorEl(null);
          }}>
            <ListItemIcon>
              {selectedUser?.status === 'Active' ? <Block /> : <CheckCircle />}
            </ListItemIcon>
            <ListItemText>
              {selectedUser?.status === 'Active' ? 'Suspend User' : 'Activate User'}
            </ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={() => {
            setConfirmDialog({ 
              open: true, 
              action: selectedUser?.accountLocked ? 'unlock' : 'lock',
              user: selectedUser 
            });
            setAnchorEl(null);
          }}>
            <ListItemIcon>
              {selectedUser?.accountLocked ? <LockOpen /> : <Lock />}
            </ListItemIcon>
            <ListItemText>
              {selectedUser?.accountLocked ? 'Unlock Account' : 'Lock Account'}
            </ListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => {
            setConfirmDialog({ open: true, action: 'resetPassword', user: selectedUser });
            setAnchorEl(null);
          }}>
            <ListItemIcon><VpnKey /></ListItemIcon>
            <ListItemText>Reset Password</ListItemText>
          </ListItemButton>

          <Divider />

          <ListItemButton onClick={() => {
            setConfirmDialog({ open: true, action: 'delete', user: selectedUser });
            setAnchorEl(null);
          }}>
            <ListItemIcon><Delete /></ListItemIcon>
            <ListItemText>Delete User</ListItemText>
          </ListItemButton>
        </MenuList>
      </Menu>

      {/* User Details Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">User Details - {selectedUser?.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={selectedUser?.role}
                color={getRoleColor(selectedUser?.role)}
                icon={getRoleIcon(selectedUser?.role)}
              />
              <Chip
                label={selectedUser?.status}
                color={getStatusColor(selectedUser?.status)}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Basic Info" />
              <Tab label="Security" />
              <Tab label="Permissions" />
              <Tab label="Activity" />
            </Tabs>
          )}
          
          <TabPanel value={activeTab} index={0}>
            {selectedUser && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon><Person /></ListItemIcon>
                      <ListItemText primary="User ID" secondary={selectedUser.userId} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Email /></ListItemIcon>
                      <ListItemText primary="Email" secondary={selectedUser.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Phone /></ListItemIcon>
                      <ListItemText primary="Phone" secondary={selectedUser.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Work /></ListItemIcon>
                      <ListItemText primary="Department" secondary={selectedUser.department || 'N/A'} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText primary="Branch" secondary={selectedUser.branch} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday /></ListItemIcon>
                      <ListItemText primary="Created Date" secondary={selectedUser.createdDate} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CreditCard /></ListItemIcon>
                      <ListItemText primary="Linked Accounts" secondary={selectedUser.accountsLinked} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Phone /></ListItemIcon>
                      <ListItemText primary="Emergency Contact" secondary={selectedUser.emergencyContact} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Address"
                    value={selectedUser.address}
                    fullWidth
                    multiline
                    rows={2}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {selectedUser && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Security Level</Typography>
                      <Chip 
                        label={selectedUser.securityLevel} 
                        color={getSecurityLevelColor(selectedUser.securityLevel)}
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Session Timeout: {selectedUser.sessionTimeout} minutes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Multi-Factor Authentication</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {selectedUser.mfaEnabled ? (
                          <Chip label="Enabled" color="success" icon={<Verified />} />
                        ) : (
                          <Chip label="Disabled" color="error" icon={<Error />} />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Login Statistics</Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="body2" color="text.secondary">Failed Logins</Typography>
                          <Typography variant="h6" color={selectedUser.failedLogins > 0 ? 'error.main' : 'success.main'}>
                            {selectedUser.failedLogins}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="body2" color="text.secondary">Login Attempts</Typography>
                          <Typography variant="h6">{selectedUser.loginAttempts}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="body2" color="text.secondary">Account Status</Typography>
                          <Typography variant="h6" color={selectedUser.accountLocked ? 'error.main' : 'success.main'}>
                            {selectedUser.accountLocked ? 'Locked' : 'Unlocked'}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Typography variant="body2" color="text.secondary">Password Changed</Typography>
                          <Typography variant="body2">{selectedUser.passwordLastChanged}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            {selectedUser && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>User Permissions</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedUser.permissions.map((permission, index) => (
                          <Chip
                            key={index}
                            label={permission}
                            color="primary"
                            variant="outlined"
                            icon={<Verified />}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {selectedUser.ipRestrictions.length > 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>IP Restrictions</Typography>
                        <List dense>
                          {selectedUser.ipRestrictions.map((ip, index) => (
                            <ListItem key={index}>
                              <ListItemIcon><Security /></ListItemIcon>
                              <ListItemText primary={ip} secondary="Allowed IP range" />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            {selectedUser && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><Schedule /></ListItemIcon>
                          <ListItemText 
                            primary="Last Login" 
                            secondary={selectedUser.lastLogin === 'Never' ? 'Never' : new Date(selectedUser.lastLogin).toLocaleString()}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Security /></ListItemIcon>
                          <ListItemText 
                            primary="Password Changed" 
                            secondary={selectedUser.passwordLastChanged}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Person /></ListItemIcon>
                          <ListItemText 
                            primary="Account Created" 
                            secondary={selectedUser.createdDate}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>System Access</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Recent login locations and devices would be displayed here in a production system.
                      </Typography>
                      <Alert severity="info">
                        Enhanced activity tracking available in premium security package.
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>Edit User</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Phone"
                fullWidth
                required
                value={newUser.phone}
                onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={newUser.role}
                  label="Role"
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                >
                  {roles.map(role => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newUser.department}
                  label="Department"
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={newUser.branch}
                  label="Branch"
                  onChange={(e) => setNewUser(prev => ({ ...prev, branch: e.target.value }))}
                >
                  {branches.map(branch => (
                    <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Security Level</InputLabel>
                <Select
                  value={newUser.securityLevel}
                  label="Security Level"
                  onChange={(e) => setNewUser(prev => ({ ...prev, securityLevel: e.target.value }))}
                >
                  {securityLevels.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Session Timeout (minutes)"
                type="number"
                fullWidth
                value={newUser.sessionTimeout}
                onChange={(e) => setNewUser(prev => ({ ...prev, sessionTimeout: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                value={newUser.address}
                onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Emergency Contact"
                fullWidth
                value={newUser.emergencyContact}
                onChange={(e) => setNewUser(prev => ({ ...prev, emergencyContact: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newUser.mfaEnabled}
                    onChange={(e) => setNewUser(prev => ({ ...prev, mfaEnabled: e.target.checked }))}
                  />
                }
                label="Enable Multi-Factor Authentication"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddUser}
            disabled={loading || !newUser.name || !newUser.email || !newUser.role}
            startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
          >
            {loading ? 'Adding...' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Actions Dialog */}
      <Dialog open={bulkActionOpen} onClose={() => setBulkActionOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk Actions ({selectedUsers.length} users selected)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select an action to apply to all selected users:
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CheckCircle />}
                onClick={() => handleBulkAction('activate')}
                disabled={loading}
              >
                Activate Users
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Block />}
                onClick={() => handleBulkAction('suspend')}
                disabled={loading}
              >
                Suspend Users
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Security />}
                onClick={() => handleBulkAction('enableMFA')}
                disabled={loading}
              >
                Enable MFA
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Security />}
                onClick={() => handleBulkAction('disableMFA')}
                disabled={loading}
              >
                Disable MFA
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkActionOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, action: '', user: null })}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmDialog.action} user "{confirmDialog.user?.name}"?
          </Typography>
          {confirmDialog.action === 'delete' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This action cannot be undone. All user data will be permanently removed.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, action: '', user: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmDialog.action === 'delete' ? 'error' : 'primary'}
            onClick={() => handleUserAction(confirmDialog.action, confirmDialog.user?.id)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
