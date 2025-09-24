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
  Alert,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  TrendingUp,
  TrendingDown,
  Schedule,
  Person,
  AttachMoney,
  Assessment,
  Download,
  Print,
  FilterList,
  Search,
  ExpandMore,
  Warning,
  Info,
  Error,
  HomeWork,
  DirectionsCar,
  Business,
  School,
  CreditCard,
  Phone,
  Email,
  LocationOn,
  Work,
  MonetizationOn,
  Gavel,
  ThumbUp,
  ThumbDown,
  Comment,
  History
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LoanApprovals = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);
  const [approvalData, setApprovalData] = useState({
    interestRate: '',
    loanAmount: '',
    tenure: '',
    conditions: '',
    comments: ''
  });

  // Mock loan applications data
  const [loanApplications, setLoanApplications] = useState([
    {
      id: 'LA001',
      applicationId: 'APP2024001',
      customerName: 'John Smith',
      customerId: 'CUST001',
      loanType: 'Home Loan',
      requestedAmount: 2500000,
      purpose: 'Purchase of residential property',
      appliedDate: '2024-01-15',
      status: 'Pending Review',
      priority: 'High',
      creditScore: 780,
      monthlyIncome: 85000,
      existingEMI: 15000,
      employmentType: 'Salaried',
      experience: '5 years',
      assets: 1500000,
      liabilities: 800000,
      collateral: 'Property worth ₹35,00,000',
      documents: [
        { name: 'Income Proof', status: 'Verified' },
        { name: 'Property Papers', status: 'Verified' },
        { name: 'Bank Statements', status: 'Pending' },
        { name: 'Credit Report', status: 'Verified' }
      ],
      contact: {
        phone: '+91-9876543210',
        email: 'john.smith@email.com',
        address: '123 Main Street, Downtown, City - 123456'
      },
      eligibility: {
        score: 85,
        maxAmount: 3000000,
        recommendedAmount: 2200000,
        factors: ['High credit score', 'Stable income', 'Low existing EMI burden']
      },
      riskLevel: 'Low',
      officer: 'Alice Johnson',
      branch: 'Main Branch'
    },
    {
      id: 'LA002',
      applicationId: 'APP2024002',
      customerName: 'Sarah Wilson',
      customerId: 'CUST002',
      loanType: 'Car Loan',
      requestedAmount: 800000,
      purpose: 'Purchase of new car',
      appliedDate: '2024-01-18',
      status: 'Under Verification',
      priority: 'Medium',
      creditScore: 720,
      monthlyIncome: 65000,
      existingEMI: 8000,
      employmentType: 'Salaried',
      experience: '3 years',
      assets: 500000,
      liabilities: 300000,
      collateral: 'Car as collateral',
      documents: [
        { name: 'Salary Slips', status: 'Verified' },
        { name: 'Employment Letter', status: 'Verified' },
        { name: 'Bank Statements', status: 'Verified' },
        { name: 'Vehicle Invoice', status: 'Pending' }
      ],
      contact: {
        phone: '+91-9876543211',
        email: 'sarah.wilson@email.com',
        address: '456 Park Avenue, East District, City - 123457'
      },
      eligibility: {
        score: 75,
        maxAmount: 900000,
        recommendedAmount: 700000,
        factors: ['Good credit score', 'Adequate income', 'Acceptable DTI ratio']
      },
      riskLevel: 'Medium',
      officer: 'Bob Martinez',
      branch: 'East Branch'
    },
    {
      id: 'LA003',
      applicationId: 'APP2024003',
      customerName: 'Mike Davis',
      customerId: 'CUST003',
      loanType: 'Business Loan',
      requestedAmount: 1500000,
      purpose: 'Business expansion',
      appliedDate: '2024-01-20',
      status: 'Pending Review',
      priority: 'High',
      creditScore: 680,
      monthlyIncome: 120000,
      existingEMI: 25000,
      employmentType: 'Self Employed',
      experience: '8 years',
      assets: 2000000,
      liabilities: 1200000,
      collateral: 'Business assets worth ₹25,00,000',
      documents: [
        { name: 'Business Registration', status: 'Verified' },
        { name: 'Financial Statements', status: 'Verified' },
        { name: 'Tax Returns', status: 'Verified' },
        { name: 'Bank Statements', status: 'Verified' }
      ],
      contact: {
        phone: '+91-9876543212',
        email: 'mike.davis@business.com',
        address: '789 Business Park, West District, City - 123458'
      },
      eligibility: {
        score: 70,
        maxAmount: 1800000,
        recommendedAmount: 1200000,
        factors: ['Established business', 'Good cash flow', 'Adequate collateral']
      },
      riskLevel: 'Medium',
      officer: 'Carol Johnson',
      branch: 'West Branch'
    }
  ]);

  const [dashboardStats, setDashboardStats] = useState({
    totalApplications: 23,
    pendingReview: 12,
    approved: 8,
    rejected: 3,
    totalLoanAmount: 15750000,
    averageProcessingTime: '5.2 days'
  });

  const getLoanTypeIcon = (type) => {
    switch (type) {
      case 'Home Loan':
        return <HomeWork />;
      case 'Car Loan':
        return <DirectionsCar />;
      case 'Business Loan':
        return <Business />;
      case 'Education Loan':
        return <School />;
      case 'Personal Loan':
        return <Person />;
      default:
        return <MonetizationOn />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review':
        return 'warning';
      case 'Under Verification':
        return 'info';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredApplications = loanApplications.filter(loan => {
    const matchesStatus = filterStatus === 'all' || loan.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleLoanAction = async (loanId, action, data = {}) => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoanApplications(prev => 
        prev.map(loan => 
          loan.id === loanId 
            ? { 
                ...loan, 
                status: action === 'approve' ? 'Approved' : 'Rejected',
                ...data
              }
            : loan
        )
      );

      setApprovalDialog(false);
      setRejectionDialog(false);
      setDetailsOpen(false);
    } catch (err) {
      console.error('Error processing loan action:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Loan Approvals
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Review and approve loan applications from customers
        </Typography>
      </Box>

      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Applications
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {dashboardStats.totalApplications}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assessment />
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
                    Pending Review
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="warning.main">
                    {dashboardStats.pendingReview}
                  </Typography>
                </Box>
                <Badge badgeContent={dashboardStats.pendingReview} color="warning">
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
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
                    Approved This Month
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="success.main">
                    {dashboardStats.approved}
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
                    Total Loan Amount
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    ₹{(dashboardStats.totalLoanAmount / 1000000).toFixed(1)}M
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Filter by Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Applications</MenuItem>
                  <MenuItem value="pending">Pending Review</MenuItem>
                  <MenuItem value="verification">Under Verification</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button variant="outlined" startIcon={<Download />}>
                  Export
                </Button>
                <Button variant="outlined" startIcon={<Print />}>
                  Print
                </Button>
                <Button variant="outlined" startIcon={<FilterList />}>
                  Advanced Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loan Applications Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loan Applications ({filteredApplications.length})
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Loan Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((loan) => (
                  <TableRow key={loan.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {loan.applicationId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                          {loan.customerName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {loan.customerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {loan.customerId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getLoanTypeIcon(loan.loanType)}
                        <Typography variant="body2">
                          {loan.loanType}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        ₹{loan.requestedAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {loan.appliedDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={loan.status}
                        color={getStatusColor(loan.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={loan.priority}
                        color={getPriorityColor(loan.priority)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={loan.riskLevel}
                        color={getRiskColor(loan.riskLevel)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedLoan(loan);
                              setDetailsOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        {loan.status === 'Pending Review' && (
                          <>
                            <Tooltip title="Approve">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => {
                                  setSelectedLoan(loan);
                                  setApprovalDialog(true);
                                }}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  setSelectedLoan(loan);
                                  setRejectionDialog(true);
                                }}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
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

      {/* Loan Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Loan Application Details - {selectedLoan?.applicationId}
            </Typography>
            <Chip
              label={selectedLoan?.status}
              color={getStatusColor(selectedLoan?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Grid container spacing={3}>
              {/* Customer Information */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Customer Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText 
                          primary="Name" 
                          secondary={selectedLoan.customerName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CreditCard /></ListItemIcon>
                        <ListItemText 
                          primary="Customer ID" 
                          secondary={selectedLoan.customerId}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Phone /></ListItemIcon>
                        <ListItemText 
                          primary="Phone" 
                          secondary={selectedLoan.contact.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Email /></ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary={selectedLoan.contact.email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><LocationOn /></ListItemIcon>
                        <ListItemText 
                          primary="Address" 
                          secondary={selectedLoan.contact.address}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Loan Information */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Loan Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>{getLoanTypeIcon(selectedLoan.loanType)}</ListItemIcon>
                        <ListItemText 
                          primary="Loan Type" 
                          secondary={selectedLoan.loanType}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AttachMoney /></ListItemIcon>
                        <ListItemText 
                          primary="Requested Amount" 
                          secondary={`₹${selectedLoan.requestedAmount.toLocaleString()}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Info /></ListItemIcon>
                        <ListItemText 
                          primary="Purpose" 
                          secondary={selectedLoan.purpose}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Schedule /></ListItemIcon>
                        <ListItemText 
                          primary="Applied Date" 
                          secondary={selectedLoan.appliedDate}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Work /></ListItemIcon>
                        <ListItemText 
                          primary="Loan Officer" 
                          secondary={selectedLoan.officer}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Financial Information */}
              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Financial Assessment
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Credit Score
                          </Typography>
                          <Typography variant="h4" color="primary">
                            {selectedLoan.creditScore}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Monthly Income
                          </Typography>
                          <Typography variant="h6">
                            ₹{selectedLoan.monthlyIncome.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Existing EMI
                          </Typography>
                          <Typography variant="h6">
                            ₹{selectedLoan.existingEMI.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Eligibility Score
                          </Typography>
                          <Typography variant="h4" color="success.main">
                            {selectedLoan.eligibility.score}%
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Documents */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Documents
                    </Typography>
                    <List dense>
                      {selectedLoan.documents.map((doc, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={doc.name}
                            secondary={
                              <Chip
                                label={doc.status}
                                size="small"
                                color={doc.status === 'Verified' ? 'success' : 'warning'}
                                variant="outlined"
                              />
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Eligibility Factors */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Eligibility Assessment
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Recommended Amount: ₹{selectedLoan.eligibility.recommendedAmount.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Maximum Amount: ₹{selectedLoan.eligibility.maxAmount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Key Factors:
                    </Typography>
                    {selectedLoan.eligibility.factors.map((factor, index) => (
                      <Typography key={index} variant="body2" color="text.secondary">
                        • {factor}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          {selectedLoan?.status === 'Pending Review' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  setDetailsOpen(false);
                  setRejectionDialog(true);
                }}
                startIcon={<Cancel />}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setDetailsOpen(false);
                  setApprovalDialog(true);
                }}
                startIcon={<CheckCircle />}
              >
                Approve
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle color="success" />
            Approve Loan Application
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Approved Amount"
                fullWidth
                value={approvalData.loanAmount}
                onChange={(e) => setApprovalData(prev => ({ ...prev, loanAmount: e.target.value }))}
                placeholder={selectedLoan?.requestedAmount.toString()}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Interest Rate (%)"
                fullWidth
                value={approvalData.interestRate}
                onChange={(e) => setApprovalData(prev => ({ ...prev, interestRate: e.target.value }))}
                placeholder="8.5"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tenure (Years)"
                fullWidth
                value={approvalData.tenure}
                onChange={(e) => setApprovalData(prev => ({ ...prev, tenure: e.target.value }))}
                placeholder="20"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Special Conditions"
                fullWidth
                multiline
                rows={3}
                value={approvalData.conditions}
                onChange={(e) => setApprovalData(prev => ({ ...prev, conditions: e.target.value }))}
                placeholder="Any special terms or conditions..."
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Comments"
                fullWidth
                multiline
                rows={2}
                value={approvalData.comments}
                onChange={(e) => setApprovalData(prev => ({ ...prev, comments: e.target.value }))}
                placeholder="Additional comments..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleLoanAction(selectedLoan?.id, 'approve', approvalData)}
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : <CheckCircle />}
          >
            {actionLoading ? 'Approving...' : 'Approve Loan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialog} onClose={() => setRejectionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cancel color="error" />
            Reject Loan Application
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            This action will reject the loan application. Please provide a reason.
          </Alert>
          <TextField
            label="Rejection Reason"
            fullWidth
            multiline
            rows={4}
            placeholder="Please provide detailed reason for rejection..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectionDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleLoanAction(selectedLoan?.id, 'reject')}
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : <Cancel />}
          >
            {actionLoading ? 'Rejecting...' : 'Reject Loan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoanApprovals;
