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
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  People,
  Assignment,
  CheckCircle,
  Cancel,
  Visibility,
  Edit,
  Delete
} from '@mui/icons-material';

const ManagerDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Mock data for manager dashboard
  const [dashboardData, setDashboardData] = useState({
    summary: {
      totalBranches: 12,
      totalEmployees: 85,
      pendingLoans: 23,
      monthlyRevenue: 2450000
    },
    pendingLoans: [
      {
        id: 'L001',
        customerName: 'John Smith',
        loanType: 'Home Loan',
        amount: 500000,
        appliedDate: '2024-01-15',
        creditScore: 750,
        status: 'Pending Review',
        documents: ['Income Proof', 'Property Papers', 'Bank Statements']
      },
      {
        id: 'L002',
        customerName: 'Sarah Johnson',
        loanType: 'Personal Loan',
        amount: 100000,
        appliedDate: '2024-01-18',
        creditScore: 680,
        status: 'Under Verification',
        documents: ['Income Proof', 'Identity Proof']
      },
      {
        id: 'L003',
        customerName: 'Mike Wilson',
        loanType: 'Business Loan',
        amount: 1000000,
        appliedDate: '2024-01-20',
        creditScore: 720,
        status: 'Pending Review',
        documents: ['Business Registration', 'Financial Statements', 'Collateral Papers']
      }
    ],
    branchReports: [
      {
        branchId: 'BR001',
        branchName: 'Main Branch',
        location: 'Downtown',
        totalAccounts: 1250,
        monthlyTransactions: 5800,
        revenue: 450000,
        employees: 15,
        performance: 92
      },
      {
        branchId: 'BR002',
        branchName: 'East Branch',
        location: 'East District',
        totalAccounts: 980,
        monthlyTransactions: 4200,
        revenue: 320000,
        employees: 12,
        performance: 88
      },
      {
        branchId: 'BR003',
        branchName: 'West Branch',
        location: 'West District',
        totalAccounts: 750,
        monthlyTransactions: 3100,
        revenue: 280000,
        employees: 10,
        performance: 85
      }
    ],
    employees: [
      {
        id: 'EMP001',
        name: 'Alice Cooper',
        position: 'Senior Teller',
        branch: 'Main Branch',
        performance: 95,
        lastLogin: '2024-01-22 09:15',
        status: 'Active',
        tasksCompleted: 145
      },
      {
        id: 'EMP002',
        name: 'Bob Martinez',
        position: 'Loan Officer',
        branch: 'East Branch',
        performance: 88,
        lastLogin: '2024-01-22 08:45',
        status: 'Active',
        tasksCompleted: 98
      },
      {
        id: 'EMP003',
        name: 'Carol Davis',
        position: 'Customer Service',
        branch: 'West Branch',
        performance: 91,
        lastLogin: '2024-01-21 16:30',
        status: 'Offline',
        tasksCompleted: 112
      }
    ]
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoanAction = (loanId, action) => {
    setDashboardData(prev => ({
      ...prev,
      pendingLoans: prev.pendingLoans.map(loan =>
        loan.id === loanId 
          ? { ...loan, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : loan
      )
    }));
    setLoanDialogOpen(false);
  };

  const handleViewLoanDetails = (loan) => {
    setSelectedLoan(loan);
    setLoanDialogOpen(true);
  };

  const handleViewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Under Verification': return 'info';
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'success';
    if (performance >= 80) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Branches</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {dashboardData.summary.totalBranches}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Employees</Typography>
              </Box>
              <Typography variant="h4" color="secondary">
                {dashboardData.summary.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Loans</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {dashboardData.summary.pendingLoans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Monthly Revenue</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                ₹{dashboardData.summary.monthlyRevenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Loan Approvals" />
          <Tab label="Branch Reports" />
          <Tab label="Employee Management" />
        </Tabs>
      </Box>

      {/* Loan Approvals Tab */}
      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Pending Loan Applications
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Loan Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Credit Score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.pendingLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>{loan.id}</TableCell>
                      <TableCell>{loan.customerName}</TableCell>
                      <TableCell>{loan.loanType}</TableCell>
                      <TableCell>₹{loan.amount.toLocaleString()}</TableCell>
                      <TableCell>{loan.appliedDate}</TableCell>
                      <TableCell>{loan.creditScore}</TableCell>
                      <TableCell>
                        <Chip 
                          label={loan.status} 
                          color={getStatusColor(loan.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleViewLoanDetails(loan)}
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

      {/* Branch Reports Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Branch Performance Reports
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Branch ID</TableCell>
                    <TableCell>Branch Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Total Accounts</TableCell>
                    <TableCell>Monthly Transactions</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.branchReports.map((branch) => (
                    <TableRow key={branch.branchId}>
                      <TableCell>{branch.branchId}</TableCell>
                      <TableCell>{branch.branchName}</TableCell>
                      <TableCell>{branch.location}</TableCell>
                      <TableCell>{branch.totalAccounts}</TableCell>
                      <TableCell>{branch.monthlyTransactions}</TableCell>
                      <TableCell>₹{branch.revenue.toLocaleString()}</TableCell>
                      <TableCell>{branch.employees}</TableCell>
                      <TableCell>
                        <Chip 
                          label={`${branch.performance}%`} 
                          color={getPerformanceColor(branch.performance)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Employee Management Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Employee Management
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.branch}</TableCell>
                      <TableCell>
                        <Chip 
                          label={`${employee.performance}%`} 
                          color={getPerformanceColor(employee.performance)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{employee.lastLogin}</TableCell>
                      <TableCell>
                        <Chip 
                          label={employee.status} 
                          color={employee.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary"
                          onClick={() => handleViewEmployeeDetails(employee)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton color="secondary">
                          <Edit />
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

      {/* Loan Details Dialog */}
      <Dialog open={loanDialogOpen} onClose={() => setLoanDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Loan Application Details</DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Loan ID"
                    value={selectedLoan.id}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Customer Name"
                    value={selectedLoan.customerName}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Loan Type"
                    value={selectedLoan.loanType}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Amount"
                    value={`₹${selectedLoan.amount.toLocaleString()}`}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Applied Date"
                    value={selectedLoan.appliedDate}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Credit Score"
                    value={selectedLoan.creditScore}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Documents Submitted:
              </Typography>
              {selectedLoan.documents.map((doc, index) => (
                <Chip key={index} label={doc} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanDialogOpen(false)}>Close</Button>
          {selectedLoan && selectedLoan.status === 'Pending Review' && (
            <>
              <Button 
                onClick={() => handleLoanAction(selectedLoan.id, 'reject')} 
                color="error"
                startIcon={<Cancel />}
              >
                Reject
              </Button>
              <Button 
                onClick={() => handleLoanAction(selectedLoan.id, 'approve')} 
                color="success"
                startIcon={<CheckCircle />}
              >
                Approve
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Employee Details Dialog */}
      <Dialog open={employeeDialogOpen} onClose={() => setEmployeeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box>
              <TextField
                label="Employee ID"
                value={selectedEmployee.id}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Name"
                value={selectedEmployee.name}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Position"
                value={selectedEmployee.position}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Branch"
                value={selectedEmployee.branch}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Performance Score"
                value={`${selectedEmployee.performance}%`}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Tasks Completed"
                value={selectedEmployee.tasksCompleted}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Last Login"
                value={selectedEmployee.lastLogin}
                fullWidth
                disabled
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmployeeDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerDashboard;
