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
  CircularProgress
} from '@mui/material';
import {
  Security,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  ExpandMore,
  Visibility,
  Assessment,
  Policy,
  VerifiedUser,
  Gavel,
  Report,
  ContactSupport,
  Schedule,
  TrendingUp,
  Flag,
  AccountBalance,
  Shield
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';

const ComplianceRiskManagement = () => {
  const { isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // KYC/AML Monitoring
  const [kycAmlCases, setKycAmlCases] = useState([
    {
      id: 1,
      caseId: 'KYC2024-001',
      customerName: 'International Trading Corp',
      customerId: 'CORP004',
      accountNumber: '****5678',
      caseType: 'ENHANCED_KYC',
      riskLevel: 'HIGH',
      status: 'PENDING_REVIEW',
      openDate: '2024-08-29 10:30:00',
      dueDate: '2024-09-05 17:00:00',
      assignedTo: 'compliance.officer@obs.com',
      lastActivity: '2024-08-29 14:20:00',
      flags: ['High-value transactions', 'Cross-border activity', 'Complex ownership structure'],
      documentsReceived: ['Certificate of incorporation', 'Ultimate beneficial ownership', 'Financial statements'],
      complianceScore: 65
    },
    {
      id: 2,
      caseId: 'AML2024-002',
      customerName: 'Ahmed Al-Rahman',
      customerId: 'IND005',
      accountNumber: '****9012',
      caseType: 'AML_INVESTIGATION',
      riskLevel: 'CRITICAL',
      status: 'ESCALATED',
      openDate: '2024-08-28 16:45:00',
      dueDate: '2024-08-30 17:00:00',
      assignedTo: 'senior.compliance@obs.com',
      lastActivity: '2024-08-29 13:15:00',
      flags: ['Sanctions screening hit', 'Unusual transaction patterns', 'PEP status'],
      documentsReceived: ['Passport copy', 'Source of funds declaration'],
      complianceScore: 25
    },
    {
      id: 3,
      caseId: 'KYC2024-003',
      customerName: 'Tech Innovations LLC',
      customerId: 'CORP005',
      accountNumber: '****3456',
      caseType: 'PERIODIC_REVIEW',
      riskLevel: 'MEDIUM',
      status: 'COMPLETED',
      openDate: '2024-08-25 09:00:00',
      dueDate: '2024-09-01 17:00:00',
      assignedTo: 'junior.compliance@obs.com',
      lastActivity: '2024-08-29 11:30:00',
      flags: ['Annual review due'],
      documentsReceived: ['Updated business license', 'Financial statements', 'Board resolution'],
      complianceScore: 85
    }
  ]);

  // Compliance Reports
  const [complianceReports, setComplianceReports] = useState([
    {
      id: 1,
      reportType: 'SAR_FILING',
      reportId: 'SAR2024-001',
      customerName: 'Suspicious Entity Inc',
      filingDate: '2024-08-29 12:00:00',
      reportingPeriod: 'August 2024',
      status: 'FILED',
      regulatoryBody: 'FinCEN',
      priority: 'HIGH',
      description: 'Suspicious cash transactions exceeding reporting threshold',
      followUpRequired: true,
      nextReviewDate: '2024-09-15'
    },
    {
      id: 2,
      reportType: 'CTR_FILING',
      reportId: 'CTR2024-005',
      customerName: 'Cash Intensive Business',
      filingDate: '2024-08-28 15:30:00',
      reportingPeriod: 'August 2024',
      status: 'SUBMITTED',
      regulatoryBody: 'FinCEN',
      priority: 'MEDIUM',
      description: 'Currency transactions over $10,000',
      followUpRequired: false,
      nextReviewDate: '2024-09-30'
    },
    {
      id: 3,
      reportType: 'REGULATORY_AUDIT',
      reportId: 'AUDIT2024-Q3',
      customerName: 'All Customers',
      filingDate: '2024-08-27 09:00:00',
      reportingPeriod: 'Q3 2024',
      status: 'IN_PROGRESS',
      regulatoryBody: 'OCC',
      priority: 'CRITICAL',
      description: 'Quarterly compliance audit and assessment',
      followUpRequired: true,
      nextReviewDate: '2024-09-30'
    }
  ]);

  // Audit Issues
  const [auditIssues, setAuditIssues] = useState([
    {
      id: 1,
      issueId: 'AUDIT2024-001',
      category: 'TRANSACTION_MONITORING',
      severity: 'HIGH',
      title: 'Delayed transaction monitoring alerts',
      description: 'Transaction monitoring system showing delays in generating alerts for suspicious activities',
      identifiedDate: '2024-08-28 14:00:00',
      dueDate: '2024-09-15 17:00:00',
      assignedTo: 'it.compliance@obs.com',
      status: 'OPEN',
      correctiveActions: [
        'Upgrade monitoring system',
        'Implement real-time alert processing',
        'Staff training on new procedures'
      ],
      progress: 30
    },
    {
      id: 2,
      issueId: 'AUDIT2024-002',
      category: 'DOCUMENTATION',
      severity: 'MEDIUM',
      title: 'Incomplete customer due diligence files',
      description: 'Several customer files missing required documentation for risk assessment',
      identifiedDate: '2024-08-26 11:30:00',
      dueDate: '2024-09-10 17:00:00',
      assignedTo: 'kyc.team@obs.com',
      status: 'IN_PROGRESS',
      correctiveActions: [
        'Review all customer files',
        'Request missing documentation',
        'Update compliance procedures'
      ],
      progress: 65
    },
    {
      id: 3,
      issueId: 'AUDIT2024-003',
      category: 'TRAINING',
      severity: 'LOW',
      title: 'Staff compliance training overdue',
      description: 'Multiple staff members have not completed annual compliance training',
      identifiedDate: '2024-08-25 09:00:00',
      dueDate: '2024-09-30 17:00:00',
      assignedTo: 'hr.training@obs.com',
      status: 'CLOSED',
      correctiveActions: [
        'Schedule training sessions',
        'Track completion status',
        'Update training materials'
      ],
      progress: 100
    }
  ]);

  const [detailsDialog, setDetailsDialog] = useState({ open: false, item: null, type: '' });

  const handleKycAmlAction = async (caseId, action, notes = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = { 
          success: true, 
          message: `KYC/AML case ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setKycAmlCases(prev => prev.map(kycCase => 
          kycCase.id === caseId 
            ? { ...kycCase, status: action === 'APPROVE' ? 'COMPLETED' : action === 'ESCALATE' ? 'ESCALATED' : 'REJECTED' }
            : kycCase
        ));
      } else {
        response = await apiService.processKycAmlCase(caseId, action, notes);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setDetailsDialog({ open: false, item: null, type: '' });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} case`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} case`);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAction = async (reportId, action) => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Report ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setComplianceReports(prev => prev.map(report => 
          report.id === reportId 
            ? { ...report, status: action === 'SUBMIT' ? 'SUBMITTED' : action === 'FILE' ? 'FILED' : 'REVIEWED' }
            : report
        ));
      } else {
        response = await apiService.processComplianceReport(reportId, action);
      }
      
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} report`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} report`);
    } finally {
      setLoading(false);
    }
  };

  const handleAuditIssueAction = async (issueId, action, notes = '') => {
    try {
      setLoading(true);
      let response;
      
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = { 
          success: true, 
          message: `Audit issue ${action.toLowerCase()}ed successfully`
        };
        
        // Update local state
        setAuditIssues(prev => prev.map(issue => 
          issue.id === issueId 
            ? { ...issue, status: action === 'CLOSE' ? 'CLOSED' : 'IN_PROGRESS' }
            : issue
        ));
      } else {
        response = await apiService.processAuditIssue(issueId, action, notes);
      }
      
      if (response.success) {
        setSuccess(response.message);
        setDetailsDialog({ open: false, item: null, type: '' });
      } else {
        setError(response.message || `Failed to ${action.toLowerCase()} issue`);
      }
    } catch (error) {
      setError(error.message || `Failed to ${action.toLowerCase()} issue`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_REVIEW': case 'IN_PROGRESS': case 'OPEN': return 'warning';
      case 'COMPLETED': case 'FILED': case 'CLOSED': case 'SUBMITTED': return 'success';
      case 'ESCALATED': case 'CRITICAL': return 'error';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
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

  const getComplianceScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Compliance & Risk Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="KYC/AML Cases" />
        <Tab label="Compliance Reports" />
        <Tab label="Audit Issues" />
      </Tabs>

      {/* KYC/AML Cases Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              KYC & AML Case Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Compliance Score</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kycAmlCases.map((kycCase) => (
                    <TableRow key={kycCase.id}>
                      <TableCell>{kycCase.caseId}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {kycCase.customerName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {kycCase.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={kycCase.caseType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={kycCase.riskLevel} 
                          size="small" 
                          color={getRiskColor(kycCase.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={kycCase.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(kycCase.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{kycCase.complianceScore}%</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={kycCase.complianceScore} 
                            color={getComplianceScoreColor(kycCase.complianceScore)}
                            sx={{ width: 60, height: 6 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={new Date(kycCase.dueDate) < new Date() ? 'error' : 'textPrimary'}
                        >
                          {new Date(kycCase.dueDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: kycCase, 
                              type: 'kyc' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {kycCase.status === 'PENDING_REVIEW' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleKycAmlAction(kycCase.id, 'APPROVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="warning"
                                onClick={() => handleKycAmlAction(kycCase.id, 'ESCALATE')}
                              >
                                <Flag />
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

      {/* Compliance Reports Tab */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Regulatory Compliance Reports
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Customer/Entity</TableCell>
                    <TableCell>Filing Date</TableCell>
                    <TableCell>Regulatory Body</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complianceReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reportId}</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.reportType.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{report.customerName}</TableCell>
                      <TableCell>{new Date(report.filingDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.regulatoryBody} 
                          size="small" 
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={report.priority} 
                          size="small" 
                          color={getRiskColor(report.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={report.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(report.status)}
                        />
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
                          {report.status === 'IN_PROGRESS' && (
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleReportAction(report.id, 'SUBMIT')}
                            >
                              <Report />
                            </IconButton>
                          )}
                          {report.followUpRequired && (
                            <IconButton 
                              size="small" 
                              color="warning"
                            >
                              <Schedule />
                            </IconButton>
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

      {/* Audit Issues Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Audit Issues & Corrective Actions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Issue ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>{issue.issueId}</TableCell>
                      <TableCell>
                        <Chip 
                          label={issue.category.replace('_', ' ')} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {issue.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={issue.severity} 
                          size="small" 
                          color={getSeverityColor(issue.severity)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={issue.status.replace('_', ' ')} 
                          size="small" 
                          color={getStatusColor(issue.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">{issue.progress}%</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={issue.progress} 
                            color={issue.progress === 100 ? 'success' : issue.progress >= 50 ? 'info' : 'warning'}
                            sx={{ width: 60, height: 6 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={new Date(issue.dueDate) < new Date() ? 'error' : 'textPrimary'}
                        >
                          {new Date(issue.dueDate).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailsDialog({ 
                              open: true, 
                              item: issue, 
                              type: 'audit' 
                            })}
                          >
                            <Visibility />
                          </IconButton>
                          {issue.status === 'IN_PROGRESS' && (
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => handleAuditIssueAction(issue.id, 'CLOSE')}
                            >
                              <CheckCircle />
                            </IconButton>
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

      {/* Details Dialog */}
      <Dialog 
        open={detailsDialog.open} 
        onClose={() => setDetailsDialog({ open: false, item: null, type: '' })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detailsDialog.type === 'kyc' && 'KYC/AML Case Details'}
          {detailsDialog.type === 'report' && 'Compliance Report Details'}
          {detailsDialog.type === 'audit' && 'Audit Issue Details'}
        </DialogTitle>
        <DialogContent>
          {detailsDialog.item && detailsDialog.type === 'kyc' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Case ID</Typography>
                <Typography>{detailsDialog.item.caseId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Customer</Typography>
                <Typography>{detailsDialog.item.customerName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Risk Level</Typography>
                <Chip 
                  label={detailsDialog.item.riskLevel} 
                  color={getRiskColor(detailsDialog.item.riskLevel)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Compliance Score</Typography>
                <Typography>{detailsDialog.item.complianceScore}%</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Risk Flags</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {detailsDialog.item.flags.map((flag, index) => (
                    <Chip key={index} label={flag} size="small" color="warning" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Documents Received</Typography>
                <List dense>
                  {detailsDialog.item.documentsReceived.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><VerifiedUser /></ListItemIcon>
                      <ListItemText primary={doc} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Assigned To</Typography>
                <Typography>{detailsDialog.item.assignedTo}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Due Date</Typography>
                <Typography>{new Date(detailsDialog.item.dueDate).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'report' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Report ID</Typography>
                <Typography>{detailsDialog.item.reportId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{detailsDialog.item.reportType.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Regulatory Body</Typography>
                <Typography>{detailsDialog.item.regulatoryBody}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Priority</Typography>
                <Chip 
                  label={detailsDialog.item.priority} 
                  color={getRiskColor(detailsDialog.item.priority)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{detailsDialog.item.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Filing Date</Typography>
                <Typography>{new Date(detailsDialog.item.filingDate).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Next Review</Typography>
                <Typography>{new Date(detailsDialog.item.nextReviewDate).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={detailsDialog.item.followUpRequired} disabled />}
                  label="Follow-up Required"
                />
              </Grid>
            </Grid>
          )}

          {detailsDialog.item && detailsDialog.type === 'audit' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Issue ID</Typography>
                <Typography>{detailsDialog.item.issueId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Category</Typography>
                <Typography>{detailsDialog.item.category.replace('_', ' ')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Severity</Typography>
                <Chip 
                  label={detailsDialog.item.severity} 
                  color={getSeverityColor(detailsDialog.item.severity)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Progress</Typography>
                <Typography>{detailsDialog.item.progress}%</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Title</Typography>
                <Typography>{detailsDialog.item.title}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{detailsDialog.item.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Corrective Actions</Typography>
                <List dense>
                  {detailsDialog.item.correctiveActions.map((action, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><CheckCircle /></ListItemIcon>
                      <ListItemText primary={action} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Assigned To</Typography>
                <Typography>{detailsDialog.item.assignedTo}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Due Date</Typography>
                <Typography>{new Date(detailsDialog.item.dueDate).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, item: null, type: '' })}>
            Close
          </Button>
          {detailsDialog.item && (
            <>
              {detailsDialog.type === 'kyc' && detailsDialog.item.status === 'PENDING_REVIEW' && (
                <>
                  <Button 
                    color="success" 
                    variant="contained"
                    onClick={() => handleKycAmlAction(detailsDialog.item.id, 'APPROVE')}
                  >
                    Approve
                  </Button>
                  <Button 
                    color="warning" 
                    variant="outlined"
                    onClick={() => handleKycAmlAction(detailsDialog.item.id, 'ESCALATE')}
                  >
                    Escalate
                  </Button>
                </>
              )}
              
              {detailsDialog.type === 'report' && detailsDialog.item.status === 'IN_PROGRESS' && (
                <Button 
                  color="primary" 
                  variant="contained"
                  onClick={() => handleReportAction(detailsDialog.item.id, 'SUBMIT')}
                >
                  Submit Report
                </Button>
              )}

              {detailsDialog.type === 'audit' && detailsDialog.item.status === 'IN_PROGRESS' && (
                <Button 
                  color="success" 
                  variant="contained"
                  onClick={() => handleAuditIssueAction(detailsDialog.item.id, 'CLOSE')}
                >
                  Mark Resolved
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplianceRiskManagement;
