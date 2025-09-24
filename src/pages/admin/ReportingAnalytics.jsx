import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  PieChart,
  BarChart,
  Download,
  Print,
  Email,
  Schedule,
  Settings,
  Refresh,
  FilterList,
  MoreVert,
  Dashboard as DashboardIcon,
  InsertChart,
  AccountBalance,
  Security,
  People,
  MonetizationOn,
  Timeline,
  Warning,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportingAnalytics = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Report filters
  const [dateRange, setDateRange] = useState('last30days');
  const [branch, setBranch] = useState('all');
  const [reportType, setReportType] = useState('financial');
  
  // Report data
  const [reportData, setReportData] = useState({
    financial: {
      totalTransactions: 25847,
      totalVolume: 12450000,
      averageTransaction: 481.45,
      monthlyGrowth: 12.5,
      dailyTransactions: [120, 145, 132, 167, 189, 203, 176]
    },
    operational: {
      systemUptime: 99.8,
      avgResponseTime: 245,
      apiCalls: 1250000,
      errorRate: 0.2,
      activeUsers: 1847
    },
    compliance: {
      kycCompliance: 98.5,
      amlAlerts: 23,
      suspiciousTransactions: 8,
      regulatoryReports: 156,
      complianceScore: 94.2
    }
  });

  // System health data
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 78,
    database: 41,
    apiGateway: 89
  });

  // Scheduled reports
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'Daily Transaction Summary',
      frequency: 'Daily',
      nextRun: '2024-08-30 06:00',
      recipients: ['admin@obs.com', 'manager@obs.com'],
      status: 'Active',
      lastRun: '2024-08-29 06:00'
    },
    {
      id: 2,
      name: 'Weekly Compliance Report',
      frequency: 'Weekly',
      nextRun: '2024-09-02 09:00',
      recipients: ['compliance@obs.com'],
      status: 'Active',
      lastRun: '2024-08-26 09:00'
    },
    {
      id: 3,
      name: 'Monthly Financial Analysis',
      frequency: 'Monthly',
      nextRun: '2024-09-01 08:00',
      recipients: ['cfo@obs.com', 'finance@obs.com'],
      status: 'Paused',
      lastRun: '2024-08-01 08:00'
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportDialog, setExportDialog] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);

  // Chart data
  const transactionChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Transactions',
        data: reportData.financial.dailyTransactions,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const volumeChartData = {
    labels: ['Deposits', 'Withdrawals', 'Transfers', 'Payments', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
      },
    ],
  };

  const complianceChartData = {
    labels: ['KYC Compliant', 'Pending KYC'],
    datasets: [
      {
        data: [98.5, 1.5],
        backgroundColor: ['#4CAF50', '#FF9800'],
      },
    ],
  };

  const generateReport = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = { 
          success: true, 
          message: 'Report generated successfully',
          data: reportData
        };
      } else {
        response = await apiService.generateReport({
          type: reportType,
          dateRange,
          branch
        });
      }
      
      if (response.success) {
        setSuccess(response.message);
        if (response.data) {
          setReportData(response.data);
        }
      } else {
        setError(response.message || 'Failed to generate report');
      }
    } catch (error) {
      setError(error.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = { 
          success: true, 
          message: `Report exported as ${format.toUpperCase()}`,
          downloadUrl: 'https://example.com/report.pdf'
        };
      } else {
        response = await apiService.exportReport({
          type: reportType,
          format,
          dateRange,
          branch
        });
      }
      
      if (response.success) {
        setSuccess(response.message);
        // In real implementation, would trigger download
        if (response.downloadUrl) {
          window.open(response.downloadUrl, '_blank');
        }
      } else {
        setError(response.message || 'Failed to export report');
      }
    } catch (error) {
      setError(error.message || 'Failed to export report');
    } finally {
      setLoading(false);
      setExportDialog(false);
    }
  };

  const scheduleReport = async (reportConfig) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: 'Report scheduled successfully'
        };
        
        // Add to scheduled reports
        const newReport = {
          id: Date.now(),
          name: reportConfig.name,
          frequency: reportConfig.frequency,
          nextRun: reportConfig.nextRun,
          recipients: reportConfig.recipients,
          status: 'Active',
          lastRun: 'Never'
        };
        setScheduledReports(prev => [...prev, newReport]);
      } else {
        response = await apiService.scheduleReport(reportConfig);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setScheduleDialog(false);
      } else {
        setError(response.message || 'Failed to schedule report');
      }
    } catch (error) {
      setError(error.message || 'Failed to schedule report');
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (value) => {
    if (value >= 80) return 'success';
    if (value >= 60) return 'warning';
    return 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Paused': return 'warning';
      case 'Error': return 'error';
      default: return 'default';
    }
  };

  useEffect(() => {
    generateReport();
  }, [dateRange, branch, reportType]);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Reporting & Analytics</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Schedule />} onClick={() => setScheduleDialog(true)}>
            Schedule Report
          </Button>
          <Button variant="contained" startIcon={<Download />} onClick={() => setExportDialog(true)}>
            Export
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="operational">Operational</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="customer">Customer Analytics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="last7days">Last 7 Days</MenuItem>
                  <MenuItem value="last30days">Last 30 Days</MenuItem>
                  <MenuItem value="last90days">Last 90 Days</MenuItem>
                  <MenuItem value="thisyear">This Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <MenuItem value="all">All Branches</MenuItem>
                  <MenuItem value="main">Main Branch</MenuItem>
                  <MenuItem value="downtown">Downtown Branch</MenuItem>
                  <MenuItem value="suburban">Suburban Branch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={generateReport}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Assessment />}
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Dashboard" />
        <Tab label="Charts" />
        <Tab label="Scheduled Reports" />
        <Tab label="System Health" />
      </Tabs>

      {/* Dashboard Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Financial Metrics */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Transactions
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      {reportData.financial.totalTransactions.toLocaleString()}
                    </Typography>
                  </Box>
                  <TrendingUp color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Volume
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      ${(reportData.financial.totalVolume / 1000000).toFixed(1)}M
                    </Typography>
                  </Box>
                  <MonetizationOn color="success" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Avg Transaction
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      ${reportData.financial.averageTransaction}
                    </Typography>
                  </Box>
                  <BarChart color="info" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Monthly Growth
                    </Typography>
                    <Typography variant="h4" fontWeight={600} color="success.main">
                      +{reportData.financial.monthlyGrowth}%
                    </Typography>
                  </Box>
                  <Timeline color="success" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Reports */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Reports</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Report Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Generated</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Daily Transaction Summary</TableCell>
                        <TableCell>Financial</TableCell>
                        <TableCell>2024-08-29 06:00</TableCell>
                        <TableCell><Chip label="Completed" size="small" color="success" /></TableCell>
                        <TableCell>
                          <IconButton size="small"><Download /></IconButton>
                          <IconButton size="small"><Email /></IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Compliance Audit</TableCell>
                        <TableCell>Compliance</TableCell>
                        <TableCell>2024-08-28 15:30</TableCell>
                        <TableCell><Chip label="Completed" size="small" color="success" /></TableCell>
                        <TableCell>
                          <IconButton size="small"><Download /></IconButton>
                          <IconButton size="small"><Email /></IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer Analytics</TableCell>
                        <TableCell>Analytics</TableCell>
                        <TableCell>2024-08-28 12:00</TableCell>
                        <TableCell><Chip label="Processing" size="small" color="warning" /></TableCell>
                        <TableCell>
                          <CircularProgress size={20} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Charts Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Daily Transaction Volume</Typography>
                <Bar data={transactionChartData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Transaction Types</Typography>
                <Pie data={volumeChartData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>KYC Compliance</Typography>
                <Doughnut data={complianceChartData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Operational Metrics</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box>
                    <Typography variant="body2">System Uptime: {reportData.operational.systemUptime}%</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={reportData.operational.systemUptime} 
                      color="success"
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2">API Response Time: {reportData.operational.avgResponseTime}ms</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.max(0, 100 - (reportData.operational.avgResponseTime / 10))} 
                      color="info"
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2">Error Rate: {reportData.operational.errorRate}%</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={100 - (reportData.operational.errorRate * 50)} 
                      color="warning"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Scheduled Reports Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Scheduled Reports</Typography>
              <Button variant="contained" startIcon={<Schedule />} onClick={() => setScheduleDialog(true)}>
                New Schedule
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Next Run</TableCell>
                    <TableCell>Recipients</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{report.nextRun}</TableCell>
                      <TableCell>{report.recipients.length} recipients</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.status} 
                          size="small" 
                          color={getStatusColor(report.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setSelectedReport(report);
                          }}
                        >
                          <MoreVert />
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

      {/* System Health Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          {Object.entries(systemHealth).map(([component, value]) => (
            <Grid item xs={12} md={4} key={component}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                      {component}
                    </Typography>
                    {value >= 80 ? <CheckCircle color="success" /> : 
                     value >= 60 ? <Warning color="warning" /> : 
                     <ErrorIcon color="error" />}
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={value} 
                    color={getHealthColor(value)}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {value}% Healthy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>Export Report</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Select export format:</Typography>
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Button onClick={() => exportReport('pdf')} startIcon={<Download />}>
              PDF Format
            </Button>
            <Button onClick={() => exportReport('excel')} startIcon={<Download />}>
              Excel Format
            </Button>
            <Button onClick={() => exportReport('csv')} startIcon={<Download />}>
              CSV Format
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialog} onClose={() => setScheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Report</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Report Name"
              placeholder="Enter report name"
            />
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select defaultValue="">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Recipients"
              placeholder="Enter email addresses separated by commas"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => scheduleReport({})}>
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText>Edit Schedule</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Download /></ListItemIcon>
          <ListItemText>Run Now</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><ErrorIcon /></ListItemIcon>
          <ListItemText>Disable</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ReportingAnalytics;
