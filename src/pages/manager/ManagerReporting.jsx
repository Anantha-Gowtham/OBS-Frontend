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
  Checkbox
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Security,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  ExpandMore,
  Visibility,
  GetApp,
  Email,
  Schedule,
  Person,
  AccountBalance,
  MonetizationOn,
  Shield,
  NotificationsActive,
  Business,
  Analytics,
  TableChart,
  BarChart,
  FilterList
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ManagerReporting = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Operational Reports
  const [operationalReports, setOperationalReports] = useState([
    {
      id: 1,
      reportName: 'Daily Transaction Summary',
      reportType: 'OPERATIONAL',
      generatedDate: '2024-08-29 06:00:00',
      period: 'Daily',
      dataPoints: {
        totalTransactions: 15847,
        totalValue: 89456789,
        failedTransactions: 234,
        averageAmount: 5645,
        peakHour: '14:00-15:00'
      },
      status: 'COMPLETED',
      scheduledFor: '2024-08-30 06:00:00',
      recipients: ['branch.manager@obs.com', 'operations@obs.com']
    },
    {
      id: 2,
      reportName: 'Weekly Branch Performance',
      reportType: 'PERFORMANCE',
      generatedDate: '2024-08-26 18:00:00',
      period: 'Weekly',
      dataPoints: {
        newAccounts: 156,
        closedAccounts: 23,
        customerSatisfaction: 87.5,
        staffUtilization: 92,
        revenueGenerated: 2458793
      },
      status: 'COMPLETED',
      scheduledFor: '2024-09-02 18:00:00',
      recipients: ['regional.manager@obs.com', 'branch.manager@obs.com']
    },
    {
      id: 3,
      reportName: 'Monthly Compliance Summary',
      reportType: 'COMPLIANCE',
      generatedDate: '2024-08-25 20:00:00',
      period: 'Monthly',
      dataPoints: {
        kycCompliance: 94.8,
        amlCases: 12,
        regulatorySubmissions: 45,
        trainingCompliance: 98.2,
        auditFindings: 3
      },
      status: 'COMPLETED',
      scheduledFor: '2024-09-25 20:00:00',
      recipients: ['compliance@obs.com', 'audit@obs.com']
    }
  ]);

  // Fraud Alerts
  const [fraudAlerts, setFraudAlerts] = useState([
    {
      id: 1,
      alertId: 'FRD2024-001',
      alertType: 'SUSPICIOUS_TRANSACTION',
      severity: 'HIGH',
      customerName: 'Rajesh Kumar',
      accountNumber: '****5678',
      transactionAmount: 250000,
      riskScore: 85,
      triggerReason: 'Large cash withdrawal outside normal pattern',
      detectedAt: '2024-08-29 14:30:00',
      status: 'INVESTIGATING',
      assignedTo: 'fraud.analyst@obs.com',
      location: 'Mumbai Branch',
      previousIncidents: 0
    },
    {
      id: 2,
      alertId: 'FRD2024-002',
      alertType: 'ACCOUNT_TAKEOVER',
      severity: 'CRITICAL',
      customerName: 'Priya Sharma',
      accountNumber: '****9012',
      transactionAmount: 0,
      riskScore: 95,
      triggerReason: 'Multiple failed login attempts from different locations',
      detectedAt: '2024-08-29 13:45:00',
      status: 'ESCALATED',
      assignedTo: 'security.team@obs.com',
      location: 'Online Banking',
      previousIncidents: 1
    },
    {
      id: 3,
      alertId: 'FRD2024-003',
      alertType: 'CARD_FRAUD',
      severity: 'MEDIUM',
      customerName: 'Amit Singh',
      accountNumber: '****3456',
      transactionAmount: 15000,
      riskScore: 72,
      triggerReason: 'Card used in high-risk merchant category',
      detectedAt: '2024-08-29 12:20:00',
      status: 'RESOLVED',
      assignedTo: 'card.security@obs.com',
      location: 'International Transaction',
      previousIncidents: 0
    }
  ]);

  // Staff Performance
  const [staffPerformance, setStaffPerformance] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Suresh Patel',
      designation: 'Senior Teller',
      department: 'Operations',
      performanceScore: 92,
      transactionsProcessed: 567,
      customerRating: 4.7,
      errorRate: 0.8,
      complianceScore: 96,
      targetAchievement: 105,
      lastReviewDate: '2024-08-15',
      trainingHours: 24
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Kavita Reddy',
      designation: 'Relationship Manager',
      department: 'Sales',
      performanceScore: 88,
      transactionsProcessed: 245,
      customerRating: 4.5,
      errorRate: 1.2,
      complianceScore: 94,
      targetAchievement: 98,
      lastReviewDate: '2024-08-15',
      trainingHours: 18
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Rahul Joshi',
      designation: 'Customer Service Representative',
      department: 'Support',
      performanceScore: 85,
      transactionsProcessed: 389,
      customerRating: 4.3,
      errorRate: 1.5,
      complianceScore: 91,
      targetAchievement: 95,
      lastReviewDate: '2024-08-15',
      trainingHours: 20
    }
  ]);

  const [detailsDialog, setDetailsDialog] = useState({ open: false, item: null, type: '' });
  const [reportDialog, setReportDialog] = useState({ open: false, type: '' });

  const generateReport = async (reportType) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = { 
          success: true, 
          message: `${reportType} report generated successfully`,
          reportUrl: `/reports/${reportType.toLowerCase()}_${Date.now()}.pdf`
        };
      } else {
        response = await apiService.generateManagerReport(reportType);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setReportDialog({ open: false, type: '' });
      } else {
        setError(response.message || 'Failed to generate report');
      }
    } catch (error) {
      setError(error.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const handleFraudAlert = async (alertId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Fraud alert ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setFraudAlerts(prev => prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: action === 'RESOLVE' ? 'RESOLVED' : action === 'ESCALATE' ? 'ESCALATED' : 'INVESTIGATING' }
            : alert
        ));
      } else {
        response = await apiService.processFraudAlert(alertId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} alert`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} alert`);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': case 'RESOLVED': return 'success';
      case 'INVESTIGATING': case 'IN_PROGRESS': return 'warning';
      case 'ESCALATED': case 'CRITICAL': return 'error';
      case 'PENDING': return 'info';
      default: return 'default';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'error';
  };

  // Chart data
  const transactionChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Transaction Volume',
        data: [12000, 19000, 15000, 18000, 22000, 8000, 5000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const performanceChartData = {
    labels: ['Customer Service', 'Transaction Processing', 'Compliance', 'Sales Targets'],
    datasets: [
      {
        label: 'Performance %',
        data: [88, 92, 95, 87],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Reporting & Monitoring
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Operational Reports" />
        <Tab label="Fraud Alerts" />
        <Tab label="Staff Performance" />
        <Tab label="Analytics Dashboard" />
      </Tabs>

      {/* Operational Reports Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Operational Reports
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Assessment />}
                onClick={() => setReportDialog({ open: true, type: 'custom' })}
              >
                Generate Custom Report
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Period</TableCell>
                    <TableCell>Generated Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Key Metrics</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operationalReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reportName}</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.reportType} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.status} 
                          size="small" 
                          color={getStatusColor(report.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          {report.reportType === 'OPERATIONAL' && (
                            <Typography variant="caption">
                              {report.dataPoints.totalTransactions} transactions, 
                              ₹{(report.dataPoints.totalValue / 100000).toFixed(1)}L
                            </Typography>
                          )}
                          {report.reportType === 'PERFORMANCE' && (
                            <Typography variant="caption">
                              {report.dataPoints.newAccounts} new accounts, 
                              {report.dataPoints.customerSatisfaction}% satisfaction
                            </Typography>
                          )}
                          {report.reportType === 'COMPLIANCE' && (
                            <Typography variant="caption">
                              {report.dataPoints.kycCompliance}% KYC compliance, 
                              {report.dataPoints.amlCases} AML cases
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: report, 
                              type: 'report' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <GetApp />
                          </IconButton>
                          <IconButton size="small" color="secondary">
                            <Email />
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

      {/* Fraud Alerts Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Fraud Detection & Alerts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Alert ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Risk Score</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fraudAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.alertId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {alert.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {alert.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={alert.alertType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={alert.severity} 
                          size="small" 
                          color={getSeverityColor(alert.severity)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{alert.riskScore}</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={alert.riskScore} 
                            color={alert.riskScore > 80 ? 'error' : alert.riskScore > 60 ? 'warning' : 'success'}
                            sx={{ width: 60, height: 6 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        {alert.transactionAmount > 0 ? `₹${alert.transactionAmount.toLocaleString()}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={alert.status} 
                          size="small" 
                          color={getStatusColor(alert.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: alert, 
                              type: 'fraud' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {alert.status === 'INVESTIGATING' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleFraudAlert(alert.id, 'RESOLVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleFraudAlert(alert.id, 'ESCALATE')}
                              >
                                <Warning />
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

      {/* Staff Performance Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Staff Performance Monitoring
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Performance Score</TableCell>
                    <TableCell>Transactions</TableCell>
                    <TableCell>Customer Rating</TableCell>
                    <TableCell>Error Rate</TableCell>
                    <TableCell>Target Achievement</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffPerformance.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {staff.employeeName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {staff.designation}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{staff.performanceScore}%</Typography>
                          <Chip 
                            label={staff.performanceScore >= 90 ? 'Excellent' : staff.performanceScore >= 80 ? 'Good' : 'Needs Improvement'} 
                            size="small" 
                            color={getPerformanceColor(staff.performanceScore)}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{staff.transactionsProcessed}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{staff.customerRating}/5</Typography>
                          {'★'.repeat(Math.floor(staff.customerRating))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={staff.errorRate < 1 ? 'success.main' : staff.errorRate < 2 ? 'warning.main' : 'error.main'}
                        >
                          {staff.errorRate}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{staff.targetAchievement}%</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(staff.targetAchievement, 100)} 
                            color={staff.targetAchievement >= 100 ? 'success' : staff.targetAchievement >= 80 ? 'info' : 'warning'}
                            sx={{ width: 60, height: 6 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={() => setDetailsDialog({ 
                            open: true, 
                            item: staff, 
                            type: 'staff' 
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

      {/* Analytics Dashboard Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weekly Transaction Volume
                </Typography>
                <Bar data={transactionChartData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Team Performance Overview
                </Typography>
                <Bar data={performanceChartData} />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <MonetizationOn color="primary" />
                  <Box>
                    <Typography variant="h6">₹2.45Cr</Typography>
                    <Typography variant="caption">Revenue This Month</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Person color="success" />
                  <Box>
                    <Typography variant="h6">156</Typography>
                    <Typography variant="caption">New Customers</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Warning color="warning" />
                  <Box>
                    <Typography variant="h6">3</Typography>
                    <Typography variant="caption">Active Fraud Alerts</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <CheckCircle color="success" />
                  <Box>
                    <Typography variant="h6">94.8%</Typography>
                    <Typography variant="caption">Compliance Rate</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, item: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detailsDialog.type === 'report' && 'Report Details'}
          {detailsDialog.type === 'fraud' && 'Fraud Alert Details'}
          {detailsDialog.type === 'staff' && 'Staff Performance Details'}
        </DialogTitle>
        <DialogContent>
          {detailsDialog.item && detailsDialog.type === 'report' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Report Name</Typography>
                <Typography>{detailsDialog.item.reportName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{detailsDialog.item.reportType}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Key Metrics</Typography>
                <List dense>
                  {Object.entries(detailsDialog.item.dataPoints).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText 
                        primary={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
                        secondary={typeof value === 'number' ? value.toLocaleString() : value}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Recipients</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {detailsDialog.item.recipients.map((recipient, index) => (
                    <Chip key={index} label={recipient} size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'fraud' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Alert ID</Typography>
                <Typography>{detailsDialog.item.alertId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{detailsDialog.item.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Score</Typography>
                <Typography>{detailsDialog.item.riskScore}/100</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Location</Typography>
                <Typography>{detailsDialog.item.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Trigger Reason</Typography>
                <Typography>{detailsDialog.item.triggerReason}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Detected At</Typography>
                <Typography>{new Date(detailsDialog.item.detectedAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Assigned To</Typography>
                <Typography>{detailsDialog.item.assignedTo}</Typography>
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'staff' && (
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
                <Typography variant="subtitle2">Performance Score</Typography>
                <Typography>{detailsDialog.item.performanceScore}%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Compliance Score</Typography>
                <Typography>{detailsDialog.item.complianceScore}%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Transactions Processed</Typography>
                <Typography>{detailsDialog.item.transactionsProcessed}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Training Hours</Typography>
                <Typography>{detailsDialog.item.trainingHours}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer Rating</Typography>
                <Typography>{detailsDialog.item.customerRating}/5</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Error Rate</Typography>
                <Typography>{detailsDialog.item.errorRate}%</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, item: null, type: '' })}>
            Close
          </Button>
          {detailsDialog.item && detailsDialog.type === 'fraud' && detailsDialog.item.status === 'INVESTIGATING' && (
            <>
              <Button 
                color="success" 
                variant="contained"
                onClick={() => handleFraudAlert(detailsDialog.item.id, 'RESOLVE')}
              >
                Resolve Alert
              </Button>
              <Button 
                color="error" 
                variant="outlined"
                onClick={() => handleFraudAlert(detailsDialog.item.id, 'ESCALATE')}
              >
                Escalate
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog 
        open={reportDialog.open} 
        onClose={() => setReportDialog({ open: false, type: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Custom Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select value="" label="Report Type">
                  <MenuItem value="operational">Operational Summary</MenuItem>
                  <MenuItem value="performance">Performance Analysis</MenuItem>
                  <MenuItem value="compliance">Compliance Report</MenuItem>
                  <MenuItem value="fraud">Fraud Analysis</MenuItem>
                  <MenuItem value="staff">Staff Performance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Time Period</InputLabel>
                <Select value="" label="Time Period">
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Include detailed charts and graphs"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Email report to recipients"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialog({ open: false, type: '' })}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => generateReport('CUSTOM')}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Generate Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerReporting;
