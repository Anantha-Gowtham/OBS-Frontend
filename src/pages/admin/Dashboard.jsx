import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Avatar,
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import SkeletonBlock from '../../components/SkeletonBlock';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Block as BlockIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  AccountBalance as BankIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalBranches: 0,
    pendingApprovals: 0,
    securityAlerts: 0,
    adminUsers: 0,
    managerUsers: 0,
    employeeUsers: 0,
    customerUsers: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  // New user form state
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to load real data from API, fallback to mock data
      try {
        const [dashboardResponse, usersResponse, securityResponse, auditResponse] = await Promise.all([
          apiService.get('/admin/dashboard'),
          apiService.get('/admin/users'),
          apiService.get('/admin/security/reports'),
          apiService.get('/admin/audit/logs')
        ]);

        setDashboardData({
          totalUsers: dashboardResponse.totalUsers || 0,
          activeUsers: dashboardResponse.activeUsers || 0,
          blockedUsers: dashboardResponse.blockedUsers || 0,
          totalBranches: dashboardResponse.totalBranches || 0,
          pendingApprovals: 12,
          securityAlerts: dashboardResponse.securityAlerts || 0,
          adminUsers: dashboardResponse.adminUsers || 0,
          managerUsers: dashboardResponse.managerUsers || 0,
          employeeUsers: dashboardResponse.employeeUsers || 0,
          customerUsers: dashboardResponse.customerUsers || 0,
        });

        setUsers(usersResponse || []);
        setRecentUsers((usersResponse || []).slice(0, 5));
        setSecurityLogs(auditResponse || []);
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Fallback to mock data
        const [usersResponse, branchesResponse, securityResponse] = await Promise.all([
          Promise.resolve({ users: mockUsers, totalCount: 150, activeCount: 142, blockedCount: 8 }),
          Promise.resolve({ branches: mockBranches, totalCount: 25 }),
          Promise.resolve({ logs: mockSecurityLogs, alertsCount: 5 })
        ]);

        setDashboardData({
          totalUsers: usersResponse.totalCount,
          activeUsers: usersResponse.activeCount,
          blockedUsers: usersResponse.blockedCount,
          totalBranches: branchesResponse.totalCount,
          pendingApprovals: 12,
          securityAlerts: securityResponse.alertsCount,
          adminUsers: 5,
          managerUsers: 15,
          employeeUsers: 45,
          customerUsers: 85,
        });

        setUsers(usersResponse.users);
        setRecentUsers(usersResponse.users);
        setSecurityLogs(securityResponse.logs);
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showAlert('Error loading dashboard data: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 5000);
  };

  const handleCreateUser = async () => {
    try {
      await apiService.post('/admin/users', newUser);
      showAlert('User created successfully', 'success');
      setNewUserDialogOpen(false);
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        firstName: '',
        lastName: '',
        phoneNumber: ''
      });
      loadDashboardData();
    } catch (error) {
      showAlert('Error creating user: ' + error.message, 'error');
    }
  };

  const handleLockUser = async (userId) => {
    try {
      await apiService.post(`/admin/users/${userId}/lock`);
      showAlert('User locked successfully', 'success');
      loadDashboardData();
    } catch (error) {
      showAlert('Error locking user: ' + error.message, 'error');
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      await apiService.post(`/admin/users/${userId}/unlock`);
      showAlert('User unlocked successfully', 'success');
      loadDashboardData();
    } catch (error) {
      showAlert('Error unlocking user: ' + error.message, 'error');
    }
  };

  const handleResetPassword = async (userId) => {
    try {
      const response = await apiService.post(`/admin/users/${userId}/reset-password`);
      showAlert(`Password reset. Temporary password: ${response.tempPassword}`, 'info');
    } catch (error) {
      showAlert('Error resetting password: ' + error.message, 'error');
    }
  };

  const summaryCards = [
    {
      title: 'Total Users',
      value: dashboardData.totalUsers,
      icon: <PeopleIcon />,
      color: 'primary',
      subtitle: `${dashboardData.activeUsers} active, ${dashboardData.blockedUsers} blocked`,
    },
    {
      title: 'Total Branches',
      value: dashboardData.totalBranches,
      icon: <BankIcon />,
      color: 'success',
      subtitle: 'Across all regions',
    },
    {
      title: 'Pending Approvals',
      value: dashboardData.pendingApprovals,
      icon: <WarningIcon />,
      color: 'warning',
      subtitle: 'Require attention',
    },
    {
      title: 'Security Alerts',
      value: dashboardData.securityAlerts,
      icon: <SecurityIcon />,
      color: 'error',
      subtitle: 'Last 24 hours',
    },
  ];

  const roleCards = [
    {
      title: 'Admins',
      value: dashboardData.adminUsers,
      icon: <SecurityIcon />,
      color: 'error',
    },
    {
      title: 'Managers',
      value: dashboardData.managerUsers,
      icon: <AnalyticsIcon />,
      color: 'warning',
    },
    {
      title: 'Employees',
      value: dashboardData.employeeUsers,
      icon: <PersonIcon />,
      color: 'info',
    },
    {
      title: 'Customers',
      value: dashboardData.customerUsers,
      icon: <PeopleIcon />,
      color: 'success',
    },
  ];

  const systemCards = [
    {
      title: 'Total Branches',
      value: dashboardData.totalBranches,
      icon: <BusinessIcon />,
      color: 'success',
      subtitle: 'Across all regions',
    },
    {
      title: 'Pending Approvals',
      value: dashboardData.pendingApprovals,
      icon: <WarningIcon />,
      color: 'warning',
      subtitle: 'Require attention',
    },
    {
      title: 'Security Alerts',
      value: dashboardData.securityAlerts,
      icon: <SecurityIcon />,
      color: 'error',
      subtitle: 'Last 24 hours',
    },
  ];

  if (loading) {
    // Skeleton layout mimic
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Card sx={{ p: 2 }}>
                <SkeletonBlock height={18} width="60%" sx={{ mb: 1 }} />
                <SkeletonBlock height={32} width="50%" sx={{ mb: 1 }} />
                <SkeletonBlock height={14} width="80%" />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ p: 2 }}>
              <SkeletonBlock height={20} width="40%" sx={{ mb: 2 }} />
              {Array.from({ length: 5 }).map((_, r) => (
                <SkeletonBlock key={r} height={18} width={`${90 - r * 5}%`} sx={{ mb: 1 }} />
              ))}
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ p: 2 }}>
              <SkeletonBlock height={20} width="60%" sx={{ mb: 2 }} />
              {Array.from({ length: 4 }).map((_, r) => (
                <SkeletonBlock key={r} height={50} width="100%" sx={{ mb: 1.2 }} />
              ))}
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        System overview and management controls
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} data-reveal={`delay-${(index % 5) + 1}`}> 
            <Card className="fade-up" sx={{ position: 'relative', overflow: 'hidden', transition: 'transform .35s ease, box-shadow .4s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px -6px rgba(0,0,0,0.15)' } }}>
              <CardContent sx={{ '&:after': { content: '""', position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.02)', pointerEvents: 'none' } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="h6" sx={{ fontWeight: 600, letterSpacing: '.5px' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </Box>
                  <Box color={`${card.color}.main`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: 48, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))', transition: 'transform .6s ease', transform: 'scale(.9)' }, '&:hover svg': { transform: 'scale(1)' } }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Alerts Section */}
      {dashboardData.securityAlerts > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Security Alert:</strong> {dashboardData.securityAlerts} security incidents detected in the last 24 hours. 
          Review security logs immediately.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Recent Users */}
        <Grid size={{ xs: 12, lg: 8 }} className="fade-up" data-reveal>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent User Registrations
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip label={user.role} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status} 
                            color={user.status === 'Active' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>
                          {user.status === 'Blocked' && (
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => handleUnblockUser(user.id)}
                            >
                              Unblock
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Logs */}
        <Grid size={{ xs: 12, lg: 4 }} className="fade-up" data-reveal="delay-2">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Security Events
              </Typography>
              {securityLogs.map((log, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {log.event}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {log.user} • {log.timestamp}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {log.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Mock data (replace with actual API calls)
const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    role: 'USER',
    status: 'Active',
    createdAt: '2025-08-28'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    role: 'EMPLOYEE',
    status: 'Active',
    createdAt: '2025-08-27'
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@email.com',
    role: 'USER',
    status: 'Blocked',
    createdAt: '2025-08-26'
  }
];

const mockBranches = [];

const mockSecurityLogs = [
  {
    event: 'Failed Login',
    user: 'user@example.com',
    timestamp: '2 hours ago',
    description: 'Multiple failed login attempts detected'
  },
  {
    event: 'Account Locked',
    user: 'suspicious@email.com',
    timestamp: '4 hours ago',
    description: 'Account automatically locked after 3 failed attempts'
  },
  {
    event: 'Suspicious Transaction',
    user: 'customer@bank.com',
    timestamp: '6 hours ago',
    description: 'Large transaction flagged for review'
  }
];

export default AdminDashboard;
