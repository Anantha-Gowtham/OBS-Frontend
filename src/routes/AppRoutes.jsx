import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

import TestPage from '../pages/TestPage';
import LandingPage from '../pages/LandingPage';
import OBSServicesPage from '../pages/OBSServicesPage';

// Layout components
import AdminLayout from '../layouts/AdminLayout';
import ManagerLayout from '../layouts/ManagerLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';
import UserLayout from '../layouts/UserLayout';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageBranches from '../pages/admin/ManageBranches';
import SecurityReports from '../pages/admin/SecurityReports';
import AccountManagement from '../pages/admin/AccountManagement';
import TransactionMonitoring from '../pages/admin/TransactionMonitoring';
import SystemConfiguration from '../pages/admin/SystemConfiguration';
import ReportingAnalytics from '../pages/admin/ReportingAnalytics';
import DisasterRecovery from '../pages/admin/DisasterRecovery';
import AuditLogs from '../pages/admin/AuditLogs';

// Super Admin pages
import SuperAdminDashboard from '../pages/SuperAdminDashboard/SuperAdminDashboard';

// Manager pages
import ManagerDashboard from '../pages/manager/Dashboard';
import LoanApprovals from '../pages/manager/LoanApprovals';
import BranchReports from '../pages/manager/BranchReports';
import EmployeeManagement from '../pages/manager/EmployeeManagement';

// Employee pages
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';

// User pages
import UserDashboard from '../pages/dashboard/UserDashboard';
import UserAccounts from '../pages/user/Accounts';
import TransferMoney from '../pages/user/TransferMoney';
import ApplyLoan from '../pages/user/ApplyLoan';
import UserProfile from '../pages/user/Profile';
import CardManagement from '../components/CardManagement';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roleList = allowedRoles || (requiredRole ? [requiredRole] : []);
  if (roleList.length && !roleList.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboards = {
      'ADMIN': '/admin/dashboard',
      'MANAGER': '/manager/dashboard',
      'EMPLOYEE': '/employee/dashboard',
      'USER': '/user/dashboard'
    };
    return <Navigate to={roleDashboards[user.role] || '/login'} replace />;
  }

  return children;
};

// Public Route Component (only for non-authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated && user) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboards = {
      'ADMIN': '/admin/dashboard',
      'MANAGER': '/manager/dashboard',
      'EMPLOYEE': '/employee/dashboard',
      'USER': '/user/dashboard'
    };
    return <Navigate to={roleDashboards[user.role] || '/user/dashboard'} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <PageTransition>
    <Routes location={location} key={location.pathname}>
      {/* Public routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      } />
      
      <Route path="/reset-password" element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      } />

      {/* Super Admin routes */}
      <Route path="/super-admin/*" element={
        <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="branches" element={<ManageBranches />} />
        <Route path="security" element={<SecurityReports />} />
        <Route path="accounts" element={<AccountManagement />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="system" element={<SystemConfiguration />} />
        <Route path="reports" element={<ReportingAnalytics />} />
        <Route path="disaster-recovery" element={<DisasterRecovery />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="" element={<Navigate to="/super-admin/dashboard" replace />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={["ADMIN","SUPER_ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="branches" element={<ManageBranches />} />
        <Route path="security" element={<SecurityReports />} />
        <Route path="accounts" element={<AccountManagement />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="system" element={<SystemConfiguration />} />
        <Route path="reports" element={<ReportingAnalytics />} />
        <Route path="disaster-recovery" element={<DisasterRecovery />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* Manager routes */}
      <Route path="/manager/*" element={
        <ProtectedRoute allowedRoles={["MANAGER","ADMIN","SUPER_ADMIN"]}>
          <ManagerLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="loans" element={<LoanApprovals />} />
        <Route path="reports" element={<BranchReports />} />
        <Route path="employees" element={<EmployeeManagement />} />
        <Route path="" element={<Navigate to="/manager/dashboard" replace />} />
      </Route>

      {/* Employee routes */}
      <Route path="/employee/*" element={
        <ProtectedRoute allowedRoles={["EMPLOYEE","MANAGER","ADMIN","SUPER_ADMIN"]}>
          <EmployeeLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="" element={<Navigate to="/employee/dashboard" replace />} />
      </Route>

      {/* User routes */}
      <Route path="/user/*" element={
        <ProtectedRoute allowedRoles={["USER","EMPLOYEE","MANAGER","ADMIN","SUPER_ADMIN"]}>
          <UserLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="accounts" element={<UserAccounts />} />
        <Route path="cards" element={<CardManagement />} />
        <Route path="transfer" element={<TransferMoney />} />
        <Route path="loans" element={<ApplyLoan />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="" element={<Navigate to="/user/dashboard" replace />} />
      </Route>

      {/* Test route */}
      <Route path="/test" element={<TestPage />} />

      {/* OBS Services */}
      <Route path="/services" element={<OBSServicesPage />} />
      
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
  </PageTransition>
  );
};

export default AppRoutes;
