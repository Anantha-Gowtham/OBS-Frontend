import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        apiService.setAuthToken(token);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await apiService.login(username, password);
      
      if (response.success && (response.requiresOtp || response.requiresOTP)) {
        return {
          success: true,
          requiresOTP: true,
          email: response.email,
          message: response.message
        };
      }
      
      if (response.success && response.token) {
        const { token, user: userData } = response;
        
        // Store authentication data
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        
        setUser(userData);
        setIsAuthenticated(true);
        apiService.setAuthToken(token);
        
        return {
          success: true,
          user: userData,
          message: 'Login successful'
        };
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      
      const response = await apiService.verifyOTP(email, otp);
      
      if (response.success) {
        const { token, user: userData } = response;
        
        // Store auth data
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Set context state
        setUser(userData);
        setIsAuthenticated(true);
        apiService.setAuthToken(token);
        
        return {
          success: true,
          user: userData,
          message: response.message
        };
      }
      
      return response;
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: error.message || 'OTP verification failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await apiService.forgotPassword(email);
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send reset email'
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      const response = await apiService.resetPassword(token, newPassword);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: error.message || 'Password reset failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('refreshToken');
    
    // Clear context state
    setUser(null);
    setIsAuthenticated(false);
    apiService.setAuthToken(null);
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const isSuperAdmin = () => hasRole('SUPER_ADMIN');
  const isAdmin = () => hasRole('ADMIN');
  const isManager = () => hasRole('MANAGER');
  const isCustomer = () => hasRole('USER');

  const refreshToken = async () => {
    if (!user) return null;
    try {
      const resp = await apiService.refreshToken(user.username);
      if (resp.success && resp.token) {
        localStorage.setItem('authToken', resp.token);
        apiService.setAuthToken(resp.token);
        return resp.token;
      }
    } catch (e) { /* ignore */ }
    return null;
  };

  const serverLogout = async () => {
    try { await apiService.logout(); } catch (e) { /* ignore */ }
    logout();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    verifyOTP,
    register,
    forgotPassword,
    resetPassword,
    logout,
    hasRole,
    isSuperAdmin,
    isAdmin,
    isManager,
    isCustomer,
    refreshToken,
    serverLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
