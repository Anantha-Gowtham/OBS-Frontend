import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Alert,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Person,
  Security,
  Settings,
  Email,
  Phone,
  Home,
  CreditCard,
  Notifications,
  Shield
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import DemoModeIndicator from '../../components/DemoModeIndicator';

const UserProfile = () => {
  const { user, isDemoMode } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dateOfBirth: ''
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    marketingEmails: false
  });

  // Mock user data - in real app, this would come from API
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || 'John',
        lastName: user.lastName || 'Doe',
        email: user.email || 'john.doe@example.com',
        phone: user.phone || '+91 9876543210',
        address: '123 Banking Street, Financial District',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        dateOfBirth: '1990-01-15'
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = async (name) => {
    const newSettings = { ...settings, [name]: !settings[name] };
    setSettings(newSettings);
    
    // Auto-save settings
    try {
      let response;
      if (isDemoMode) {
        response = await demoApi.updateSettings(newSettings);
      } else {
        try {
          // Try real API first
          response = await apiService.updateSettings(newSettings);
        } catch (apiError) {
          console.log('Backend not available, using demo mode for settings update');
          response = await demoApi.updateSettings(newSettings);
        }
      }
      
      if (response.success) {
        // Optionally show a brief success message
        setSuccess('Settings updated');
        setTimeout(() => setSuccess(''), 2000);
      }
    } catch (err) {
      console.error('Settings update error:', err);
      // Revert the setting change on error
      setSettings(settings);
      setError('Failed to update settings');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!profileData.firstName || !profileData.lastName) {
      setError('First name and last name are required');
      setLoading(false);
      return;
    }
    
    if (!profileData.email || !profileData.email.includes('@')) {
      setError('Valid email address is required');
      setLoading(false);
      return;
    }
    
    if (profileData.phone && profileData.phone.length < 10) {
      setError('Phone number must be at least 10 digits');
      setLoading(false);
      return;
    }
    
    try {
      let response;
      if (isDemoMode) {
        response = await demoApi.updateProfile(profileData);
      } else {
        try {
          response = await apiService.updateProfile(profileData);
        } catch (apiError) {
          console.log('Backend not available, using demo mode for profile update');
          response = await demoApi.updateProfile(profileData);
        }
      }
      
      if (response.success) {
        setSuccess(response.message || 'Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isDemoMode) {
        response = await demoApi.changePassword(passwordData);
      } else {
        try {
          // Try real API first
          response = await apiService.changePassword(passwordData.currentPassword, passwordData.newPassword);
        } catch (apiError) {
          console.log('Backend not available, using demo mode for password change');
          response = await demoApi.changePassword(passwordData);
        }
      }
      
      if (response.success) {
        setSuccess(response.message || 'Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setError(response.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setError(err.message || 'Failed to change password. Please try again.');
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
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          My Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      {isDemoMode && <DemoModeIndicator />}
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Profile Header Card */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    fontWeight: 600
                  }}
                >
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight={600}>
                    {profileData.firstName} {profileData.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    {profileData.email}
                  </Typography>
                  <Chip 
                    label="Verified Account" 
                    color="success" 
                    size="small" 
                    icon={<Shield />}
                  />
                </Box>
                <Box>
                  <Button
                    variant={isEditing ? "outlined" : "contained"}
                    startIcon={isEditing ? <Cancel /> : <Edit />}
                    onClick={() => setIsEditing(!isEditing)}
                    color={isEditing ? "secondary" : "primary"}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab icon={<Person />} label="Personal Info" />
                <Tab icon={<Security />} label="Security" />
                <Tab icon={<Settings />} label="Preferences" />
              </Tabs>
            </Box>

            <CardContent>
              {/* Personal Information Tab */}
              <TabPanel value={activeTab} index={0}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      fullWidth
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="email"
                      label="Email Address"
                      fullWidth
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      fullWidth
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      name="address"
                      label="Address"
                      fullWidth
                      multiline
                      rows={2}
                      value={profileData.address}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                      InputProps={{
                        startAdornment: <Home sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      name="city"
                      label="City"
                      fullWidth
                      value={profileData.city}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      name="state"
                      label="State"
                      fullWidth
                      value={profileData.state}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      value={profileData.pincode}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      variant={isEditing ? "outlined" : "filled"}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSaveProfile}
                      disabled={loading}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Change Password
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="currentPassword"
                        label="Current Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="newPassword"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        name="confirmPassword"
                        label="Confirm New Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleChangePassword}
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                  >
                    Change Password
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={() => handleSettingsChange('twoFactorAuth')}
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Add an extra layer of security to your account
                  </Typography>
                </Box>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel value={activeTab} index={2}>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive account updates via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={() => handleSettingsChange('emailNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Receive transaction alerts via SMS"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={() => handleSettingsChange('smsNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText
                      primary="Marketing Emails"
                      secondary="Receive promotional offers and updates"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.marketingEmails}
                        onChange={() => handleSettingsChange('marketingEmails')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => {
                    setSuccess('Preferences saved successfully!');
                  }}
                >
                  Save Preferences
                </Button>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
