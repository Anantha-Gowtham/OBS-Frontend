// Card Utilities for OBS Banking System

// Card Networks
export const CARD_NETWORKS = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  RUPAY: 'RUPAY'
};

// Card Types
export const CARD_TYPES = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT'
};

// Card Tiers with balance requirements and benefits
export const CARD_TIERS = {
  BASIC: {
    name: 'Basic',
    type: 'BASIC',
    minBalance: 0,
    maxBalance: 50000,
    annualFee: 0,
    benefits: ['ATM Access', 'Online Shopping', 'Basic Insurance'],
    color: '#6B7280',
    isDefault: true
  },
  SILVER: {
    name: 'Silver',
    type: 'SILVER',
    minBalance: 50000,
    maxBalance: 200000,
    annualFee: 500,
    benefits: ['All Basic Benefits', 'Reward Points', 'Purchase Protection', 'Emergency Card Replacement'],
    color: '#9CA3AF',
    creditLimit: 100000
  },
  GOLD: {
    name: 'Gold',
    type: 'GOLD',
    minBalance: 200000,
    maxBalance: 500000,
    annualFee: 1500,
    benefits: ['All Silver Benefits', 'Travel Insurance', 'Airport Lounge Access', 'Concierge Service'],
    color: '#F59E0B',
    creditLimit: 500000
  },
  PLATINUM: {
    name: 'Platinum',
    type: 'PLATINUM',
    minBalance: 500000,
    maxBalance: 1000000,
    annualFee: 5000,
    benefits: ['All Gold Benefits', 'Premium Travel Insurance', 'Golf Course Access', 'Personal Shopper'],
    color: '#8B5CF6',
    creditLimit: 1000000
  },
  TITANIUM: {
    name: 'Titanium',
    type: 'TITANIUM',
    minBalance: 1000000,
    maxBalance: 2500000,
    annualFee: 10000,
    benefits: ['All Platinum Benefits', 'Dedicated Relationship Manager', 'Priority Banking', 'Investment Advisory'],
    color: '#374151',
    creditLimit: 2000000
  },
  BLACK: {
    name: 'Black Elite',
    type: 'BLACK',
    minBalance: 2500000,
    maxBalance: Infinity,
    annualFee: 25000,
    benefits: ['All Titanium Benefits', 'Unlimited Airport Lounge', 'Luxury Hotel Discounts', 'Private Banking'],
    color: '#000000',
    creditLimit: 5000000,
    inviteOnly: true
  }
};

// Generate card number based on network
export const generateCardNumber = (network = 'RUPAY') => {
  let prefix;
  switch (network) {
    case 'VISA':
      prefix = '4';
      break;
    case 'MASTERCARD':
      prefix = '5';
      break;
    case 'RUPAY':
    default:
      prefix = '6';
      break;
  }
  
  // Generate 15 more digits
  let cardNumber = prefix;
  for (let i = 0; i < 15; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  
  return cardNumber;
};

// Generate CVV
export const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

// Generate expiry date (3 years from now)
export const generateExpiryDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 3);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
};

// Format card number for display (XXXX XXXX XXXX XXXX)
export const formatCardNumber = (cardNumber) => {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};

// Mask card number for security
export const maskCardNumber = (cardNumber) => {
  return cardNumber.replace(/(.{4})(.*)(.{4})/, '$1 **** **** $3');
};

// Check if user is eligible for card tier based on balance
export const checkCardEligibility = (userBalance, cardTier) => {
  const tier = CARD_TIERS[cardTier];
  if (!tier) return false;
  
  return userBalance >= tier.minBalance;
};

// Get eligible card tiers for user based on balance
export const getEligibleCardTiers = (userBalance) => {
  return Object.entries(CARD_TIERS)
    .filter(([, tier]) => userBalance >= tier.minBalance)
    .map(([key, tier]) => ({ ...tier, type: key }));
};

// Get next upgrade tier
export const getNextUpgradeTier = (currentTier, userBalance) => {
  const tiers = ['BASIC', 'SILVER', 'GOLD', 'PLATINUM', 'TITANIUM', 'BLACK'];
  const currentIndex = tiers.indexOf(currentTier);
  
  if (currentIndex === -1 || currentIndex === tiers.length - 1) return null;
  
  for (let i = currentIndex + 1; i < tiers.length; i++) {
    const tier = CARD_TIERS[tiers[i]];
    if (userBalance >= tier.minBalance) {
      return { ...tier, type: tiers[i] };
    }
  }
  
  return null;
};

// Calculate card tier based on balance
export const calculateCardTier = (balance) => {
  const eligible = getEligibleCardTiers(balance);
  if (eligible.length === 0) return CARD_TIERS.BASIC;
  
  // Return the highest eligible tier
  return eligible[eligible.length - 1];
};

// Create default card for new user
export const createDefaultCard = (userId, accountNumber, userBalance = 0) => {
  const tier = calculateCardTier(userBalance);
  const cardNumber = generateCardNumber('RUPAY');
  const cvv = generateCVV();
  const expiryDate = generateExpiryDate();
  
  return {
    userId,
    accountNumber,
    cardNumber,
    cvv,
    expiryDate,
    cardType: CARD_TYPES.DEBIT,
    cardTier: tier.type,
    cardNetwork: CARD_NETWORKS.RUPAY,
    cardName: `${tier.name} Debit Card`,
    isActive: true,
    isBlocked: false,
    dailyLimit: tier.type === 'BASIC' ? 25000 : 100000,
    monthlyLimit: tier.type === 'BASIC' ? 200000 : 1000000,
    createdAt: new Date().toISOString(),
    benefits: tier.benefits,
    annualFee: tier.annualFee,
    color: tier.color
  };
};