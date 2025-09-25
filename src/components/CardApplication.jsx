import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  CreditCard,
  CheckCircle,
  Cancel,
  Star,
  Security,
  FlightTakeoff,
  LocalOffer,
  AccountBalance,
  Email
} from '@mui/icons-material';
import { CARD_TIERS, CARD_NETWORKS, CARD_TYPES, checkCardEligibility, getEligibleCardTiers } from '../utils/cardUtils.js';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const CardApplication = ({ open, onClose, userBalance, existingCards }) => {
  const { user } = useAuth();
  const [selectedCard, setSelectedCard] = useState(null);
  const [applicationStep, setApplicationStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [applicationData, setApplicationData] = useState({
    cardType: CARD_TYPES.DEBIT,
    cardNetwork: CARD_NETWORKS.RUPAY,
    cardTier: 'SILVER'
  });

  const steps = ['Select Card', 'Review Application', 'Submit Application'];
  const eligibleTiers = getEligibleCardTiers(userBalance || 0);

  const handleCardSelection = (tierKey, tier) => {
    setSelectedCard({ ...tier, type: tierKey });
    setApplicationData(prev => ({ ...prev, cardTier: tierKey }));
  };

  const handleSubmitApplication = async () => {
    if (!selectedCard) return;

    setLoading(true);
    setError('');
    
    try {
      // Check eligibility one more time
      if (!checkCardEligibility(userBalance, selectedCard.type)) {
        throw new Error(`You don't meet the minimum balance requirement of ₹${selectedCard.minBalance.toLocaleString()} for ${selectedCard.name} card.`);
      }

      const applicationPayload = {
        cardType: applicationData.cardType,
        cardNetwork: applicationData.cardNetwork,
        cardTier: selectedCard.type,
        requestedCreditLimit: selectedCard.creditLimit || 0
      };

      const response = await apiService.applyForCard(applicationPayload);
      
      if (response.success) {
        setSuccess(`${selectedCard.name} card application submitted successfully! You will receive your card via encrypted email within 2-3 business days.`);
        setApplicationStep(2);
        
        // Send encrypted card details via email
        await apiService.sendEncryptedCardEmail({
          cardId: response.cardId,
          userEmail: user.email,
          cardTier: selectedCard.type
        });
      } else {
        throw new Error(response.message || 'Card application failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCardTier = (tierKey, tier) => {
    const isEligible = checkCardEligibility(userBalance, tierKey);
    const hasCard = existingCards?.some(card => card.cardTier === tierKey);
    
    return (
      <Grid item xs={12} md={6} key={tierKey}>
        <Card 
          sx={{ 
            height: '100%', 
            border: selectedCard?.type === tierKey ? 2 : 1,
            borderColor: selectedCard?.type === tierKey ? 'primary.main' : 'divider',
            cursor: isEligible && !hasCard ? 'pointer' : 'default',
            opacity: !isEligible || hasCard ? 0.6 : 1,
            '&:hover': isEligible && !hasCard ? { transform: 'translateY(-2px)' } : {}
          }}
          onClick={() => isEligible && !hasCard && handleCardSelection(tierKey, tier)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CreditCard sx={{ color: tier.color, mr: 1, fontSize: 32 }} />
              <Box>
                <Typography variant="h6" sx={{ color: tier.color }}>
                  {tier.name} Card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Annual Fee: ₹{tier.annualFee.toLocaleString()}
                </Typography>
              </Box>
              {hasCard && (
                <Chip label="Owned" color="success" size="small" sx={{ ml: 'auto' }} />
              )}
            </Box>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Min. Balance: ₹{tier.minBalance.toLocaleString()}
            </Typography>

            <List dense>
              {tier.benefits.slice(0, 3).map((benefit, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={benefit} 
                    primaryTypographyProps={{ variant: 'body2' }} 
                  />
                </ListItem>
              ))}
            </List>

            {!isEligible && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Insufficient balance. Need ₹{(tier.minBalance - userBalance).toLocaleString()} more.
              </Alert>
            )}

            {hasCard && (
              <Alert severity="info" sx={{ mt: 2 }}>
                You already have this card tier.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderApplicationReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Application Review</Typography>
      
      <Card sx={{ mb: 3, background: selectedCard?.color, color: 'white' }}>
        <CardContent>
          <Typography variant="h5">{selectedCard?.name} Card</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            {applicationData.cardNetwork} • {applicationData.cardType}
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Annual Fee</Typography>
              <Typography variant="h6">₹{selectedCard?.annualFee.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Credit Limit</Typography>
              <Typography variant="h6">
                {selectedCard?.creditLimit ? `₹${selectedCard.creditLimit.toLocaleString()}` : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="subtitle1" gutterBottom>Benefits Include:</Typography>
      <List>
        {selectedCard?.benefits.map((benefit, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Star sx={{ color: 'gold' }} />
            </ListItemIcon>
            <ListItemText primary={benefit} />
          </ListItem>
        ))}
      </List>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <Email sx={{ fontSize: 16, mr: 1 }} />
          Your card details will be sent to {user?.email} in an encrypted document. 
          The password will be your date of birth (YYYY-MM-DD format).
        </Typography>
      </Alert>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CreditCard sx={{ mr: 1 }} />
          Apply for New Card
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={applicationStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {applicationStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Card Tier
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your current balance: ₹{userBalance?.toLocaleString() || '0'}
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(CARD_TIERS).map(([tierKey, tier]) => 
                renderCardTier(tierKey, tier)
              )}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Card Type</InputLabel>
                <Select
                  value={applicationData.cardType}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, cardType: e.target.value }))}
                >
                  <MenuItem value={CARD_TYPES.DEBIT}>Debit Card</MenuItem>
                  <MenuItem value={CARD_TYPES.CREDIT}>Credit Card</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Card Network</InputLabel>
                <Select
                  value={applicationData.cardNetwork}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, cardNetwork: e.target.value }))}
                >
                  <MenuItem value={CARD_NETWORKS.RUPAY}>RuPay</MenuItem>
                  <MenuItem value={CARD_NETWORKS.VISA}>Visa</MenuItem>
                  <MenuItem value={CARD_NETWORKS.MASTERCARD}>Mastercard</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}

        {applicationStep === 1 && renderApplicationReview()}

        {applicationStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Application Submitted!</Typography>
            <Typography variant="body1" color="text.secondary">
              Your {selectedCard?.name} card application has been submitted successfully.
              You will receive your card details via encrypted email within 2-3 business days.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {applicationStep === 2 ? 'Close' : 'Cancel'}
        </Button>
        
        {applicationStep === 0 && (
          <Button 
            variant="contained" 
            onClick={() => setApplicationStep(1)}
            disabled={!selectedCard}
          >
            Next
          </Button>
        )}
        
        {applicationStep === 1 && (
          <>
            <Button onClick={() => setApplicationStep(0)}>
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitApplication}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Application'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CardApplication;