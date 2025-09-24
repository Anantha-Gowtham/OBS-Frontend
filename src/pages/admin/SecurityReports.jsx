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
  Security,
  Warning,
  Error,
  CheckCircle,
  Shield,
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
  Verified,
  Report,
  Assessment,
  Timeline,
  TrendingUp,
  TrendingDown,
  Person,
  Business,
  LocationOn,
  CalendarToday,
  Schedule,
  Notifications,
  Email,
  Phone,
  Settings,
  Download,
  Print,
  Search,
  FilterList,
  Refresh,
  MoreVert,
  Add,
  Edit,
  Delete,
  Block,
  VpnKey,
  AdminPanelSettings,
  SupervisorAccount,
  AccountCircle,
  CreditCard,
  AccountBalance,
  Info,
  FileDownload,
  Send,
  Backup,
  RestoreFromTrash,
  Computer,
  Smartphone,
  Tablet,
  DeviceUnknown,
  Language,
  Router,
  Dns,
  NetworkCheck,
  Traffic,
  Speed,
  MonitorHeart,
  BugReport,
  Gavel,
  PolicyOutlined,
  VerifiedUser,
  EnhancedEncryption,
  Https,
  Public,
  PrivateConnectivity,
  CorporateFare,
  Flag,
  Campaign,
  NotificationImportant,
  SevereCold,
  Thermostat,
  Analytics,
  BarChart,
  PieChart,
  DonutLarge,
  ExpandMore,
  ThumbUp,
  ThumbDown,
  CompareArrows,
  TrendingFlat,
  EventNote,
  Today,
  DateRange,
  AccessTime,
  Timelapse,
  History,
  Update,
  CloudUpload,
  CloudDownload,
  Storage,
  Memory,
  DeveloperBoard,
  PowerSettingsNew,
  SignalWifiStatusbarConnectedNoInternet4,
  SignalWifi4Bar,
  WifiOff
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const SecurityReports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Security dashboard data
  const [securityStats, setSecurityStats] = useState({
    totalThreats: 127,
    activeThreatsMitigated: 89,
    criticalAlerts: 8,
    securityScore: 85,
    lastScanTime: '2024-01-22 10:45:00',
    systemUptime: '99.8%',
    failedLogins: 234,
    suspiciousActivities: 45,
    blockedIPs: 156,
    quarantinedFiles: 23,
    patchCompliance: 92,
    backupStatus: 'Healthy',
    firewallStatus: 'Active',
    antivirusStatus: 'Up to date',
    intrusionDetection: 'Active',
    dataEncryption: 'AES-256'
  });

  const [securityIncidents, setSecurityIncidents] = useState([
    {
      id: 'INC001',
      title: 'Multiple Failed Login Attempts',
      description: 'User account CUST002 exceeded failed login threshold',
      severity: 'High',
      category: 'Authentication',
      status: 'Investigating',
      timestamp: '2024-01-22 10:30:00',
      affectedUser: 'sarah.johnson@email.com',
      sourceIP: '192.168.1.105',
      actions: ['Account Locked', 'IP Blocked'],
      assignedTo: 'Security Team',
      evidence: ['Login logs', 'IP trace', 'User behavior analysis'],
      resolution: null,
      impact: 'Low'
    },
    {
      id: 'INC002',
      title: 'Suspicious Transaction Pattern',
      description: 'Unusual transaction frequency detected for account ACC12345',
      severity: 'Critical',
      category: 'Fraud Detection',
      status: 'Resolved',
      timestamp: '2024-01-22 09:15:00',
      affectedUser: 'john.doe@email.com',
      sourceIP: '203.45.67.89',
      actions: ['Transaction Blocked', 'Account Frozen', 'Customer Contacted'],
      assignedTo: 'Fraud Team',
      evidence: ['Transaction logs', 'Behavioral analysis', 'Device fingerprint'],
      resolution: 'Customer confirmed legitimate transactions via secure channel',
      impact: 'Medium'
    },
    {
      id: 'INC003',
      title: 'Potential Data Breach Attempt',
      description: 'Unauthorized access attempt to customer database',
      severity: 'Critical',
      category: 'Data Security',
      status: 'Mitigated',
      timestamp: '2024-01-22 08:45:00',
      affectedUser: 'System',
      sourceIP: '94.23.15.77',
      actions: ['IP Blocked', 'Database Access Restricted', 'Audit Initiated'],
      assignedTo: 'Security Team',
      evidence: ['Access logs', 'Network traffic', 'Database queries'],
      resolution: 'Attack vectors blocked, no data compromised',
      impact: 'High'
    },
    {
      id: 'INC004',
      title: 'Malware Detection',
      description: 'Trojan detected in employee workstation',
      severity: 'Medium',
      category: 'Malware',
      status: 'Resolved',
      timestamp: '2024-01-22 07:20:00',
      affectedUser: 'alice.cooper@obs.com',
      sourceIP: '192.168.2.45',
      actions: ['File Quarantined', 'System Scan', 'User Notified'],
      assignedTo: 'IT Security',
      evidence: ['Antivirus logs', 'File hash', 'Network connections'],
      resolution: 'Malware removed, system cleaned and secured',
      impact: 'Low'
    },
    {
      id: 'INC005',
      title: 'Unauthorized Access Attempt',
      description: 'Multiple attempts to access admin panel from external IP',
      severity: 'High',
      category: 'Access Control',
      status: 'Monitoring',
      timestamp: '2024-01-22 06:30:00',
      affectedUser: 'Admin Portal',
      sourceIP: '45.76.123.89',
      actions: ['IP Blocked', 'Access Denied', 'Increased Monitoring'],
      assignedTo: 'Security Team',
      evidence: ['Access logs', 'Geolocation data', 'Attack patterns'],
      resolution: null,
      impact: 'Medium'
    }
  ]);

  const [systemLogs, setSystemLogs] = useState([
    {
      id: 'LOG001',
      timestamp: '2024-01-22 10:45:15',
      level: 'INFO',
      category: 'Authentication',
      message: 'User admin@obs.com logged in successfully',
      source: 'Auth Service',
      details: 'IP: 192.168.1.10, Browser: Chrome 120.0.0.0'
    },
    {
      id: 'LOG002',
      timestamp: '2024-01-22 10:44:32',
      level: 'WARNING',
      category: 'Security',
      message: 'Failed login attempt for user john.manager@obs.com',
      source: 'Auth Service',
      details: 'IP: 192.168.1.25, Attempts: 3/5'
    },
    {
      id: 'LOG003',
      timestamp: '2024-01-22 10:43:18',
      level: 'ERROR',
      category: 'System',
      message: 'Database connection timeout',
      source: 'Database Service',
      details: 'Connection pool exhausted, retrying...'
    },
    {
      id: 'LOG004',
      timestamp: '2024-01-22 10:42:05',
      level: 'INFO',
      category: 'Transaction',
      message: 'Large transaction processed successfully',
      source: 'Transaction Service',
      details: 'Amount: $50,000, Account: ACC12345'
    },
    {
      id: 'LOG005',
      timestamp: '2024-01-22 10:41:47',
      level: 'WARNING',
      category: 'Network',
      message: 'High network latency detected',
      source: 'Network Monitor',
      details: 'Latency: 250ms, Threshold: 200ms'
    }
  ]);

  const [complianceReports, setComplianceReports] = useState([
    {
      id: 'COMP001',
      name: 'PCI DSS Compliance Report',
      status: 'Compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      score: 98,
      requirements: 12,
      compliantRequirements: 12,
      findings: 0,
      recommendations: 2
    },
    {
      id: 'COMP002',
      name: 'SOX Compliance Report',
      status: 'Compliant',
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      score: 95,
      requirements: 18,
      compliantRequirements: 17,
      findings: 1,
      recommendations: 3
    },
    {
      id: 'COMP003',
      name: 'GDPR Compliance Report',
      status: 'Partially Compliant',
      lastAudit: '2024-01-20',
      nextAudit: '2024-04-20',
      score: 87,
      requirements: 15,
      compliantRequirements: 13,
      findings: 2,
      recommendations: 5
    },
    {
      id: 'COMP004',
      name: 'ISO 27001 Security Assessment',
      status: 'Compliant',
      lastAudit: '2024-01-08',
      nextAudit: '2024-07-08',
      score: 92,
      requirements: 25,
      compliantRequirements: 23,
      findings: 2,
      recommendations: 4
    }
  ]);

  const [vulnerabilityScans, setVulnerabilityScans] = useState([
    {
      id: 'SCAN001',
      name: 'Network Infrastructure Scan',
      type: 'Network',
      status: 'Completed',
      lastRun: '2024-01-22 02:00:00',
      duration: '2h 15m',
      hostsScanned: 245,
      vulnerabilities: {
        critical: 2,
        high: 5,
        medium: 12,
        low: 18,
        info: 34
      },
      score: 7.2
    },
    {
      id: 'SCAN002',
      name: 'Web Application Security Scan',
      type: 'Application',
      status: 'In Progress',
      lastRun: '2024-01-22 10:30:00',
      duration: '45m',
      hostsScanned: 8,
      vulnerabilities: {
        critical: 0,
        high: 2,
        medium: 8,
        low: 15,
        info: 22
      },
      score: 8.5
    },
    {
      id: 'SCAN003',
      name: 'Database Security Assessment',
      type: 'Database',
      status: 'Scheduled',
      lastRun: '2024-01-21 23:00:00',
      duration: '1h 30m',
      hostsScanned: 12,
      vulnerabilities: {
        critical: 1,
        high: 3,
        medium: 7,
        low: 11,
        info: 19
      },
      score: 8.8
    }
  ]);

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const severityLevels = ['Critical', 'High', 'Medium', 'Low', 'Info'];
  const categories = ['Authentication', 'Fraud Detection', 'Data Security', 'Malware', 'Access Control', 'Network', 'System', 'Transaction'];
  const logLevels = ['ERROR', 'WARNING', 'INFO', 'DEBUG'];

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
      case 'compliant':
      case 'completed':
        return 'success';
      case 'investigating':
      case 'monitoring':
      case 'in progress':
        return 'warning';
      case 'mitigated':
      case 'partially compliant':
        return 'info';
      case 'scheduled':
        return 'default';
      default:
        return 'default';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'debug':
        return 'default';
      default:
        return 'default';
    }
  };

  const getSecurityScore = () => {
    const score = securityStats.securityScore;
    if (score >= 90) return { color: 'success', status: 'Excellent' };
    if (score >= 80) return { color: 'info', status: 'Good' };
    if (score >= 70) return { color: 'warning', status: 'Fair' };
    return { color: 'error', status: 'Poor' };
  };

  const filteredIncidents = securityIncidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchesCategory = filterCategory === 'all' || incident.category === filterCategory;
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const paginatedIncidents = filteredIncidents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate data refresh
      setSecurityStats(prev => ({
        ...prev,
        lastScanTime: new Date().toLocaleString(),
        totalThreats: prev.totalThreats + Math.floor(Math.random() * 5),
        activeThreatsMitigated: prev.activeThreatsMitigated + Math.floor(Math.random() * 3)
      }));
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleExportReport = (reportType) => {
    // Simulate report export
    const filename = `security_report_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`;
    console.log(`Exporting ${filename}`);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Security Reports & Monitoring
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Comprehensive security dashboard and incident management system
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={selectedTimeRange}
              label="Time Range"
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
            }
            label="Auto Refresh"
          />
          <Button
            variant="outlined"
            startIcon={refreshing ? <CircularProgress size={20} /> : <Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => handleExportReport('comprehensive')}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Security Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Security Score */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Security Score
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color={getSecurityScore().color + '.main'}>
                    {securityStats.securityScore}%
                  </Typography>
                  <Typography variant="caption" color={getSecurityScore().color + '.main'}>
                    {getSecurityScore().status}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: getSecurityScore().color + '.main' }}>
                  <Shield />
                </Avatar>
              </Box>
              <LinearProgress
                variant="determinate"
                value={securityStats.securityScore}
                color={getSecurityScore().color}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Active Threats */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Threats
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="warning.main">
                    {securityStats.totalThreats}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {securityStats.activeThreatsMitigated} Mitigated
                  </Typography>
                </Box>
                <Badge badgeContent={securityStats.criticalAlerts} color="error">
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <Warning />
                  </Avatar>
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Uptime */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    System Uptime
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="success.main">
                    {securityStats.systemUptime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last 30 days
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <MonitorHeart />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Failed Logins */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Failed Logins
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="error.main">
                    {securityStats.failedLogins}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last 24 hours
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Block />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Status Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Security Systems Status</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                      <Security />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>Firewall</Typography>
                    <Chip label={securityStats.firewallStatus} color="success" size="small" />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                      <Shield />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>Antivirus</Typography>
                    <Chip label={securityStats.antivirusStatus} color="success" size="small" />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 1 }}>
                      <NetworkCheck />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>IDS/IPS</Typography>
                    <Chip label={securityStats.intrusionDetection} color="info" size="small" />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1 }}>
                      <EnhancedEncryption />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>Encryption</Typography>
                    <Chip label={securityStats.dataEncryption} color="warning" size="small" />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Security Metrics</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Block color="error" /></ListItemIcon>
                  <ListItemText 
                    primary={`${securityStats.blockedIPs} IPs Blocked`}
                    secondary="Automatic threat mitigation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><BugReport color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary={`${securityStats.quarantinedFiles} Files Quarantined`}
                    secondary="Malware detection system"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VerifiedUser color="success" /></ListItemIcon>
                  <ListItemText 
                    primary={`${securityStats.patchCompliance}% Patch Compliance`}
                    secondary="System vulnerability management"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Backup color="info" /></ListItemIcon>
                  <ListItemText 
                    primary={`Backup: ${securityStats.backupStatus}`}
                    secondary="Data protection status"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Security Incidents" />
            <Tab label="System Logs" />
            <Tab label="Vulnerability Scans" />
            <Tab label="Compliance Reports" />
            <Tab label="Threat Intelligence" />
          </Tabs>

          {/* Security Incidents Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Severity</InputLabel>
                    <Select
                      value={filterSeverity}
                      label="Severity"
                      onChange={(e) => setFilterSeverity(e.target.value)}
                    >
                      <MenuItem value="all">All Severities</MenuItem>
                      {severityLevels.map(severity => (
                        <MenuItem key={severity} value={severity}>{severity}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={filterCategory}
                      label="Category"
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
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
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Incident ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedIncidents.map((incident) => (
                    <TableRow key={incident.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {incident.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {incident.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {incident.description.length > 50 
                            ? `${incident.description.substring(0, 50)}...` 
                            : incident.description
                          }
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.severity}
                          color={getSeverityColor(incident.severity)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {incident.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={incident.status}
                          color={getStatusColor(incident.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(incident.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedReport(incident);
                                setReportDialogOpen(true);
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
                          <IconButton size="small">
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
              count={filteredIncidents.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </TabPanel>

          {/* System Logs Tab */}
          <TabPanel value={activeTab} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id} hover>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(log.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={log.level}
                          color={getLogLevelColor(log.level)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {log.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {log.message}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {log.source}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {log.details}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Vulnerability Scans Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3}>
              {vulnerabilityScans.map((scan) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={scan.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {scan.name}
                        </Typography>
                        <Chip
                          label={scan.status}
                          color={getStatusColor(scan.status)}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Type: {scan.type}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Last Run: {new Date(scan.lastRun).toLocaleString()}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Duration: {scan.duration}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Hosts Scanned: {scan.hostsScanned}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Security Score: 
                          <Chip 
                            label={scan.score} 
                            color={scan.score >= 8 ? 'success' : scan.score >= 6 ? 'warning' : 'error'}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="body2" gutterBottom>Vulnerabilities:</Typography>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 6 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Critical:</Typography>
                            <Chip label={scan.vulnerabilities.critical} color="error" size="small" />
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">High:</Typography>
                            <Chip label={scan.vulnerabilities.high} color="warning" size="small" />
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Medium:</Typography>
                            <Chip label={scan.vulnerabilities.medium} color="info" size="small" />
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Low:</Typography>
                            <Chip label={scan.vulnerabilities.low} color="success" size="small" />
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" fullWidth>
                          View Report
                        </Button>
                        <Button size="small" variant="outlined" fullWidth>
                          Rescan
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Compliance Reports Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              {complianceReports.map((report) => (
                <Grid size={{ xs: 12, md: 6 }} key={report.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {report.name}
                        </Typography>
                        <Chip
                          label={report.status}
                          color={getStatusColor(report.status)}
                          size="small"
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Compliance Score
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h4" fontWeight={600} color={report.score >= 90 ? 'success.main' : report.score >= 70 ? 'warning.main' : 'error.main'}>
                            {report.score}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={report.score}
                            color={report.score >= 90 ? 'success' : report.score >= 70 ? 'warning' : 'error'}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Requirements
                          </Typography>
                          <Typography variant="h6">
                            {report.compliantRequirements}/{report.requirements}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography variant="body2" color="text.secondary">
                            Findings
                          </Typography>
                          <Typography variant="h6" color={report.findings > 0 ? 'warning.main' : 'success.main'}>
                            {report.findings}
                          </Typography>
                        </Grid>
                      </Grid>

                      <List dense>
                        <ListItem>
                          <ListItemIcon><CalendarToday /></ListItemIcon>
                          <ListItemText 
                            primary="Last Audit" 
                            secondary={report.lastAudit}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Schedule /></ListItemIcon>
                          <ListItemText 
                            primary="Next Audit" 
                            secondary={report.nextAudit}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Assessment /></ListItemIcon>
                          <ListItemText 
                            primary="Recommendations" 
                            secondary={`${report.recommendations} items`}
                          />
                        </ListItem>
                      </List>

                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" fullWidth startIcon={<Download />}>
                          Download Report
                        </Button>
                        <Button size="small" variant="outlined" fullWidth startIcon={<Visibility />}>
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Threat Intelligence Tab */}
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Global Threat Landscape</Typography>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Elevated threat level detected in banking sector
                    </Alert>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Warning color="error" /></ListItemIcon>
                        <ListItemText 
                          primary="Banking Trojan Campaign"
                          secondary="New variant targeting financial institutions"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Security color="warning" /></ListItemIcon>
                        <ListItemText 
                          primary="Phishing Attacks Increased"
                          secondary="15% spike in credential harvesting attempts"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Shield color="info" /></ListItemIcon>
                        <ListItemText 
                          primary="CVE-2024-1234 Critical"
                          secondary="Remote code execution vulnerability discovered"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Threat Intelligence Feeds</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                        <ListItemText 
                          primary="FBI Threat Feed"
                          secondary="Last updated: 2 minutes ago"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                        <ListItemText 
                          primary="CISA Cybersecurity Alerts"
                          secondary="Last updated: 5 minutes ago"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                        <ListItemText 
                          primary="Commercial Threat Intel"
                          secondary="Last updated: 1 minute ago"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Warning color="warning" /></ListItemIcon>
                        <ListItemText 
                          primary="Internal Threat Analysis"
                          secondary="Processing new indicators..."
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Recent Threat Indicators</Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Indicator</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Threat Level</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>First Seen</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>185.220.101.42</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>
                              <Chip label="High" color="warning" size="small" />
                            </TableCell>
                            <TableCell>OSINT Feed</TableCell>
                            <TableCell>2 hours ago</TableCell>
                            <TableCell>
                              <Button size="small" variant="outlined">Block</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>malware.example.com</TableCell>
                            <TableCell>Domain</TableCell>
                            <TableCell>
                              <Chip label="Critical" color="error" size="small" />
                            </TableCell>
                            <TableCell>FBI Feed</TableCell>
                            <TableCell>4 hours ago</TableCell>
                            <TableCell>
                              <Button size="small" variant="contained" color="error">Blocked</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>a1b2c3d4e5f6...</TableCell>
                            <TableCell>File Hash</TableCell>
                            <TableCell>
                              <Chip label="Medium" color="info" size="small" />
                            </TableCell>
                            <TableCell>VirusTotal</TableCell>
                            <TableCell>6 hours ago</TableCell>
                            <TableCell>
                              <Button size="small" variant="outlined">Monitor</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Incident Details Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Incident Details - {selectedReport?.id}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={selectedReport?.severity}
                color={getSeverityColor(selectedReport?.severity)}
              />
              <Chip
                label={selectedReport?.status}
                color={getStatusColor(selectedReport?.status)}
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Incident Information</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Title" secondary={selectedReport.title} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Description" secondary={selectedReport.description} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Category" secondary={selectedReport.category} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Impact Level" secondary={selectedReport.impact} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Assigned To" secondary={selectedReport.assignedTo} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Technical Details</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Affected User" secondary={selectedReport.affectedUser} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Source IP" secondary={selectedReport.sourceIP} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Timestamp" secondary={new Date(selectedReport.timestamp).toLocaleString()} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Actions Taken</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {selectedReport.actions.map((action, index) => (
                        <Chip key={index} label={action} color="primary" variant="outlined" />
                      ))}
                    </Box>
                    
                    <Typography variant="h6" gutterBottom>Evidence</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {selectedReport.evidence.map((item, index) => (
                        <Chip key={index} label={item} color="info" variant="outlined" />
                      ))}
                    </Box>

                    {selectedReport.resolution && (
                      <>
                        <Typography variant="h6" gutterBottom>Resolution</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedReport.resolution}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Close</Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<Edit />}>
            Update Incident
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SecurityReports;
