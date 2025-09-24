import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  AccountBalance,
  Savings,
  Business,
  TrendingUp,
  Home,
  CreditCard,
  Security,
  PhoneAndroid,
  Fingerprint,
  AccessTime,
  Shield,
  Star,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OBSServicesPage = () => {
  const navigate = useNavigate();

  const accountTypes = [
    {
      icon: <Savings sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Savings Accounts',
      description: 'Open zero balance savings account with attractive interest rates and digital banking features.',
      features: ['Zero balance requirement', 'Attractive interest rates', 'Digital banking features', 'ATM/Debit card included']
    },
    {
      icon: <Business sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Current Accounts',
      description: 'Business accounts with unlimited transactions, online banking, and merchant services.',
      features: ['Unlimited transactions', 'Online banking', 'Merchant services', 'Business-focused features']
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Fixed Deposits',
      description: 'High-yield fixed deposits with flexible tenures and competitive interest rates.',
      features: ['High-yield returns', 'Flexible tenures', 'Competitive rates', 'Auto-renewal options']
    },
    {
      icon: <Home sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Home Loans',
      description: 'Affordable home loans with flexible EMI options and attractive interest rates.',
      features: ['Competitive interest rates', 'Flexible EMI options', 'Quick processing', 'Minimal documentation']
    }
  ];

  const appFeatures = [
    {
      icon: <Fingerprint />,
      title: 'Biometric Login',
      description: 'Secure login with fingerprint and face recognition. No need to remember complex passwords.'
    },
    {
      icon: <CreditCard />,
      title: 'Fund Transfers',
      description: 'Instant money transfers using NEFT, RTGS, and IMPS. Send money to any bank account.'
    },
    {
      icon: <AccessTime />,
      title: 'Bill Payments',
      description: 'Pay utility bills, credit cards, and insurance premiums. Set up automatic payments and reminders.'
    },
    {
      icon: <TrendingUp />,
      title: 'Investment Tools',
      description: 'Manage mutual funds, fixed deposits, and investments. Track portfolio performance and market updates.'
    }
  ];

  const trustIndicators = [
    { label: 'Regulated Banking', value: 'Ensuring highest security standards' },
    { label: 'Bank-Grade Security', value: 'Advanced encryption & OTP authentication' },
    { label: 'Years of Trust', value: 'Trusted banking partner' },
    { label: 'Extensive Branch Network', value: 'Multiple locations for your convenience' },
    { label: 'ATM Network', value: 'Wide ATM network access' },
    { label: '24/7 Customer Support', value: 'Round-the-clock assistance' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 8,
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            OBS Banking Services
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, textAlign: 'center', mb: 4 }}>
            Comprehensive banking solutions designed to meet all your financial needs
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' }
              }}
              onClick={() => navigate('/register')}
            >
              Open Account Today
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
              onClick={() => navigate('/login')}
            >
              Login to Your Account
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Account Types */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
          Our Banking Products
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {accountTypes.map((account, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    {account.icon}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 2 }}>
                      {account.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {account.description}
                  </Typography>
                  <List dense>
                    {account.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* OBS Mobile Banking */}
        <Paper sx={{ p: 6, mb: 8, bgcolor: 'primary.main', color: 'white' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneAndroid sx={{ fontSize: 48, mr: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  OBS Mobile Banking
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Download OBS mobile app and carry your bank in your pocket. 
                Enjoy secure, convenient banking with biometric login and 24/7 access to all banking services.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Chip label="Google Play Store" color="secondary" />
                <Chip label="App Store" color="secondary" />
              </Box>
              <Button 
                variant="contained" 
                size="large"
                sx={{ bgcolor: 'white', color: 'primary.main' }}
              >
                Download OBS Mobile App
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {appFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {feature.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Trust Indicators */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
          Trusted by Millions Since 1806
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {trustIndicators.map((indicator, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Star sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {indicator.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {indicator.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready to Start Your Banking Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
            Join millions of customers who trust OBS for their banking needs
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
            >
              Open Account Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/login')}
            >
              Existing Customer Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OBSServicesPage;
