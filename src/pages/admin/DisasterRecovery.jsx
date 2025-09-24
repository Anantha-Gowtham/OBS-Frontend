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
  LinearProgress,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import {
  Backup,
  Restore,
  PlayArrow,
  Stop,
  Schedule,
  CloudDownload,
  CloudUpload,
  Security,
  ExpandMore,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Download,
  Upload,
  Delete,
  Settings,
  Timeline,
  Storage,
  VerifiedUser,
  Assessment
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const DisasterRecovery = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Backup status
  const [backupStatus, setBackupStatus] = useState({
    lastBackup: '2024-08-29 02:00:00',
    nextBackup: '2024-08-30 02:00:00',
    backupSize: '2.5 GB',
    status: 'SUCCESS',
    retention: 30,
    autoBackup: true,
    location: 'AWS S3 - us-east-1'
  });

  // Backup history
  const [backupHistory, setBackupHistory] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 02:00:00',
      type: 'Full',
      size: '2.5 GB',
      duration: '45 minutes',
      status: 'SUCCESS',
      location: 'AWS S3',
      retention: '30 days'
    },
    {
      id: 2,
      timestamp: '2024-08-28 02:00:00',
      type: 'Incremental',
      size: '156 MB',
      duration: '8 minutes',
      status: 'SUCCESS',
      location: 'AWS S3',
      retention: '30 days'
    },
    {
      id: 3,
      timestamp: '2024-08-27 02:00:00',
      type: 'Incremental',
      size: '203 MB',
      duration: '12 minutes',
      status: 'SUCCESS',
      location: 'AWS S3',
      retention: '30 days'
    },
    {
      id: 4,
      timestamp: '2024-08-26 02:00:00',
      type: 'Incremental',
      size: '189 MB',
      duration: '10 minutes',
      status: 'WARNING',
      location: 'AWS S3',
      retention: '30 days'
    }
  ]);

  // Recovery plans
  const [recoveryPlans, setRecoveryPlans] = useState([
    {
      id: 1,
      name: 'Database Recovery Plan',
      priority: 'CRITICAL',
      rto: '15 minutes',
      rpo: '5 minutes',
      lastTested: '2024-08-15',
      status: 'ACTIVE',
      components: ['Primary Database', 'Transaction Logs', 'Stored Procedures']
    },
    {
      id: 2,
      name: 'Application Server Recovery',
      priority: 'HIGH',
      rto: '30 minutes',
      rpo: '10 minutes',
      lastTested: '2024-08-10',
      status: 'ACTIVE',
      components: ['Application Servers', 'Load Balancer', 'Session Store']
    },
    {
      id: 3,
      name: 'Communication Systems',
      priority: 'MEDIUM',
      rto: '60 minutes',
      rpo: '30 minutes',
      lastTested: '2024-08-05',
      status: 'PENDING_UPDATE',
      components: ['Email System', 'SMS Gateway', 'Push Notifications']
    }
  ]);

  // Test results
  const [testResults, setTestResults] = useState([
    {
      id: 1,
      planName: 'Database Recovery Plan',
      testDate: '2024-08-15',
      duration: '18 minutes',
      status: 'PASSED',
      issues: [],
      rtoTarget: '15 minutes',
      rtoActual: '18 minutes'
    },
    {
      id: 2,
      planName: 'Application Server Recovery',
      testDate: '2024-08-10',
      duration: '28 minutes',
      status: 'PASSED',
      issues: ['Minor delay in session restoration'],
      rtoTarget: '30 minutes',
      rtoActual: '28 minutes'
    },
    {
      id: 3,
      planName: 'Full System Recovery',
      testDate: '2024-08-01',
      duration: '2.5 hours',
      status: 'FAILED',
      issues: ['Database connection timeout', 'Certificate expired'],
      rtoTarget: '2 hours',
      rtoActual: '2.5 hours'
    }
  ]);

  const [backupDialog, setBackupDialog] = useState(false);
  const [restoreDialog, setRestoreDialog] = useState(false);
  const [testDialog, setTestDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const startBackup = async (type = 'incremental') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        response = { 
          success: true, 
          message: `${type} backup started successfully`,
          backupId: Date.now()
        };
        
        // Add new backup to history
        const newBackup = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          type: type.charAt(0).toUpperCase() + type.slice(1),
          size: type === 'full' ? '2.6 GB' : '145 MB',
          duration: 'In Progress',
          status: 'RUNNING',
          location: 'AWS S3',
          retention: '30 days'
        };
        setBackupHistory(prev => [newBackup, ...prev]);
      } else {
        response = await apiService.startBackup({ type });
      }
      
      if (response.success) {
        setSuccess(response.message);
        setBackupDialog(false);
      } else {
        setError(response.message || 'Failed to start backup');
      }
    } catch (error) {
      setError(error.message || 'Failed to start backup');
    } finally {
      setLoading(false);
    }
  };

  const restoreFromBackup = async (backupId) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        response = { 
          success: true, 
          message: 'Restore operation started successfully'
        };
      } else {
        response = await apiService.restoreFromBackup(backupId);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setRestoreDialog(false);
      } else {
        setError(response.message || 'Failed to start restore');
      }
    } catch (error) {
      setError(error.message || 'Failed to start restore');
    } finally {
      setLoading(false);
    }
  };

  const testRecoveryPlan = async (planId) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 4000));
        response = { 
          success: true, 
          message: 'Recovery plan test started successfully'
        };
        
        // Add new test result
        const newTest = {
          id: Date.now(),
          planName: selectedPlan?.name || 'Test Plan',
          testDate: new Date().toISOString().split('T')[0],
          duration: 'In Progress',
          status: 'RUNNING',
          issues: [],
          rtoTarget: selectedPlan?.rto || '30 minutes',
          rtoActual: 'TBD'
        };
        setTestResults(prev => [newTest, ...prev]);
      } else {
        response = await apiService.testRecoveryPlan(planId);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setTestDialog(false);
      } else {
        setError(response.message || 'Failed to start test');
      }
    } catch (error) {
      setError(error.message || 'Failed to start test');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': case 'PASSED': case 'ACTIVE': return 'success';
      case 'WARNING': case 'PENDING_UPDATE': return 'warning';
      case 'FAILED': case 'ERROR': return 'error';
      case 'RUNNING': case 'IN_PROGRESS': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const testSteps = [
    'Initialize Test Environment',
    'Simulate Disaster Scenario',
    'Execute Recovery Procedures',
    'Validate System Functionality',
    'Generate Test Report'
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Disaster Recovery</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Assessment />} onClick={() => setTestDialog(true)}>
            Test Recovery
          </Button>
          <Button variant="contained" startIcon={<Backup />} onClick={() => setBackupDialog(true)}>
            Start Backup
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Backup Status" />
        <Tab label="Recovery Plans" />
        <Tab label="Test Results" />
        <Tab label="Configuration" />
      </Tabs>

      {/* Backup Status Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Current Status */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Backup Status</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Schedule /></ListItemIcon>
                    <ListItemText 
                      primary="Last Backup" 
                      secondary={new Date(backupStatus.lastBackup).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CloudUpload /></ListItemIcon>
                    <ListItemText 
                      primary="Next Scheduled" 
                      secondary={new Date(backupStatus.nextBackup).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Storage /></ListItemIcon>
                    <ListItemText 
                      primary="Backup Size" 
                      secondary={backupStatus.backupSize}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="Status" 
                      secondary={
                        <Chip 
                          label={backupStatus.status} 
                          size="small" 
                          color={getStatusColor(backupStatus.status)}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button 
                    variant="contained" 
                    startIcon={<Backup />}
                    onClick={() => startBackup('full')}
                    disabled={loading}
                  >
                    Start Full Backup
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<CloudDownload />}
                    onClick={() => startBackup('incremental')}
                    disabled={loading}
                  >
                    Start Incremental Backup
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Restore />}
                    onClick={() => setRestoreDialog(true)}
                  >
                    Restore from Backup
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Download />}
                  >
                    Download Backup
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Backup History */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Backup History</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {backupHistory.map((backup) => (
                        <TableRow key={backup.id}>
                          <TableCell>{new Date(backup.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            <Chip label={backup.type} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>{backup.size}</TableCell>
                          <TableCell>{backup.duration}</TableCell>
                          <TableCell>
                            <Chip 
                              label={backup.status} 
                              size="small" 
                              color={getStatusColor(backup.status)}
                            />
                          </TableCell>
                          <TableCell>{backup.location}</TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <IconButton 
                                size="small"
                                onClick={() => {
                                  setSelectedBackup(backup);
                                  setRestoreDialog(true);
                                }}
                                disabled={backup.status !== 'SUCCESS'}
                              >
                                <Restore />
                              </IconButton>
                              <IconButton 
                                size="small"
                                disabled={backup.status !== 'SUCCESS'}
                              >
                                <Download />
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
          </Grid>
        </Grid>
      )}

      {/* Recovery Plans Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {recoveryPlans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                    <Typography variant="h6">{plan.name}</Typography>
                    <Chip 
                      label={plan.priority} 
                      size="small" 
                      color={getPriorityColor(plan.priority)}
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">RTO</Typography>
                      <Typography variant="body1">{plan.rto}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">RPO</Typography>
                      <Typography variant="body1">{plan.rpo}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Last Tested</Typography>
                      <Typography variant="body1">{plan.lastTested}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Status</Typography>
                      <Chip 
                        label={plan.status} 
                        size="small" 
                        color={getStatusColor(plan.status)}
                      />
                    </Grid>
                  </Grid>

                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Components</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {plan.components.map((component, index) => (
                          <ListItem key={index}>
                            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                            <ListItemText primary={component} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Box mt={2} display="flex" gap={1}>
                    <Button 
                      size="small" 
                      variant="contained"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setTestDialog(true);
                      }}
                    >
                      Test Plan
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<Settings />}>
                      Configure
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Test Results Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recovery Test Results</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Plan Name</TableCell>
                    <TableCell>Test Date</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>RTO Target</TableCell>
                    <TableCell>RTO Actual</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Issues</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.planName}</TableCell>
                      <TableCell>{result.testDate}</TableCell>
                      <TableCell>{result.duration}</TableCell>
                      <TableCell>{result.rtoTarget}</TableCell>
                      <TableCell>
                        <Typography 
                          color={result.rtoActual <= result.rtoTarget ? 'success.main' : 'error.main'}
                        >
                          {result.rtoActual}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={result.status} 
                          size="small" 
                          color={getStatusColor(result.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {result.issues.length > 0 ? (
                          <Chip 
                            label={`${result.issues.length} issues`} 
                            size="small" 
                            color="warning"
                          />
                        ) : (
                          <Chip 
                            label="No issues" 
                            size="small" 
                            color="success"
                          />
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

      {/* Configuration Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Backup Configuration</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={backupStatus.autoBackup}
                        onChange={(e) => setBackupStatus({
                          ...backupStatus, 
                          autoBackup: e.target.checked
                        })}
                      />
                    }
                    label="Enable Automatic Backups"
                  />
                  
                  <TextField
                    label="Retention Period (days)"
                    type="number"
                    value={backupStatus.retention}
                    onChange={(e) => setBackupStatus({
                      ...backupStatus, 
                      retention: e.target.value
                    })}
                  />
                  
                  <FormControl fullWidth>
                    <InputLabel>Backup Location</InputLabel>
                    <Select value={backupStatus.location}>
                      <MenuItem value="AWS S3 - us-east-1">AWS S3 - us-east-1</MenuItem>
                      <MenuItem value="AWS S3 - us-west-2">AWS S3 - us-west-2</MenuItem>
                      <MenuItem value="Azure Blob Storage">Azure Blob Storage</MenuItem>
                      <MenuItem value="Google Cloud Storage">Google Cloud Storage</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Button variant="contained" startIcon={<Save />}>
                    Save Configuration
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recovery Objectives</Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Critical Systems RTO" 
                      secondary="15 minutes maximum downtime"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Data Recovery Point" 
                      secondary="5 minutes maximum data loss"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Test Frequency" 
                      secondary="Monthly disaster recovery tests"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Backup Verification" 
                      secondary="Daily backup integrity checks"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Backup Dialog */}
      <Dialog open={backupDialog} onClose={() => setBackupDialog(false)}>
        <DialogTitle>Start Backup</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Select backup type:</Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Button 
              variant="outlined" 
              onClick={() => startBackup('full')}
              disabled={loading}
            >
              Full Backup (Complete system backup - 2.5+ GB)
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => startBackup('incremental')}
              disabled={loading}
            >
              Incremental Backup (Changes only - ~150 MB)
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBackupDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={restoreDialog} onClose={() => setRestoreDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Restore from Backup</DialogTitle>
        <DialogContent>
          {selectedBackup ? (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                This will restore the system to the state from {new Date(selectedBackup.timestamp).toLocaleString()}.
                All current data will be replaced.
              </Alert>
              <Typography><strong>Backup:</strong> {selectedBackup.type}</Typography>
              <Typography><strong>Size:</strong> {selectedBackup.size}</Typography>
              <Typography><strong>Date:</strong> {new Date(selectedBackup.timestamp).toLocaleString()}</Typography>
            </Box>
          ) : (
            <Typography>Select a backup to restore from the backup history.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestoreDialog(false)}>Cancel</Button>
          {selectedBackup && (
            <Button 
              color="warning" 
              variant="contained"
              onClick={() => restoreFromBackup(selectedBackup.id)}
              disabled={loading}
            >
              Start Restore
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Test Recovery Dialog */}
      <Dialog open={testDialog} onClose={() => setTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Test Recovery Plan</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedPlan.name}
              </Typography>
              <Typography gutterBottom>
                This test will simulate a disaster scenario and validate the recovery procedures.
                The test will run in an isolated environment and will not affect production systems.
              </Typography>
              
              <Box mt={3}>
                <Typography variant="subtitle1" gutterBottom>Test Steps:</Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {testSteps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step}</StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="textSecondary">
                          Step {index + 1} of {testSteps.length}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={() => testRecoveryPlan(selectedPlan?.id)}
            disabled={loading}
          >
            Start Test
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisasterRecovery;
