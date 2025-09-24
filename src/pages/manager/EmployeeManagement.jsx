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
  ListItemButton
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Person,
  Email,
  Phone,
  Work,
  Schedule,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Warning,
  Star,
  Assessment,
  Settings,
  MoreVert,
  Search,
  FilterList,
  Download,
  Upload,
  Group,
  Business,
  LocationOn,
  CalendarToday,
  MonetizationOn,
  Security,
  Notifications,
  History,
  ExpandMore,
  Assignment,
  TimelapseOutlined,
  PersonAdd,
  Block,
  Lock,
  LockOpen
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const EmployeeManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: '', employee: null });

  // Employee data
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      employeeId: 'OBS001',
      name: 'Alice Cooper',
      email: 'alice.cooper@obs.com',
      phone: '+91-9876543210',
      position: 'Senior Teller',
      department: 'Operations',
      branch: 'Main Branch',
      joiningDate: '2022-03-15',
      salary: 45000,
      status: 'Active',
      manager: 'John Manager',
      performance: {
        rating: 4.5,
        lastReview: '2024-01-15',
        kpiScore: 92,
        goals: 'Completed 95% of monthly targets'
      },
      access: {
        level: 'Level 2',
        permissions: ['Customer Service', 'Transaction Processing', 'Account Management'],
        lastLogin: '2024-01-22 09:15'
      },
      attendance: {
        present: 22,
        absent: 1,
        late: 2,
        percentage: 95.7
      },
      tasks: {
        pending: 5,
        completed: 38,
        overdue: 1
      },
      address: '123 Employee Street, City - 123456',
      emergencyContact: '+91-9876543211',
      bloodGroup: 'O+',
      skills: ['Customer Service', 'Banking Operations', 'Loan Processing']
    },
    {
      id: 'EMP002',
      employeeId: 'OBS002',
      name: 'Bob Martinez',
      email: 'bob.martinez@obs.com',
      phone: '+91-9876543220',
      position: 'Loan Officer',
      department: 'Loans',
      branch: 'East Branch',
      joiningDate: '2021-08-20',
      salary: 52000,
      status: 'Active',
      manager: 'Sarah Manager',
      performance: {
        rating: 4.2,
        lastReview: '2024-01-10',
        kpiScore: 88,
        goals: 'Achieve 100% loan target completion'
      },
      access: {
        level: 'Level 3',
        permissions: ['Loan Processing', 'Credit Assessment', 'Document Verification'],
        lastLogin: '2024-01-22 08:45'
      },
      attendance: {
        present: 21,
        absent: 2,
        late: 1,
        percentage: 91.3
      },
      tasks: {
        pending: 8,
        completed: 42,
        overdue: 0
      },
      address: '456 Staff Avenue, City - 123457',
      emergencyContact: '+91-9876543221',
      bloodGroup: 'A+',
      skills: ['Loan Processing', 'Risk Assessment', 'Customer Relations']
    },
    {
      id: 'EMP003',
      employeeId: 'OBS003',
      name: 'Carol Davis',
      email: 'carol.davis@obs.com',
      phone: '+91-9876543230',
      position: 'Customer Service Executive',
      department: 'Customer Service',
      branch: 'West Branch',
      joiningDate: '2023-01-10',
      salary: 38000,
      status: 'Active',
      manager: 'Mike Manager',
      performance: {
        rating: 4.0,
        lastReview: '2024-01-05',
        kpiScore: 85,
        goals: 'Improve customer satisfaction scores'
      },
      access: {
        level: 'Level 1',
        permissions: ['Customer Support', 'Account Inquiry', 'Basic Transactions'],
        lastLogin: '2024-01-21 16:30'
      },
      attendance: {
        present: 20,
        absent: 3,
        late: 3,
        percentage: 87.0
      },
      tasks: {
        pending: 12,
        completed: 28,
        overdue: 2
      },
      address: '789 Worker Road, City - 123458',
      emergencyContact: '+91-9876543231',
      bloodGroup: 'B+',
      skills: ['Customer Service', 'Communication', 'Problem Solving']
    },
    {
      id: 'EMP004',
      employeeId: 'OBS004',
      name: 'David Wilson',
      email: 'david.wilson@obs.com',
      phone: '+91-9876543240',
      position: 'Branch Manager',
      department: 'Management',
      branch: 'North Branch',
      joiningDate: '2020-05-15',
      salary: 85000,
      status: 'Active',
      manager: 'Regional Manager',
      performance: {
        rating: 4.8,
        lastReview: '2024-01-20',
        kpiScore: 96,
        goals: 'Lead branch digital transformation'
      },
      access: {
        level: 'Level 5',
        permissions: ['Full Access', 'Branch Management', 'Staff Management', 'Financial Reports'],
        lastLogin: '2024-01-22 07:30'
      },
      attendance: {
        present: 23,
        absent: 0,
        late: 0,
        percentage: 100
      },
      tasks: {
        pending: 3,
        completed: 45,
        overdue: 0
      },
      address: '321 Manager Lane, City - 123459',
      emergencyContact: '+91-9876543241',
      bloodGroup: 'AB+',
      skills: ['Leadership', 'Strategic Planning', 'Team Management', 'Banking Operations']
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    branch: '',
    salary: '',
    joiningDate: '',
    address: '',
    emergencyContact: '',
    bloodGroup: ''
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalEmployees: 85,
    activeEmployees: 82,
    onLeave: 3,
    averagePerformance: 4.3,
    attendanceRate: 94.2
  });

  const departments = ['Operations', 'Loans', 'Customer Service', 'Management', 'IT', 'Security', 'Finance'];
  const branches = ['Main Branch', 'East Branch', 'West Branch', 'North Branch', 'South Branch'];
  const positions = [
    'Teller', 'Senior Teller', 'Customer Service Executive', 'Loan Officer', 
    'Assistant Manager', 'Branch Manager', 'Operations Manager', 'Security Officer'
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'On Leave':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'primary';
    if (rating >= 3.5) return 'warning';
    return 'error';
  };

  const handleEmployeeAction = async (action, employeeId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (action === 'delete') {
        setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      } else if (action === 'deactivate') {
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === employeeId ? { ...emp, status: 'Inactive' } : emp
          )
        );
      } else if (action === 'activate') {
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === employeeId ? { ...emp, status: 'Active' } : emp
          )
        );
      }
      
      setConfirmDialog({ open: false, action: '', employee: null });
      setAnchorEl(null);
    } catch (err) {
      console.error('Error performing action:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newEmp = {
        ...newEmployee,
        id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        employeeId: `OBS${String(employees.length + 1).padStart(3, '0')}`,
        status: 'Active',
        performance: { rating: 0, lastReview: '', kpiScore: 0, goals: '' },
        access: { level: 'Level 1', permissions: [], lastLogin: '' },
        attendance: { present: 0, absent: 0, late: 0, percentage: 0 },
        tasks: { pending: 0, completed: 0, overdue: 0 }
      };
      
      setEmployees(prev => [...prev, newEmp]);
      setAddEmployeeOpen(false);
      setNewEmployee({
        name: '', email: '', phone: '', position: '', department: '', branch: '',
        salary: '', joiningDate: '', address: '', emergencyContact: '', bloodGroup: ''
      });
    } catch (err) {
      console.error('Error adding employee:', err);
    } finally {
      setLoading(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Employee Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage staff, performance, and organizational structure
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setAddEmployeeOpen(true)}
        >
          Add Employee
        </Button>
      </Box>

      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Employees
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {dashboardStats.totalEmployees}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Group />
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
                    Active Employees
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="success.main">
                    {dashboardStats.activeEmployees}
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
                    Avg. Performance
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="warning.main">
                    {dashboardStats.averagePerformance}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Star />
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
                    Attendance Rate
                  </Typography>
                  <Typography variant="h4" fontWeight={600} color="info.main">
                    {dashboardStats.attendanceRate}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Schedule />
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filterDepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="on leave">On Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<Download />} fullWidth>
                  Export
                </Button>
                <Button variant="outlined" startIcon={<Upload />} fullWidth>
                  Import
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Employee List ({filteredEmployees.length})
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {employee.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {employee.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.employeeId} • {employee.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{employee.position}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{employee.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{employee.branch}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={employee.performance.rating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                          ({employee.performance.rating})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        color={getStatusColor(employee.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.access.lastLogin || 'Never'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setEmployeeDialogOpen(true);
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
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setSelectedEmployee(employee);
                            setAnchorEl(e.currentTarget);
                          }}
                        >
                          <MoreVert />
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuList>
          <ListItemButton onClick={() => {
            setConfirmDialog({ 
              open: true, 
              action: selectedEmployee?.status === 'Active' ? 'deactivate' : 'activate',
              employee: selectedEmployee 
            });
            setAnchorEl(null);
          }}>
            <ListItemIcon>
              {selectedEmployee?.status === 'Active' ? <Block /> : <CheckCircle />}
            </ListItemIcon>
            <ListItemText>
              {selectedEmployee?.status === 'Active' ? 'Deactivate' : 'Activate'}
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => {
            setConfirmDialog({ open: true, action: 'delete', employee: selectedEmployee });
            setAnchorEl(null);
          }}>
            <ListItemIcon><Delete /></ListItemIcon>
            <ListItemText>Delete Employee</ListItemText>
          </ListItemButton>
        </MenuList>
      </Menu>

      {/* Employee Details Dialog */}
      <Dialog open={employeeDialogOpen} onClose={() => setEmployeeDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Employee Details - {selectedEmployee?.name}</Typography>
            <Chip
              label={selectedEmployee?.status}
              color={getStatusColor(selectedEmployee?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Personal Info" />
              <Tab label="Performance" />
              <Tab label="Access & Security" />
              <Tab label="Attendance" />
            </Tabs>
          )}
          
          <TabPanel value={activeTab} index={0}>
            {selectedEmployee && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon><Person /></ListItemIcon>
                      <ListItemText primary="Employee ID" secondary={selectedEmployee.employeeId} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Email /></ListItemIcon>
                      <ListItemText primary="Email" secondary={selectedEmployee.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Phone /></ListItemIcon>
                      <ListItemText primary="Phone" secondary={selectedEmployee.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Work /></ListItemIcon>
                      <ListItemText primary="Position" secondary={selectedEmployee.position} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon><Business /></ListItemIcon>
                      <ListItemText primary="Department" secondary={selectedEmployee.department} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText primary="Branch" secondary={selectedEmployee.branch} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday /></ListItemIcon>
                      <ListItemText primary="Joining Date" secondary={selectedEmployee.joiningDate} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><MonetizationOn /></ListItemIcon>
                      <ListItemText primary="Salary" secondary={`₹${selectedEmployee.salary.toLocaleString()}`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {selectedEmployee && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Performance Rating</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Rating value={selectedEmployee.performance.rating} readOnly />
                        <Typography variant="h5">{selectedEmployee.performance.rating}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Last Review: {selectedEmployee.performance.lastReview}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>KPI Score</Typography>
                      <Typography variant="h4" color="primary">{selectedEmployee.performance.kpiScore}%</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedEmployee.performance.kpiScore} 
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Current Goals</Typography>
                      <Typography variant="body1">{selectedEmployee.performance.goals}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            {selectedEmployee && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Access Level</Typography>
                      <Chip label={selectedEmployee.access.level} color="primary" sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        Last Login: {selectedEmployee.access.lastLogin || 'Never'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Permissions</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedEmployee.access.permissions.map((permission, index) => (
                          <Chip key={index} label={permission} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            {selectedEmployee && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h4" color="success.main">
                        {selectedEmployee.attendance.present}
                      </Typography>
                      <Typography variant="body2">Present</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h4" color="error.main">
                        {selectedEmployee.attendance.absent}
                      </Typography>
                      <Typography variant="body2">Absent</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h4" color="warning.main">
                        {selectedEmployee.attendance.late}
                      </Typography>
                      <Typography variant="body2">Late</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h4" color="primary.main">
                        {selectedEmployee.attendance.percentage}%
                      </Typography>
                      <Typography variant="body2">Attendance</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmployeeDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>Edit Employee</Button>
        </DialogActions>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={addEmployeeOpen} onClose={() => setAddEmployeeOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={newEmployee.name}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={newEmployee.email}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Phone"
                fullWidth
                required
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Position</InputLabel>
                <Select
                  value={newEmployee.position}
                  label="Position"
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, position: e.target.value }))}
                >
                  {positions.map(pos => (
                    <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newEmployee.department}
                  label="Department"
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={newEmployee.branch}
                  label="Branch"
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, branch: e.target.value }))}
                >
                  {branches.map(branch => (
                    <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Salary"
                type="number"
                fullWidth
                required
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Joining Date"
                type="date"
                fullWidth
                required
                value={newEmployee.joiningDate}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, joiningDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                value={newEmployee.address}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, address: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEmployeeOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddEmployee}
            disabled={loading || !newEmployee.name || !newEmployee.email}
            startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, action: '', employee: null })}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmDialog.action} {confirmDialog.employee?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, action: '', employee: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmDialog.action === 'delete' ? 'error' : 'primary'}
            onClick={() => handleEmployeeAction(confirmDialog.action, confirmDialog.employee?.id)}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeManagement;
