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
  Divider,
  CircularProgress,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  ExpandMore,
  Settings,
  Save,
  Refresh,
  PlayArrow,
  Stop,
  Schedule,
  IntegrationInstructions,
  Security,
  Update,
  Storage,
  CloudSync,
  Notifications,
  Edit,
  Delete,
  Add
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const SystemConfiguration = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    bankName: 'OBS Banking System',
    timezone: 'UTC',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    sessionTimeout: 30,
    maxLoginAttempts: 3,
    passwordExpiryDays: 90,
    maintenanceMode: false,
    apiRateLimit: 1000,
    backupRetentionDays: 30
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    mfaEnabled: true,
    sslEnforced: true,
    passwordComplexity: 'HIGH',
    ipWhitelisting: false,
    sessionEncryption: true,
    auditLogging: true,
    fraudDetection: true,
    encryptionStrength: 'AES-256'
  });

  // Integrations
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Payment Gateway - Stripe',
      type: 'PAYMENT',
      status: 'ACTIVE',
      lastSync: '2024-08-29 10:00:00',
      health: 'HEALTHY',
      apiKey: 'sk_live_...',
      webhookUrl: 'https://api.stripe.com/webhooks'
    },
    {
      id: 2,
      name: 'Credit Bureau - Experian',
      type: 'CREDIT_CHECK',
      status: 'ACTIVE',
      lastSync: '2024-08-29 09:30:00',
      health: 'HEALTHY',
      apiKey: 'exp_...',
      webhookUrl: 'https://api.experian.com/webhooks'
    },
    {
      id: 3,
      name: 'KYC Provider - Jumio',
      type: 'KYC',
      status: 'INACTIVE',
      lastSync: '2024-08-28 15:00:00',
      health: 'ERROR',
      apiKey: 'jum_...',
      webhookUrl: 'https://api.jumio.com/webhooks'
    }
  ]);

  // Batch jobs
  const [batchJobs, setBatchJobs] = useState([
    {
      id: 1,
      name: 'Daily Interest Calculation',
      schedule: '0 2 * * *',
      status: 'RUNNING',
      lastRun: '2024-08-29 02:00:00',
      nextRun: '2024-08-30 02:00:00',
      duration: '15 minutes',
      success: true
    },
    {
      id: 2,
      name: 'Monthly Statement Generation',
      schedule: '0 1 1 * *',
      status: 'SCHEDULED',
      lastRun: '2024-08-01 01:00:00',
      nextRun: '2024-09-01 01:00:00',
      duration: '2 hours',
      success: true
    },
    {
      id: 3,
      name: 'Backup Process',
      schedule: '0 0 * * 0',
      status: 'SCHEDULED',
      lastRun: '2024-08-25 00:00:00',
      nextRun: '2024-09-01 00:00:00',
      duration: '1 hour',
      success: false
    }
  ]);

  // Module updates
  const [moduleUpdates, setModuleUpdates] = useState([
    {
      id: 1,
      name: 'Core Banking Module',
      currentVersion: '2.1.5',
      availableVersion: '2.2.0',
      updateAvailable: true,
      critical: false,
      size: '25 MB',
      releaseDate: '2024-08-15'
    },
    {
      id: 2,
      name: 'Security Module',
      currentVersion: '1.8.3',
      availableVersion: '1.9.0',
      updateAvailable: true,
      critical: true,
      size: '15 MB',
      releaseDate: '2024-08-20'
    },
    {
      id: 3,
      name: 'Reporting Module',
      currentVersion: '3.0.1',
      availableVersion: '3.0.1',
      updateAvailable: false,
      critical: false,
      size: '0 MB',
      releaseDate: '2024-07-30'
    }
  ]);

  const [integrationDialog, setIntegrationDialog] = useState({ open: false, integration: null });
  const [jobDialog, setJobDialog] = useState({ open: false, job: null });
  const [updateDialog, setUpdateDialog] = useState({ open: false, module: null });

  const saveSystemSettings = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: 'System settings updated successfully' };
      } else {
        response = await apiService.updateSystemSettings(systemSettings);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to update settings');
      }
    } catch (error) {
      setError(error.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSecuritySettings = async () => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: 'Security settings updated successfully' };
      } else {
        response = await apiService.updateSecuritySettings(securitySettings);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to update security settings');
      }
    } catch (error) {
      setError(error.message || 'Failed to update security settings');
    } finally {
      setLoading(false);
    }
  };

  const toggleIntegration = async (integration, enabled) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { success: true, message: `Integration ${enabled ? 'enabled' : 'disabled'} successfully` };
        
        // Update local state
        setIntegrations(prev => prev.map(int => 
          int.id === integration.id 
            ? { ...int, status: enabled ? 'ACTIVE' : 'INACTIVE' }
            : int
        ));
      } else {
        response = await apiService.toggleIntegration(integration.id, enabled);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to toggle integration');
      }
    } catch (error) {
      setError(error.message || 'Failed to toggle integration');
    } finally {
      setLoading(false);
    }
  };

  const runBatchJob = async (job) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = { success: true, message: 'Batch job started successfully' };
        
        // Update local state
        setBatchJobs(prev => prev.map(j => 
          j.id === job.id 
            ? { ...j, status: 'RUNNING', lastRun: new Date().toISOString() }
            : j
        ));
      } else {
        response = await apiService.runBatchJob(job.id);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || 'Failed to start batch job');
      }
    } catch (error) {
      setError(error.message || 'Failed to start batch job');
    } finally {
      setLoading(false);
    }
  };

  const installUpdate = async (module) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        response = { success: true, message: 'Module updated successfully' };
        
        // Update local state
        setModuleUpdates(prev => prev.map(mod => 
          mod.id === module.id 
            ? { ...mod, currentVersion: mod.availableVersion, updateAvailable: false }
            : mod
        ));
      } else {
        response = await apiService.installModuleUpdate(module.id);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setUpdateDialog({ open: false, module: null });
      } else {
        setError(response.message || 'Failed to install update');
      }
    } catch (error) {
      setError(error.message || 'Failed to install update');
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'HEALTHY': return 'success';
      case 'WARNING': return 'warning';
      case 'ERROR': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': case 'RUNNING': return 'success';
      case 'INACTIVE': case 'STOPPED': return 'error';
      case 'SCHEDULED': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>System Configuration</Typography>
        <Button variant="contained" startIcon={<Refresh />} onClick={() => window.location.reload()}>
          Refresh All
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="System Settings" />
            <Tab label="Security" />
            <Tab label="Integrations" />
            <Tab label="Batch Jobs" />
            <Tab label="Updates" />
          </Tabs>
        </CardContent>
      </Card>

      {/* System Settings Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>System Configuration</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={systemSettings.bankName}
                  onChange={(e) => setSystemSettings({...systemSettings, bankName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">Eastern Time</MenuItem>
                    <MenuItem value="PST">Pacific Time</MenuItem>
                    <MenuItem value="CST">Central Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={systemSettings.currency}
                    onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Max Login Attempts"
                  type="number"
                  value={systemSettings.maxLoginAttempts}
                  onChange={(e) => setSystemSettings({...systemSettings, maxLoginAttempts: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password Expiry (days)"
                  type="number"
                  value={systemSettings.passwordExpiryDays}
                  onChange={(e) => setSystemSettings({...systemSettings, passwordExpiryDays: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                    />
                  }
                  label="Maintenance Mode"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  startIcon={<Save />} 
                  onClick={saveSystemSettings}
                  disabled={loading}
                >
                  Save System Settings
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Security Settings Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Security Configuration</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.mfaEnabled}
                      onChange={(e) => setSecuritySettings({...securitySettings, mfaEnabled: e.target.checked})}
                    />
                  }
                  label="Multi-Factor Authentication"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.sslEnforced}
                      onChange={(e) => setSecuritySettings({...securitySettings, sslEnforced: e.target.checked})}
                    />
                  }
                  label="SSL Enforcement"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Password Complexity</InputLabel>
                  <Select
                    value={securitySettings.passwordComplexity}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordComplexity: e.target.value})}
                  >
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Encryption Strength</InputLabel>
                  <Select
                    value={securitySettings.encryptionStrength}
                    onChange={(e) => setSecuritySettings({...securitySettings, encryptionStrength: e.target.value})}
                  >
                    <MenuItem value="AES-128">AES-128</MenuItem>
                    <MenuItem value="AES-256">AES-256</MenuItem>
                    <MenuItem value="RSA-2048">RSA-2048</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.fraudDetection}
                      onChange={(e) => setSecuritySettings({...securitySettings, fraudDetection: e.target.checked})}
                    />
                  }
                  label="Fraud Detection"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.auditLogging}
                      onChange={(e) => setSecuritySettings({...securitySettings, auditLogging: e.target.checked})}
                    />
                  }
                  label="Audit Logging"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  startIcon={<Save />} 
                  onClick={saveSecuritySettings}
                  disabled={loading}
                >
                  Save Security Settings
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Integrations Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Third-Party Integrations</Typography>
              <Button variant="contained" startIcon={<Add />}>
                Add Integration
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Integration</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Health</TableCell>
                    <TableCell>Last Sync</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {integration.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={integration.type} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={integration.status} 
                          size="small" 
                          color={getStatusColor(integration.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={integration.health} 
                          size="small" 
                          color={getHealthColor(integration.health)}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(integration.lastSync).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Switch
                            size="small"
                            checked={integration.status === 'ACTIVE'}
                            onChange={(e) => toggleIntegration(integration, e.target.checked)}
                          />
                          <IconButton 
                            size="small"
                            onClick={() => setIntegrationDialog({ open: true, integration })}
                          >
                            <Edit />
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

      {/* Batch Jobs Tab */}
      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Scheduled Batch Jobs</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Name</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Run</TableCell>
                    <TableCell>Next Run</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {batchJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {job.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {job.schedule}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={job.status} 
                          size="small" 
                          color={getStatusColor(job.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(job.lastRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(job.nextRun).toLocaleString()}
                      </TableCell>
                      <TableCell>{job.duration}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => runBatchJob(job)}
                            disabled={job.status === 'RUNNING'}
                          >
                            <PlayArrow />
                          </IconButton>
                          <IconButton size="small" onClick={() => setJobDialog({ open: true, job })}>
                            <Edit />
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

      {/* Updates Tab */}
      {activeTab === 4 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Software Updates</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Module</TableCell>
                    <TableCell>Current Version</TableCell>
                    <TableCell>Available Version</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moduleUpdates.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {module.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{module.currentVersion}</TableCell>
                      <TableCell>
                        {module.updateAvailable ? (
                          <Typography color="primary" fontWeight={500}>
                            {module.availableVersion}
                          </Typography>
                        ) : (
                          module.currentVersion
                        )}
                      </TableCell>
                      <TableCell>{module.size}</TableCell>
                      <TableCell>
                        {module.critical && (
                          <Chip label="Critical" size="small" color="error" />
                        )}
                        {module.updateAvailable && !module.critical && (
                          <Chip label="Available" size="small" color="info" />
                        )}
                        {!module.updateAvailable && (
                          <Chip label="Up to date" size="small" color="success" />
                        )}
                      </TableCell>
                      <TableCell>
                        {module.updateAvailable && (
                          <Button 
                            size="small" 
                            variant="contained"
                            color={module.critical ? "error" : "primary"}
                            onClick={() => setUpdateDialog({ open: true, module })}
                          >
                            Update
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
      )}

      {/* Module Update Dialog */}
      <Dialog 
        open={updateDialog.open} 
        onClose={() => setUpdateDialog({ open: false, module: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Install Update</DialogTitle>
        <DialogContent>
          {updateDialog.module && (
            <Box>
              <Typography gutterBottom>
                Module: {updateDialog.module.name}
              </Typography>
              <Typography gutterBottom>
                Version: {updateDialog.module.currentVersion} → {updateDialog.module.availableVersion}
              </Typography>
              <Typography gutterBottom>
                Size: {updateDialog.module.size}
              </Typography>
              <Typography gutterBottom>
                Release Date: {updateDialog.module.releaseDate}
              </Typography>
              {updateDialog.module.critical && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  This is a critical security update and should be installed immediately.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialog({ open: false, module: null })}>
            Cancel
          </Button>
          <Button 
            color="primary"
            variant="contained"
            onClick={() => installUpdate(updateDialog.module)}
            disabled={loading}
          >
            Install Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemConfiguration;
