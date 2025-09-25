import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CreditCard,
  MoreVert,
  Block,
  PlayArrow,
  Upgrade,
  ContentCopy,
  Visibility,
  VisibilityOff,
  Star,
  Email
} from '@mui/icons-material';
import { formatCardNumber, maskCardNumber, CARD_TIERS } from '../utils/cardUtils.js';
import CardApplication from './CardApplication';
import apiService from '../services/api';

const CardManagement = () => {
  const [cards, setCards] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCardId, setMenuCardId] = useState(null);

  useEffect(() => {
    loadCards();
    loadUserBalance();
  }, []);

  const loadCards = async () => {
    try {
      const response = await apiService.getUserCards();
      if (response.success) {
        setCards(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserBalance = async () => {
    try {
      const response = await apiService.getAccountSummary();
      if (response.success && response.data?.accounts?.length > 0) {
        const totalBalance = response.data.accounts.reduce((sum, acc) => sum + acc.balance, 0);
        setUserBalance(totalBalance);
      }
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  };

  const handleCardAction = async (cardId, action) => {
    try {
      let response;
      switch (action) {
        case 'block':
          response = await apiService.blockCard(cardId);
          break;
        case 'unblock':
          response = await apiService.unblockCard(cardId);
          break;
        case 'reissue':
          response = await apiService.reissueCard(cardId);
          break;
        default:
          return;
      }

      if (response.success) {
        loadCards(); // Refresh cards
      }
    } catch (error) {
      console.error(`Failed to ${action} card:`, error);
    }
    setAnchorEl(null);
    setMenuCardId(null);
  };

  const toggleCardDetails = (cardId) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const copyCardNumber = (cardNumber) => {
    navigator.clipboard.writeText(cardNumber);
  };

  const handleMenuOpen = (event, cardId) => {
    setAnchorEl(event.currentTarget);
    setMenuCardId(cardId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCardId(null);
  };

  const getCardTierInfo = (tierType) => {
    return CARD_TIERS[tierType] || CARD_TIERS.BASIC;
  };

  const renderCard = (card) => {
    const tierInfo = getCardTierInfo(card.cardTier);
    const isDetailsVisible = showCardDetails[card.id];

    return (
      <Grid item xs={12} md={6} lg={4} key={card.id}>
        <Card 
          sx={{ 
            background: `linear-gradient(135deg, ${tierInfo.color}CC, ${tierInfo.color}88)`,
            color: 'white',
            minHeight: 220,
            position: 'relative',
            '&:hover': { transform: 'translateY(-2px)' }
          }}
        >
          <CardContent>
            {/* Card Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6">{card.cardName || `${tierInfo.name} Card`}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {card.cardNetwork} • {card.cardType}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {card.isBlocked ? (
                  <Chip label="Blocked" color="error" size="small" />
                ) : (
                  <Chip label="Active" color="success" size="small" />
                )}
                <IconButton 
                  size="small" 
                  onClick={(e) => handleMenuOpen(e, card.id)}
                  sx={{ color: 'white', ml: 1 }}
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>

            {/* Card Number */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                {isDetailsVisible ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <IconButton 
                  size="small" 
                  onClick={() => toggleCardDetails(card.id)}
                  sx={{ color: 'white', mr: 1 }}
                >
                  {isDetailsVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => copyCardNumber(card.cardNumber)}
                  sx={{ color: 'white' }}
                >
                  <ContentCopy />
                </IconButton>
              </Box>
            </Box>

            {/* Card Details */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Valid Thru</Typography>
                <Typography variant="body1">{card.expiryDate}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>CVV</Typography>
                <Typography variant="body1">
                  {isDetailsVisible ? card.cvv : '***'}
                </Typography>
              </Box>
            </Box>

            {/* Card Limits */}
            <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Daily Limit</Typography>
                <Typography variant="body2">₹{card.dailyLimit?.toLocaleString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Monthly Limit</Typography>
                <Typography variant="body2">₹{card.monthlyLimit?.toLocaleString()}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return <Box>Loading cards...</Box>;
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">My Cards</Typography>
        <Button 
          variant="contained" 
          startIcon={<CreditCard />}
          onClick={() => setShowApplicationDialog(true)}
        >
          Apply for New Card
        </Button>
      </Box>

      {/* Balance Info */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Your current balance: ₹{userBalance.toLocaleString()} 
          • This determines your card eligibility
        </Typography>
      </Alert>

      {/* Cards Grid */}
      {cards.length > 0 ? (
        <Grid container spacing={3}>
          {cards.map(renderCard)}
        </Grid>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CreditCard sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>No Cards Found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You don't have any cards yet. Apply for your first card to get started.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setShowApplicationDialog(true)}
            >
              Apply for Card
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Card Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleCardAction(menuCardId, 'block')}>
          <ListItemIcon><Block /></ListItemIcon>
          <ListItemText>Block Card</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCardAction(menuCardId, 'unblock')}>
          <ListItemIcon><PlayArrow /></ListItemIcon>
          <ListItemText>Unblock Card</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCardAction(menuCardId, 'reissue')}>
          <ListItemIcon><Email /></ListItemIcon>
          <ListItemText>Reissue Card</ListItemText>
        </MenuItem>
      </Menu>

      {/* Card Application Dialog */}
      <CardApplication
        open={showApplicationDialog}
        onClose={() => setShowApplicationDialog(false)}
        userBalance={userBalance}
        existingCards={cards}
      />
    </Box>
  );
};

export default CardManagement;