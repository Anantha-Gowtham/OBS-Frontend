import React, { useState } from 'react';
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
  Paper,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Avatar
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
  CheckCircle,
  ArrowForward,
  MonetizationOn,
  Smartphone,
  Language,
  SupportAgent
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OBSServicesPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Service Categories
  const serviceCategories = [
    {
      title: "Banking Products",
      icon: <AccountBalance />,
      services: [
        {
          icon: <Savings sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Savings Accounts',
          description: 'Zero balance savings with attractive interest rates and premium banking features.',
          features: ['Zero balance requirement', '4.5% interest rate', 'Free debit card', 'Digital banking'],
          highlight: 'Most Popular',
          color: '#E8F5E8'
        },
        {
          icon: <Business sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Current Accounts',
          description: 'Business accounts with unlimited transactions and merchant services.',
          features: ['Unlimited transactions', 'Online banking', 'Merchant services', 'Business loans'],
          highlight: 'For Business',
          color: '#E3F2FD'
        },
        {
          icon: <TrendingUp sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Investment Services',
          description: 'Grow your wealth with our investment and mutual fund services.',
          features: ['Mutual funds', 'Fixed deposits', 'Investment advisory', 'Portfolio management'],
          highlight: 'High Returns',
          color: '#FFF3E0'
        },
        {
          icon: <Home sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Home Loans',
          description: 'Affordable home loans with quick approval and competitive rates.',
          features: ['Quick approval', 'Low interest rates', 'Flexible tenure', 'Minimal documentation'],
          highlight: 'Quick Approval',
          color: '#FCE4EC'
        }
      ]
    },
    {
      title: "Digital Services",
      icon: <PhoneAndroid />,
      services: [
        {
          icon: <CreditCard sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Card Management',
          description: 'Complete card solutions with tier-based benefits and rewards.',
          features: ['6-tier card system', 'Reward points', 'Global acceptance', 'Contactless payments'],
          highlight: 'Tier System',
          color: '#F3E5F5'
        },
        {
          icon: <Smartphone sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Mobile Banking',
          description: 'Full-featured mobile app for banking on the go.',
          features: ['Fund transfers', 'Bill payments', 'Account management', 'Investment tracking'],
          highlight: 'Award Winning',
          color: '#E0F2F1'
        },
        {
          icon: <Language sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Internet Banking',
          description: 'Secure online banking with comprehensive features.',
          features: ['24/7 access', 'Multi-factor authentication', 'Transaction history', 'Statement download'],
          highlight: 'Secure',
          color: '#E8EAF6'
        },
        {
          icon: <MonetizationOn sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Bill Payments',
          description: 'Pay all your bills from one convenient platform.',
          features: ['Utility bills', 'Credit card payments', 'Insurance premiums', 'Auto-pay setup'],
          highlight: 'Convenient',
          color: '#FFF8E1'
        }
      ]
    },
    {
      title: "Premium Services",
      icon: <Star />,
      services: [
        {
          icon: <Security sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Wealth Management',
          description: 'Personalized wealth management for high-net-worth individuals.',
          features: ['Personal banker', 'Investment advisory', 'Tax planning', 'Estate planning'],
          highlight: 'VIP Service',
          color: '#F1F8E9'
        },
        {
          icon: <SupportAgent sx={{ fontSize: 40, color: '#000' }} />,
          title: 'Priority Banking',
          description: 'Exclusive banking experience with dedicated support.',
          features: ['Dedicated relationship manager', 'Priority customer service', 'Exclusive rates', 'Premium lounges'],
          highlight: 'Exclusive',
          color: '#EFEBE9'
        }
      ]
    }
  ];

  const trustIndicators = [
    { label: 'Customers Served', value: '10+ Million' },
    { label: 'Years of Excellence', value: '200+ Years' },
    { label: 'Branches Nationwide', value: '5,000+' },
    { label: 'ATMs Available', value: '15,000+' },
    { label: 'Digital Transactions', value: '1 Billion+' },
    { label: 'Customer Satisfaction', value: '98%' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#F5F1E9', // Cream background
      color: 'black'
    }}>
      {/* Modern Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: 'white',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                  lineHeight: 1.2,
                  color: 'white'
                }}
              >
                Modern Banking
                <br />
                <Box component="span" sx={{ color: 'white' }}>
                  Solutions
                </Box>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9, 
                  mb: 4, 
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  color: 'white'
                }}
              >
                Experience next-generation banking with our comprehensive financial services, 
                designed for today's digital world.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    bgcolor: '#F5F1E9', 
                    color: '#000',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: '#E5E1D9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(245,241,233,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate('/register')}
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: '#F5F1E9', 
                    color: '#F5F1E9',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': { 
                      borderColor: '#F5F1E9', 
                      bgcolor: 'rgba(245,241,233,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
              }}>
                <Paper sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(245,241,233,0.1)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: '1px solid rgba(245,241,233,0.2)'
                }}>
                  <Typography variant="h6" sx={{ color: '#F5F1E9', mb: 2 }}>
                    Quick Stats
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F5F1E9' }}>
                        10M+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Happy Customers
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F5F1E9' }}>
                        ₹50K Cr+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Assets Managed
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F5F1E9' }}>
                        5000+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Branches
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F5F1E9' }}>
                        24/7
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Support
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Service Categories with Tabs - Enhanced Layout */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3, 
              color: '#000',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}
          >
            Discover our comprehensive range of banking and financial services designed to meet all your needs
          </Typography>
          <Box sx={{ 
            width: 80, 
            height: 4, 
            bgcolor: '#000', 
            mx: 'auto',
            borderRadius: 2,
            mb: 6
          }} />
        </Box>

        {/* Enhanced Tabs Layout */}
        <Box sx={{ mb: 8 }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange} 
            centered
            variant="fullWidth"
            sx={{ 
              mb: 2,
              '& .MuiTab-root': {
                minWidth: { xs: 120, md: 200 },
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                py: 2,
                borderRadius: 2,
                mx: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  transform: 'translateY(-2px)'
                }
              },
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: 2,
                backgroundColor: '#000'
              },
              '& .Mui-selected': {
                color: '#000 !important',
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            {serviceCategories.map((category, index) => (
              <Tab 
                key={index}
                label={category.title} 
                icon={category.icon}
                iconPosition="start"
                sx={{
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 1
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Enhanced Service Cards Grid - Perfect Center Alignment */}
        <Box sx={{ mb: 10, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '1200px', width: '100%' }}>
            <Grid 
              container 
              spacing={{ xs: 3, md: 4 }} 
              justifyContent="center"
              alignItems="stretch"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > .MuiGrid-item': {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
            >
            {serviceCategories[selectedTab].services.map((service, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={4}
                xl={4}
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: { 
                    xs: '100%', 
                    sm: '400px', 
                    md: '350px',
                    lg: '380px' 
                  },
                  width: '100%'
                }}
              >
                <Card sx={{ 
                  height: '100%',
                  width: '100%',
                  maxWidth: '350px',
                  borderRadius: 4,
                  backgroundColor: service.color,
                  border: '3px solid transparent',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  mx: 'auto',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    border: '3px solid #000',
                    '& .service-avatar': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    },
                    '& .learn-more-btn': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                    }
                  }
                }}>
                  {service.highlight && (
                    <Chip
                      label={service.highlight}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        bgcolor: '#000',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 1,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        className="service-avatar"
                        sx={{ 
                          bgcolor: 'white', 
                          mr: 2, 
                          width: { xs: 52, md: 60 }, 
                          height: { xs: 52, md: 60 },
                          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {service.icon}
                      </Avatar>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: '#000',
                          fontSize: { xs: '1.3rem', md: '1.5rem' }
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3, 
                        color: '#333', 
                        lineHeight: 1.7,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {service.description}
                    </Typography>
                    <List dense sx={{ mb: 4 }}>
                      {service.features.map((feature, fIndex) => (
                        <ListItem key={fIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle sx={{ color: '#000', fontSize: 22 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            sx={{ 
                              '& .MuiListItemText-primary': { 
                                fontSize: '0.95rem',
                                color: '#333',
                                fontWeight: 500
                              } 
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      className="learn-more-btn"
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: '#000',
                        color: 'white',
                        borderRadius: 3,
                        py: { xs: 1.5, md: 2 },
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: '#333'
                        },
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => navigate('/register')}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Trust Indicators */}
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 6, 
            textAlign: 'center',
            color: '#000'
          }}
        >
          Trusted by Millions Since 1806
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {trustIndicators.map((indicator, index) => (
            <Grid item xs={6} md={4} lg={2} key={index}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center', 
                height: '100%',
                borderRadius: 2,
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#000' }}>
                  {indicator.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {indicator.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Final CTA Section */}
        <Paper sx={{ 
          p: { xs: 4, md: 8 }, 
          textAlign: 'center', 
          bgcolor: '#000',
          color: 'white',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: 'white' }}>
            Ready to Experience Modern Banking?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto', color: 'white' }}>
            Join millions of satisfied customers and discover why OBS is the preferred choice for modern banking
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: '#F5F1E9',
                color: '#000',
                px: 4,
                py: 2,
                borderRadius: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#E5E1D9',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 30px rgba(245,241,233,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/register')}
            >
              Open Account Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{
                borderColor: '#F5F1E9',
                color: '#F5F1E9',
                px: 4,
                py: 2,
                borderRadius: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: '#F5F1E9',
                  bgcolor: 'rgba(245,241,233,0.1)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
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
