import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  AccountBalance, 
  Security, 
  TrendingUp, 
  Support,
  CreditCard,
  AttachMoney,
  AccountBalanceWallet,
  CreditScore,
  Savings,
  LocalAtm,
  MonetizationOn,
  TrendingDown,
  Calculate,
  LocationOn,
  Phone,
  Email,
  Schedule,
  Assessment,
  PieChart,
  BarChart,
  Star,
  StarBorder,
  Shield,
  Speed,
  MobileFriendly,
  Notifications,
  CloudDownload,
  CompareArrows,
  AccountTree,
  BusinessCenter,
  Home,
  DirectionsCar,
  School,
  HealthAndSafety,
  TravelExplore,
  ShoppingCart,
  Restaurant,
  LocalHospital,
  Flight
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Savings & Current Accounts',
      description: 'Zero balance savings accounts and business current accounts with unlimited transactions and digital banking features.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Bank-Grade Security',
      description: 'Advanced encryption, secure authentication, and industry-leading security measures protecting your transactions.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fixed Deposits & Loans',
      description: 'High-yield fixed deposits with flexible tenures and quick personal/home loans with competitive interest rates.'
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'OBS Mobile Banking',
      description: '24/7 banking with secure login, instant transactions, and comprehensive digital services on your mobile.'
    }
  ];

  const quickServices = [
    { icon: <CompareArrows />, title: 'Fund Transfer', desc: 'Instant money transfer' },
    { icon: <CreditCard />, title: 'Bill Payments', desc: 'Pay utility bills' },
    { icon: <AccountBalanceWallet />, title: 'Recharge', desc: 'Mobile & DTH recharge' },
    { icon: <LocalAtm />, title: 'ATM Locator', desc: 'Find nearest ATM' },
    { icon: <Assessment />, title: 'Statements', desc: 'Download statements' },
    { icon: <MonetizationOn />, title: 'Apply for Loan', desc: 'Quick loan application' },
    { icon: <Savings />, title: 'Open FD', desc: 'Fixed deposit online' },
    { icon: <CreditScore />, title: 'Credit Score', desc: 'Check credit score' }
  ];

  const investmentProducts = [
    { 
      icon: <TrendingUp sx={{ color: 'success.main' }} />, 
      title: 'Mutual Funds', 
      desc: 'SIP starting from ₹500',
      rate: '12-15% returns'
    },
    { 
      icon: <PieChart sx={{ color: 'info.main' }} />, 
      title: 'Fixed Deposits', 
      desc: 'Flexible tenure options',
      rate: '6.5-7.5% p.a.'
    },
    { 
      icon: <BarChart sx={{ color: 'warning.main' }} />, 
      title: 'Recurring Deposits', 
      desc: 'Monthly saving plans',
      rate: '6.0-7.0% p.a.'
    },
    { 
      icon: <Shield sx={{ color: '#9c27b0' }} />, 
      title: 'Insurance Plans', 
      desc: 'Life & health coverage',
      rate: 'Tax benefits'
    }
  ];

  const digitalTools = [
    { icon: <MobileFriendly />, title: 'Mobile Banking', desc: 'Bank on the go' },
    { icon: <Notifications />, title: 'SMS Alerts', desc: 'Transaction notifications' },
    { icon: <CloudDownload />, title: 'e-Statements', desc: 'Paperless banking' },
    { icon: <Calculate />, title: 'Calculators', desc: 'EMI & savings calculators' }
  ];

  const interestRates = [
    { product: 'Savings Account', rate: '4.0% p.a.', features: 'No minimum balance' },
    { product: 'Fixed Deposit', rate: '7.5% p.a.', features: 'Senior citizen: 8.0%' },
    { product: 'Home Loan', rate: '8.5% p.a.', features: 'Processing fee waived' },
    { product: 'Personal Loan', rate: '10.5% p.a.', features: 'Quick approval' }
  ];

  const loanCategories = [
    { icon: <Home />, title: 'Home Loan', rate: '8.5%', amount: 'Up to ₹5 Cr' },
    { icon: <DirectionsCar />, title: 'Car Loan', rate: '9.0%', amount: 'Up to ₹1 Cr' },
    { icon: <BusinessCenter />, title: 'Business Loan', rate: '11.0%', amount: 'Up to ₹10 Cr' },
    { icon: <School />, title: 'Education Loan', rate: '8.0%', amount: 'Up to ₹1.5 Cr' }
  ];

  const billPaymentCategories = [
    { icon: <LocalHospital />, title: 'Healthcare', color: 'error.main' },
    { icon: <Flight />, title: 'Travel', color: 'info.main' },
    { icon: <ShoppingCart />, title: 'Shopping', color: 'success.main' },
    { icon: <Restaurant />, title: 'Food & Dining', color: 'warning.main' },
    { icon: <TravelExplore />, title: 'Entertainment', color: 'secondary.main' },
    { icon: <HealthAndSafety />, title: 'Insurance', color: 'primary.main' }
  ];

  useScrollReveal();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'primary.main', // Solid black background
      color: 'white'
    }}>
      {/* Header */}
      <Box sx={{ 
        py: 2, 
        px: 3, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalance sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            OBS Banking System
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(247, 247, 247, 0.98)'
              }
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: 'white', 
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: 'white' // Explicit white color
            }}>
              OBS Banking Services
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 4, 
              opacity: 0.9,
              lineHeight: 1.6,
              color: 'white' // Explicit white color
            }}>
              Comprehensive banking solutions designed to meet all your financial needs. 
              From basic accounts to advanced investment products, experience secure and 
              reliable digital banking with OBS.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  backgroundColor: 'white', 
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }
                }}
                onClick={() => navigate('/register')}
              >
                Open Account Today
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
                onClick={() => navigate('/services')}
              >
                Explore Our Services
              </Button>
              <Button 
                variant="text" 
                size="large"
                sx={{ 
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                Existing Customer
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <CreditCard sx={{ fontSize: 120, opacity: 0.8 }} />
                <AttachMoney sx={{ fontSize: 80, opacity: 0.6 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Quick Services Section - Enhanced Center Alignment */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: 'white',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}>
            Quick Banking Services
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            opacity: 0.9,
            color: 'white',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6
          }}>
            Access your most-used banking services instantly
          </Typography>
          <Box sx={{ 
            width: 80, 
            height: 4, 
            bgcolor: 'white', 
            mx: 'auto',
            borderRadius: 2,
            mb: 6,
            opacity: 0.8
          }} />
        </Box>
        
        {/* Enhanced Services Grid with Perfect Center Alignment */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              {quickServices.map((service, index) => (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
                  key={index} 
                  data-reveal={`delay-${(index % 5) + 1}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: { 
                      xs: '100%', 
                      sm: '280px', 
                      md: '250px',
                      lg: '280px' 
                    },
                    width: '100%'
                  }}
                >
                  <Card sx={{ 
                    height: '100%',
                    width: '100%',
                    maxWidth: '250px',
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: '2px solid transparent',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 25px 50px rgba(255,255,255,0.2)',
                      border: '2px solid rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,1)'
                    }
                  }}
                  onClick={() => navigate('/login')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 4 } }}>
                      <Box sx={{ 
                        color: 'primary.main', 
                        mb: 2,
                        '& svg': { 
                          fontSize: { xs: 36, md: 40 },
                          transition: 'all 0.3s ease'
                        },
                        '&:hover svg': {
                          transform: 'scale(1.1)'
                        }
                      }}>
                        {service.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 'bold', 
                        mb: 1,
                        fontSize: { xs: '0.95rem', md: '1.1rem' },
                        color: '#000'
                      }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                        lineHeight: 1.5
                      }}>
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Investment Products Section - Enhanced Center Alignment */}
      <Box sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        py: 10 
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 'bold',
              mb: 3,
              color: 'white',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}>
              Investment & Savings Products
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              opacity: 0.9,
              color: 'white',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Grow your wealth with our competitive investment options
            </Typography>
            <Box sx={{ 
              width: 80, 
              height: 4, 
              bgcolor: 'white', 
              mx: 'auto',
              borderRadius: 2,
              mb: 6,
              opacity: 0.8
            }} />
          </Box>
          
          {/* Enhanced Investment Cards Grid */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                {investmentProducts.map((product, index) => (
                  <Grid 
                    size={{ xs: 12, sm: 6, md: 6, lg: 3 }} 
                    key={index} 
                    data-reveal={`delay-${(index % 5) + 1}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      maxWidth: { 
                        xs: '100%', 
                        sm: '350px', 
                        md: '300px',
                        lg: '280px' 
                      },
                      width: '100%'
                    }}
                  >
                    <Card sx={{ 
                      height: '100%',
                      width: '100%',
                      maxWidth: '280px',
                      backgroundColor: 'rgba(255,255,255,0.98)',
                      cursor: 'pointer',
                      borderRadius: 4,
                      border: '2px solid transparent',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                      mx: 'auto',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 25px 50px rgba(255,255,255,0.2)',
                        border: '2px solid rgba(255,255,255,0.8)',
                        backgroundColor: 'rgba(255,255,255,1)'
                      }
                    }}
                    onClick={() => navigate('/register')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {product.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold', 
                      mb: 1 
                    }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      mb: 2
                    }}>
                      {product.desc}
                    </Typography>
                    <Box sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold'
                    }}>
                      {product.rate}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          </Box>
        </Box>
        </Container>
      </Box>

      {/* Loan Categories Section - Enhanced Center Alignment */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: 'white',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}>
            Loan Solutions
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            opacity: 0.9,
            color: 'white',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6
          }}>
            Competitive rates with quick approval process
          </Typography>
          <Box sx={{ 
            width: 80, 
            height: 4, 
            bgcolor: 'white', 
            mx: 'auto',
            borderRadius: 2,
            mb: 6,
            opacity: 0.8
          }} />
        </Box>
        
        {/* Enhanced Loan Cards Grid */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
              {loanCategories.map((loan, index) => (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 6, lg: 3 }} 
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: { 
                      xs: '100%', 
                      sm: '350px', 
                      md: '300px',
                      lg: '280px' 
                    },
                    width: '100%'
                  }}
                >
                  <Card sx={{ 
                    height: '100%',
                    width: '100%',
                    maxWidth: '280px',
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: '2px solid transparent',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                    mx: 'auto',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 25px 50px rgba(255,255,255,0.2)',
                      border: '2px solid rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,1)'
                    }
                  }}
                  onClick={() => navigate('/register')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 4 } }}>
                      <Box sx={{ 
                        color: 'primary.main', 
                        mb: 3,
                        '& svg': { 
                          fontSize: { xs: 36, md: 44 },
                          transition: 'all 0.3s ease'
                        },
                        '&:hover svg': {
                          transform: 'scale(1.1)'
                        }
                      }}>
                        {loan.icon}
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 'bold', 
                        mb: 2,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        color: '#000'
                      }}>
                        {loan.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'success.main',
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}>
                        Starting at {loan.rate} p.a.
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.85rem', md: '0.9rem' }
                      }}>
                        {loan.amount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            </Box>
          </Box>
        </Container>

      {/* Bill Payment Categories */}
      <Box sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        py: 8 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            textAlign: 'center', 
            mb: 2,
            fontWeight: 'bold',
            color: 'white'
          }}>
            Bill Payments & Recharge
          </Typography>
          <Typography variant="h6" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            opacity: 0.9,
            color: 'white'
          }}>
            Pay all your bills and recharge services in one place
          </Typography>
          
          <Grid container spacing={3}>
            {billPaymentCategories.map((category, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate('/login')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ 
                      color: category.color, 
                      mb: 1,
                      '& svg': { fontSize: 28 }
                    }}>
                      {category.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}>
                      {category.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Interest Rates Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ 
          textAlign: 'center', 
          mb: 2,
          fontWeight: 'bold',
          color: 'white'
        }}>
          Current Interest Rates
        </Typography>
        <Typography variant="h6" sx={{ 
          textAlign: 'center', 
          mb: 6, 
          opacity: 0.9,
          color: 'white'
        }}>
          Competitive rates updated daily
        </Typography>
        
        <Grid container spacing={3}>
          {interestRates.map((rate, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ 
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    color: 'primary.main'
                  }}>
                    {rate.product}
                  </Typography>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 'bold',
                    color: 'success.main',
                    mb: 1
                  }}>
                    {rate.rate}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary'
                  }}>
                    {rate.features}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Digital Tools Section */}
      <Box sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        py: 8 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            textAlign: 'center', 
            mb: 2,
            fontWeight: 'bold',
            color: 'white'
          }}>
            Digital Banking Tools
          </Typography>
          <Typography variant="h6" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            opacity: 0.9,
            color: 'white'
          }}>
            Modern tools for seamless banking experience
          </Typography>
          
          <Grid container spacing={4}>
            {digitalTools.map((tool, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate('/login')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      color: 'primary.main', 
                      mb: 2,
                      '& svg': { fontSize: 40 }
                    }}>
                      {tool.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold', 
                      mb: 1 
                    }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary'
                    }}>
                      {tool.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact & Support Section */}
      <Box sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        py: 8 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            textAlign: 'center', 
            mb: 2,
            fontWeight: 'bold',
            color: 'white'
          }}>
            24/7 Customer Support
          </Typography>
          <Typography variant="h6" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            opacity: 0.9,
            color: 'white'
          }}>
            We're here to help you anytime, anywhere
          </Typography>
          
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                textAlign: 'center'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Phone sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Call Us
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    1800-123-4567
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Toll-free 24/7
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                textAlign: 'center'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Email sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Email Support
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    support@obsbank.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Response within 24 hours
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                textAlign: 'center'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Branch Locator
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    500+ Branches
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Across India
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ 
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 4,
          p: 6
        }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: 'white'
          }}>
            Ready to Start Your Banking Journey?
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 4, 
            opacity: 0.9,
            color: 'white'
          }}>
            Join millions of satisfied customers and experience the future of banking
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: 'white', 
                color: 'primary.main',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Open Account Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Login to Your Account
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Features Section - Enhanced Center Alignment */}
      <Box sx={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        py: 10 
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 'bold',
              mb: 3,
              color: 'white',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}>
              Why Choose OBS Banking?
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              opacity: 0.9,
              color: 'white',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Discover the features that make us the preferred choice for modern banking
            </Typography>
            <Box sx={{ 
              width: 80, 
              height: 4, 
              bgcolor: 'white', 
              mx: 'auto',
              borderRadius: 2,
              mb: 6,
              opacity: 0.8
            }} />
          </Box>
          
          {/* Enhanced Features Grid */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                {features.map((feature, index) => (
                  <Grid 
                    size={{ xs: 12, sm: 6, md: 6, lg: 3 }} 
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      maxWidth: { 
                        xs: '100%', 
                        sm: '350px', 
                        md: '300px',
                        lg: '280px' 
                      },
                      width: '100%'
                    }}
                  >
                    <Card sx={{ 
                      height: '100%',
                      width: '100%',
                      maxWidth: '280px',
                      backgroundColor: 'rgba(255,255,255,0.98)',
                      color: 'text.primary',
                      borderRadius: 4,
                      border: '2px solid transparent',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                      mx: 'auto',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 25px 50px rgba(255,255,255,0.2)',
                        border: '2px solid rgba(255,255,255,0.8)',
                        backgroundColor: 'rgba(255,255,255,1)'
                      }
                    }}>
                      <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 4 } }}>
                        <Box sx={{ 
                          mb: 3,
                          '& svg': {
                            fontSize: { xs: 36, md: 44 },
                            transition: 'all 0.3s ease'
                          },
                          '&:hover svg': {
                            transform: 'scale(1.1)'
                          }
                        }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 'bold', 
                          mb: 2,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          color: '#000'
                        }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          fontSize: { xs: '0.85rem', md: '0.9rem' }
                        }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        py: 4, 
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.2)'
      }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 OBS Banking System. All rights reserved. | Secure • Reliable • Modern
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
