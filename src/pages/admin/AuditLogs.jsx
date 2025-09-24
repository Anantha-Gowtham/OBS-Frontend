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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Slider,
  Divider,
  Badge,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Visibility,
  Warning,
  Error as ErrorIcon,
  Info,
  Security,
  Person,
  AccountBalance,
  CreditCard,
  Settings,
  ExpandMore,
  Refresh,
  Timeline,
  Assessment,
  CloudDownload,
  Print,
  Email,
  Schedule,
  TrendingUp,
  Shield,
  VpnKey,
  Computer,
  PhoneAndroid
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const AuditLogs = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filters
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    logLevel: 'all',
    category: 'all',
    user: '',
    action: '',
    ipAddress: '',
    page: 1,
    pageSize: 50
  });

  // Audit logs
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 14:32:15',
      user: 'admin@obs.com',
      action: 'LOGIN_SUCCESS',
      category: 'AUTHENTICATION',
      level: 'INFO',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      resource: '/admin/dashboard',
      details: 'Successful admin login'
    },
    {
      id: 2,
      timestamp: '2024-08-29 14:30:42',
      user: 'john.doe@obs.com',
      action: 'ACCOUNT_CREATE',
      category: 'ACCOUNT_MANAGEMENT',
      level: 'INFO',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      resource: '/accounts/create',
      details: 'Created new savings account #ACC789012'
    },
    {
      id: 3,
      timestamp: '2024-08-29 14:28:33',
      user: 'system',
      action: 'TRANSACTION_FLAGGED',
      category: 'FRAUD_DETECTION',
      level: 'WARNING',
      ipAddress: 'internal',
      userAgent: 'System Process',
      resource: '/transactions/monitor',
      details: 'Large transaction flagged for review: $15,000'
    },
    {
      id: 4,
      timestamp: '2024-08-29 14:25:18',
      user: 'unknown',
      action: 'LOGIN_FAILED',
      category: 'AUTHENTICATION',
      level: 'ERROR',
      ipAddress: '203.0.113.45',
      userAgent: 'curl/7.68.0',
      resource: '/auth/login',
      details: 'Failed login attempt - invalid credentials'
    },
    {
      id: 5,
      timestamp: '2024-08-29 14:22:07',
      user: 'manager@obs.com',
      action: 'USER_PERMISSIONS_MODIFIED',
      category: 'USER_MANAGEMENT',
      level: 'INFO',
      ipAddress: '192.168.1.108',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      resource: '/users/permissions',
      details: 'Updated permissions for user: jane.smith@obs.com'
    }
  ]);

  // System logs
  const [systemLogs, setSystemLogs] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 14:35:00',
      service: 'Database',
      level: 'INFO',
      message: 'Connection pool optimized - 50 active connections',
      source: 'PostgreSQL',
      thread: 'pool-manager'
    },
    {
      id: 2,
      timestamp: '2024-08-29 14:33:15',
      service: 'API Gateway',
      level: 'WARNING',
      message: 'Rate limit exceeded for IP 203.0.113.45',
      source: 'nginx',
      thread: 'worker-01'
    },
    {
      id: 3,
      timestamp: '2024-08-29 14:30:42',
      service: 'Authentication',
      level: 'ERROR',
      message: 'JWT token validation failed - expired signature',
      source: 'auth-service',
      thread: 'auth-worker-03'
    },
    {
      id: 4,
      timestamp: '2024-08-29 14:28:30',
      service: 'Backup Service',
      level: 'INFO',
      message: 'Incremental backup completed successfully',
      source: 'backup-daemon',
      thread: 'backup-01'
    }
  ]);

  // Security events
  const [securityEvents, setSecurityEvents] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 14:25:18',
      type: 'BRUTE_FORCE_ATTEMPT',
      severity: 'HIGH',
      source: '203.0.113.45',
      target: 'admin@obs.com',
      status: 'BLOCKED',
      details: '5 failed login attempts in 2 minutes'
    },
    {
      id: 2,
      timestamp: '2024-08-29 14:20:33',
      type: 'SUSPICIOUS_TRANSACTION',
      severity: 'MEDIUM',
      source: 'fraud-detector',
      target: 'Account #ACC789012',
      status: 'FLAGGED',
      details: 'Transaction pattern anomaly detected'
    },
    {
      id: 3,
      timestamp: '2024-08-29 14:15:45',
      type: 'PRIVILEGE_ESCALATION',
      severity: 'CRITICAL',
      source: '192.168.1.150',
      target: 'jane.smith@obs.com',
      status: 'PREVENTED',
      details: 'Unauthorized admin access attempt blocked'
    },
    {
      id: 4,
      timestamp: '2024-08-29 14:10:22',
      type: 'DATA_ACCESS_VIOLATION',
      severity: 'HIGH',
      source: '192.168.1.200',
      target: 'Customer Database',
      status: 'LOGGED',
      details: 'Access to restricted customer data without authorization'
    }
  ]);

  // Configuration
  const [logConfig, setLogConfig] = useState({
    retentionDays: 365,
    logLevel: 'INFO',
    enableRealTime: true,
    enableEncryption: true,
    enableIntegrityCheck: true,
    enableGeoBlocking: false,
    maxFileSize: 100,
    archiveOldLogs: true
  });

  const [detailsDialog, setDetailsDialog] = useState({ open: false, log: null });
  const [exportDialog, setExportDialog] = useState(false);
  const [configDialog, setConfigDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(10);

  const getLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'ERROR': case 'CRITICAL': return 'error';
      case 'WARNING': case 'HIGH': return 'warning';
      case 'INFO': case 'MEDIUM': return 'info';
      case 'DEBUG': case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toUpperCase()) {
      case 'ERROR': case 'CRITICAL': return <ErrorIcon />;
      case 'WARNING': case 'HIGH': return <Warning />;
      case 'INFO': case 'MEDIUM': return <Info />;
      case 'DEBUG': case 'LOW': return <Settings />;
      default: return <Info />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AUTHENTICATION': return <VpnKey />;
      case 'ACCOUNT_MANAGEMENT': return <AccountBalance />;
      case 'FRAUD_DETECTION': return <Shield />;
      case 'USER_MANAGEMENT': return <Person />;
      case 'TRANSACTION': return <CreditCard />;
      default: return <Computer />;
    }
  };

  const searchLogs = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          data: auditLogs,
          totalPages: 10
        };
      } else {
        response = await apiService.searchAuditLogs(filters);
      }
      
      if (response.success) {
        setAuditLogs(response.data);
        setTotalPages(response.totalPages || 10);
      } else {
        setError(response.message || 'Failed to search logs');
      }
    } catch (error) {
      setError(error.message || 'Failed to search logs');
    } finally {
      setLoading(false);
    }
  };

  const exportLogs = async (format, logType) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = { 
          success: true, 
          message: `${logType} logs exported as ${format.toUpperCase()}`,
          downloadUrl: 'https://example.com/logs.csv'
        };
      } else {
        response = await apiService.exportLogs({
          format,
          logType,
          filters
        });
      }
      
      if (response.success) {
        setSuccess(response.message);
        if (response.downloadUrl) {
          window.open(response.downloadUrl, '_blank');
        }
      } else {
        setError(response.message || 'Failed to export logs');
      }
    } catch (error) {
      setError(error.message || 'Failed to export logs');
    } finally {
      setLoading(false);
      setExportDialog(false);
    }
  };

  const saveConfiguration = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: 'Log configuration updated successfully'
        };
      } else {
        response = await apiService.updateLogConfiguration(logConfig);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setConfigDialog(false);
      } else {
        setError(response.message || 'Failed to update configuration');
      }
    } catch (error) {
      setError(error.message || 'Failed to update configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchLogs();
  }, [filters.page]);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Audit & Logs</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Settings />} onClick={() => setConfigDialog(true)}>
            Configure
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={() => setExportDialog(true)}>
            Export
          </Button>
          <Button variant="contained" startIcon={<Refresh />} onClick={searchLogs}>
            Refresh
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Audit Logs" />
        <Tab label="System Logs" />
        <Tab label="Security Events" />
        <Tab label="Configuration" />
      </Tabs>

      {/* Audit Logs Tab */}
      {activeTab === 0 && (
        <Box>
          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date From"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date To"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Level</InputLabel>
                    <Select
                      value={filters.logLevel}
                      onChange={(e) => setFilters({...filters, logLevel: e.target.value})}
                    >
                      <MenuItem value="all">All Levels</MenuItem>
                      <MenuItem value="ERROR">Error</MenuItem>
                      <MenuItem value="WARNING">Warning</MenuItem>
                      <MenuItem value="INFO">Info</MenuItem>
                      <MenuItem value="DEBUG">Debug</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="AUTHENTICATION">Authentication</MenuItem>
                      <MenuItem value="ACCOUNT_MANAGEMENT">Account Management</MenuItem>
                      <MenuItem value="FRAUD_DETECTION">Fraud Detection</MenuItem>
                      <MenuItem value="USER_MANAGEMENT">User Management</MenuItem>
                      <MenuItem value="TRANSACTION">Transaction</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="User"
                    value={filters.user}
                    onChange={(e) => setFilters({...filters, user: e.target.value})}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={searchLogs}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>IP Address</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            {getCategoryIcon(log.category)}
                            {log.category}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={getLevelIcon(log.level)}
                            label={log.level} 
                            size="small" 
                            color={getLevelColor(log.level)}
                          />
                        </TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {log.details}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ open: true, log })}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination 
                  count={totalPages} 
                  page={filters.page}
                  onChange={(e, page) => setFilters({...filters, page})}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* System Logs Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>System Logs</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Thread</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.service}</TableCell>
                      <TableCell>
                        <Chip 
                          icon={getLevelIcon(log.level)}
                          label={log.level} 
                          size="small" 
                          color={getLevelColor(log.level)}
                        />
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>{log.source}</TableCell>
                      <TableCell>{log.thread}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Security Events Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Security Events</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.timestamp}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={event.severity} 
                          size="small" 
                          color={getLevelColor(event.severity)}
                        />
                      </TableCell>
                      <TableCell>{event.source}</TableCell>
                      <TableCell>{event.target}</TableCell>
                      <TableCell>
                        <Chip 
                          label={event.status} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{event.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Configuration Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Log Retention</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Retention Days"
                    type="number"
                    value={logConfig.retentionDays}
                    onChange={(e) => setLogConfig({...logConfig, retentionDays: e.target.value})}
                  />
                  
                  <FormControl fullWidth>
                    <InputLabel>Default Log Level</InputLabel>
                    <Select
                      value={logConfig.logLevel}
                      onChange={(e) => setLogConfig({...logConfig, logLevel: e.target.value})}
                    >
                      <MenuItem value="DEBUG">Debug</MenuItem>
                      <MenuItem value="INFO">Info</MenuItem>
                      <MenuItem value="WARNING">Warning</MenuItem>
                      <MenuItem value="ERROR">Error</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={logConfig.archiveOldLogs}
                        onChange={(e) => setLogConfig({...logConfig, archiveOldLogs: e.target.checked})}
                      />
                    }
                    label="Archive Old Logs"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Security Settings</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={logConfig.enableRealTime}
                        onChange={(e) => setLogConfig({...logConfig, enableRealTime: e.target.checked})}
                      />
                    }
                    label="Real-time Monitoring"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={logConfig.enableEncryption}
                        onChange={(e) => setLogConfig({...logConfig, enableEncryption: e.target.checked})}
                      />
                    }
                    label="Log Encryption"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={logConfig.enableIntegrityCheck}
                        onChange={(e) => setLogConfig({...logConfig, enableIntegrityCheck: e.target.checked})}
                      />
                    }
                    label="Integrity Verification"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={logConfig.enableGeoBlocking}
                        onChange={(e) => setLogConfig({...logConfig, enableGeoBlocking: e.target.checked})}
                      />
                    }
                    label="Geographic Blocking"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button 
                variant="contained" 
                size="large"
                startIcon={<Settings />}
                onClick={saveConfiguration}
                disabled={loading}
              >
                Save Configuration
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Log Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, log: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Log Details</DialogTitle>
        <DialogContent>
          {detailsDialog.log && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Timestamp</Typography>
                  <Typography>{detailsDialog.log.timestamp}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">User</Typography>
                  <Typography>{detailsDialog.log.user}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Action</Typography>
                  <Typography>{detailsDialog.log.action}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Category</Typography>
                  <Typography>{detailsDialog.log.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">IP Address</Typography>
                  <Typography>{detailsDialog.log.ipAddress}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Resource</Typography>
                  <Typography>{detailsDialog.log.resource}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">User Agent</Typography>
                  <Typography>{detailsDialog.log.userAgent}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Details</Typography>
                  <Typography>{detailsDialog.log.details}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, log: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>Export Logs</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Select export format and log type:</Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Button onClick={() => exportLogs('csv', 'audit')} startIcon={<Download />}>
              Audit Logs - CSV
            </Button>
            <Button onClick={() => exportLogs('json', 'audit')} startIcon={<Download />}>
              Audit Logs - JSON
            </Button>
            <Button onClick={() => exportLogs('csv', 'system')} startIcon={<Download />}>
              System Logs - CSV
            </Button>
            <Button onClick={() => exportLogs('csv', 'security')} startIcon={<Download />}>
              Security Events - CSV
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditLogs;
