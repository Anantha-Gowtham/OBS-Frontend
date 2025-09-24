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
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Assessment as AssessmentIcon,
  Approval as ApprovalIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Refresh as RefreshIcon,
  AccountBalance as BankIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({});
  const [pendingLoans, setPendingLoans] = useState([]);
  const [staffRequests, setStaffRequests] = useState([]);
  const [employeePerformance, setEmployeePerformance] = useState([]);
  const [branchReports, setBranchReports] = useState({});
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  // Loan approval form state
  const [loanApproval, setLoanApproval] = useState({
    approvedAmount: '',
    interestRate: '',
    termMonths: '',
    comments: ''
  });

  useEffect(() => {
    loadManagerData();
  }, []);

  const loadManagerData = async () => {
    try {
      setLoading(true);
      
      // Try to load real data from API, fallback to mock data
      try {
        const [dashboardResponse, loansResponse, staffResponse, performanceResponse, reportsResponse] = await Promise.all([
          apiService.get('/manager/dashboard'),
          apiService.get('/manager/loans/pending'),
          apiService.get('/manager/staff/requests'),
          apiService.get('/manager/employees/performance'),
          apiService.get('/manager/reports')
        ]);

        setDashboardStats(dashboardResponse || {});
        setPendingLoans(loansResponse || []);
        setStaffRequests(staffResponse || []);
        setEmployeePerformance(performanceResponse || []);
        setBranchReports(reportsResponse || {});
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Fallback to mock data
        setDashboardStats(mockDashboardStats);
        setPendingLoans(mockPendingLoans);
        setStaffRequests(mockStaffRequests);
        setEmployeePerformance(mockEmployeePerformance);
        setBranchReports(mockBranchReports);
      }
      
    } catch (error) {
      console.error('Error loading manager data:', error);
      showAlert('Error loading manager data: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 5000);
  };

  const handleApproveLoan = async () => {
    try {
      await apiService.post(`/manager/loans/${selectedLoan.id}/approve`, loanApproval);
      showAlert('Loan approved successfully', 'success');
      setLoanDialogOpen(false);
      setSelectedLoan(null);
      setLoanApproval({
        approvedAmount: '',
        interestRate: '',
        termMonths: '',
        comments: ''
      });
      loadManagerData();
    } catch (error) {
      showAlert('Error approving loan: ' + error.message, 'error');
    }
  };

  const handleRejectLoan = async (loanId) => {
    try {
      await apiService.post(`/manager/loans/${loanId}/reject`, { comments: 'Rejected by manager' });
      showAlert('Loan rejected successfully', 'success');
      loadManagerData();
    } catch (error) {
      showAlert('Error rejecting loan: ' + error.message, 'error');
    }
  };

  const handleApproveStaffRequest = async (requestId) => {
    try {
      await apiService.post(`/manager/staff/requests/${requestId}/approve`);
      showAlert('Staff request approved successfully', 'success');
      loadManagerData();
    } catch (error) {
      showAlert('Error approving staff request: ' + error.message, 'error');
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle, badge }) => (
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
          Manager Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome back, {user?.firstName || user?.username}! Oversee your branch operations.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Loans"
            value={pendingLoans.length}
            icon={<MoneyIcon />}
            color="warning"
            subtitle="Awaiting approval"
            badge={pendingLoans.length > 0 ? pendingLoans.length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Staff Requests"
            value={staffRequests.length}
            icon={<PeopleIcon />}
            color="info"
            subtitle="Pending decisions"
            badge={staffRequests.length > 0 ? staffRequests.length : null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Branch Performance"
            value={`${branchReports.performanceScore || 85}%`}
            icon={<TrendingUpIcon />}
            color="success"
            subtitle="This month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Team Members"
            value={employeePerformance.length}
            icon={<GroupIcon />}
            color="primary"
            subtitle="Active employees"
          />
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`Loan Approvals (${pendingLoans.length})`} />
            <Tab label={`Staff Requests (${staffRequests.length})`} />
            <Tab label="Employee Performance" />
            <Tab label="Branch Reports" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Loan Approvals Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pending Loan Applications</Typography>
                <IconButton onClick={loadManagerData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Applicant</TableCell>
                      <TableCell>Loan Type</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Purpose</TableCell>
                      <TableCell>Applied Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2 }}>
                              {loan.applicantName?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {loan.applicantName}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {loan.applicantEmail}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{loan.loanType}</TableCell>
                        <TableCell align="right">₹{loan.amount.toLocaleString()}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>{new Date(loan.appliedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<CheckIcon />}
                              onClick={() => {
                                setSelectedLoan(loan);
                                setLoanApproval({
                                  approvedAmount: loan.amount.toString(),
                                  interestRate: '8.5',
                                  termMonths: '60',
                                  comments: ''
                                });
                                setLoanDialogOpen(true);
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<CancelIcon />}
                              onClick={() => handleRejectLoan(loan.id)}
                            >
                              Reject
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Staff Requests Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Staff Requests</Typography>
                <IconButton onClick={loadManagerData}>
                  <RefreshIcon />
                </IconButton>
              </Box>
              <List>
                {staffRequests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${request.employeeName} - ${request.requestType}`}
                        secondary={
                          <>
                            <Typography variant="body2" color="textSecondary">
                              {request.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={request.priority}
                        color={request.priority === 'HIGH' ? 'error' : request.priority === 'MEDIUM' ? 'warning' : 'default'}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleApproveStaffRequest(request.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                        >
                          Deny
                        </Button>
                      </Box>
                    </ListItem>
                    {index < staffRequests.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}

          {/* Employee Performance Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Employee Performance</Typography>
              <Grid container spacing={3}>
                {employeePerformance.map((employee) => (
                  <Grid item xs={12} sm={6} md={4} key={employee.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2 }}>
                            {employee.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">{employee.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {employee.role}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            Performance Score
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {employee.performanceScore}%
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            Tasks Completed
                          </Typography>
                          <Typography variant="body1">
                            {employee.tasksCompleted}
                          </Typography>
                        </Box>
                        <Chip
                          label={employee.status}
                          color={employee.status === 'Excellent' ? 'success' : employee.status === 'Good' ? 'primary' : 'warning'}
                          size="small"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Branch Reports Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Branch Performance Reports</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        ₹{(branchReports.totalDeposits || 5000000).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Deposits
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        ₹{(branchReports.loansApproved || 2000000).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Loans Approved
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="info.main">
                        {branchReports.newAccounts || 125}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        New Accounts
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {branchReports.customerSatisfaction || 4.2}/5
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Customer Rating
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Loan Approval Dialog */}
      <Dialog open={loanDialogOpen} onClose={() => setLoanDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Approve Loan Application</DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Applicant: {selectedLoan.applicantName}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Requested Amount: ₹{selectedLoan.amount.toLocaleString()}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Approved Amount"
                    type="number"
                    value={loanApproval.approvedAmount}
                    onChange={(e) => setLoanApproval({ ...loanApproval, approvedAmount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Interest Rate (%)"
                    type="number"
                    step="0.1"
                    value={loanApproval.interestRate}
                    onChange={(e) => setLoanApproval({ ...loanApproval, interestRate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Term (Months)"
                    type="number"
                    value={loanApproval.termMonths}
                    onChange={(e) => setLoanApproval({ ...loanApproval, termMonths: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Comments"
                    multiline
                    rows={3}
                    value={loanApproval.comments}
                    onChange={(e) => setLoanApproval({ ...loanApproval, comments: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApproveLoan}>Approve Loan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mock data for demonstration
const mockDashboardStats = {
  pendingLoans: 8,
  staffRequests: 5,
  branchPerformance: 85,
  teamMembers: 12
};

const mockPendingLoans = [
  {
    id: 1,
    applicantName: 'Rajesh Kumar',
    applicantEmail: 'rajesh.kumar@email.com',
    loanType: 'Personal Loan',
    amount: 500000,
    purpose: 'Home Renovation',
    appliedDate: '2025-08-25T00:00:00Z',
    status: 'PENDING'
  },
  {
    id: 2,
    applicantName: 'Priya Sharma',
    applicantEmail: 'priya.sharma@email.com',
    loanType: 'Car Loan',
    amount: 800000,
    purpose: 'Vehicle Purchase',
    appliedDate: '2025-08-26T00:00:00Z',
    status: 'PENDING'
  }
];

const mockStaffRequests = [
  {
    id: 'REQ001',
    employeeName: 'Suresh Patel',
    requestType: 'ACCOUNT_OPENING',
    description: 'Request to open premium account for VIP customer',
    priority: 'HIGH',
    submittedDate: '2025-08-28T00:00:00Z'
  },
  {
    id: 'REQ002',
    employeeName: 'Kavita Reddy',
    requestType: 'ACCESS_LEVEL_INCREASE',
    description: 'Need higher access level for loan processing',
    priority: 'MEDIUM',
    submittedDate: '2025-08-27T00:00:00Z'
  }
];

const mockEmployeePerformance = [
  {
    id: 1,
    name: 'Suresh Patel',
    role: 'Senior Executive',
    performanceScore: 92,
    tasksCompleted: 45,
    status: 'Excellent'
  },
  {
    id: 2,
    name: 'Kavita Reddy',
    role: 'Customer Executive',
    performanceScore: 88,
    tasksCompleted: 38,
    status: 'Good'
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Loan Officer',
    performanceScore: 85,
    tasksCompleted: 35,
    status: 'Good'
  }
];

const mockBranchReports = {
  totalDeposits: 5000000,
  loansApproved: 2000000,
  newAccounts: 125,
  customerSatisfaction: 4.2,
  performanceScore: 85
};

export default ManagerDashboard;
