# OBS Frontend - Online Banking System

## 🏦 Overview
Modern React-based frontend for the Online Banking System (OBS) with comprehensive banking features including account management, transactions, card services, and administrative tools.

## 🚀 Tech Stack
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Modern styling with flexbox/grid
- **Axios** - HTTP client for API calls

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- OBS Backend running on `http://localhost:8085/api`

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Anantha-Gowtham/OBS-Frontend.git
cd OBS-Frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8085/api
VITE_APP_NAME=OBS Banking System
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 🏗️ Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (buttons, inputs, etc.)
│   ├── cards/           # Card-related components
│   ├── dashboard/       # Dashboard widgets
│   └── forms/           # Form components
├── contexts/            # React Context providers
│   ├── AuthContext.js   # Authentication context
│   └── BankingContext.js # Banking operations context
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
├── pages/               # Page components
│   ├── auth/            # Login, register, forgot password
│   ├── dashboard/       # User dashboard
│   ├── accounts/        # Account management
│   ├── transactions/    # Transaction history
│   ├── cards/          # Card management
│   ├── transfers/      # Money transfers
│   └── admin/          # Admin pages
├── routes/              # Route configurations
├── services/            # API service functions
├── styles/              # CSS stylesheets
└── utils/               # Utility functions
```

## 🔐 Authentication System
- JWT-based authentication
- Role-based access control (USER, EMPLOYEE, MANAGER, ADMIN, SUPER_ADMIN)
- Protected routes with automatic token refresh
- Secure logout and session management

## 💳 Banking Features

### User Features
- **Account Dashboard** - Balance overview, recent transactions
- **Account Management** - View accounts, statements, account details
- **Money Transfers** - Internal transfers, beneficiary management
- **Bill Payments** - Utility bills, mobile recharge, loan payments
- **Card Services** - Card management, limits, activation/deactivation
- **Standing Instructions** - Automated recurring payments
- **Investment Services** - Fixed deposits, mutual funds
- **Transaction History** - Detailed transaction logs with search/filter

### Administrative Features
- **User Management** - Create, update, deactivate users
- **Transaction Monitoring** - Real-time transaction oversight
- **System Analytics** - Banking statistics and reports
- **Role Management** - User role assignments

## 🔌 API Integration
The frontend integrates with the OBS Backend through RESTful APIs:
- **Base URL**: `http://localhost:8085/api`
- **Authentication**: JWT Bearer tokens
- **Error Handling**: Comprehensive error responses

## 🧪 Development

### Vite Configuration
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 🔗 Related Repositories
- **Backend**: [OBS-Backend](https://github.com/Anantha-Gowtham/OBS-Backend)

*Built with ❤️ for modern banking experiences*
