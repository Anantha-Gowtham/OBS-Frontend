import axios from 'axios';

const API_BASE_URL = '/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.isRefreshing = false;
    this.refreshQueue = [];

    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry && localStorage.getItem('refreshToken')) {
          original._retry = true;
          try {
            const newToken = await this.performTokenRefresh();
            if (newToken) {
              original.headers['Authorization'] = 'Bearer ' + newToken;
              return this.api(original);
            }
          } catch (_) { /* ignore */ }
        }
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.Authorization;
    }
  }

  async performTokenRefresh() {
    if (this.isRefreshing) {
      return new Promise((resolve) => this.refreshQueue.push(resolve));
    }
    this.isRefreshing = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return null;
      const resp = await this.api.post('/auth/refresh', { refreshToken });
      const newToken = resp.token || resp.accessToken;
      const newRefresh = resp.refreshToken;
      if (newToken) {
        localStorage.setItem('authToken', newToken);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
        this.setAuthToken(newToken);
        this.refreshQueue.forEach(r => r(newToken));
        this.refreshQueue = [];
        return newToken;
      }
      return null;
    } catch (e) {
      this.refreshQueue.forEach(r => r(null));
      this.refreshQueue = [];
      return null;
    } finally {
      this.isRefreshing = false;
    }
  }

  // Auth endpoints
  async login(username, password) {
    try {
      const resp = await this.api.post('/auth/login', { username, password });
      // resp already equals response.data due to interceptor
      const token = resp.token || resp.accessToken;
      const refreshToken = resp.refreshToken;
      const user = resp.user || { id: resp.id, username: resp.username, email: resp.email, role: resp.role };
      if (token) {
        localStorage.setItem('authToken', token);
        this.setAuthToken(token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
      }
      return resp;
    } catch (error) {
      throw (error?.message ? new Error(error.message) : error);
    }
  }

  async verifyOTP(email, otp) {
    try {
      const response = await this.api.post('/auth/verify-otp', { email, otp });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(username) {
  return await this.api.post('/auth/refresh', { refreshToken: localStorage.getItem('refreshToken') });
  }

  async logout() {
    return await this.api.post('/auth/logout');
  }

  async register(userData) {
    const resp = await this.api.post('/auth/register', userData);
    // On some flows, registration might also return token+user
    const token = resp.token || resp.accessToken;
    const refreshToken = resp.refreshToken;
    const user = resp.user || (resp.id ? { id: resp.id, username: resp.username, email: resp.email, role: resp.role } : null);
    if (token) {
      localStorage.setItem('authToken', token);
      this.setAuthToken(token);
    }
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    if (user) localStorage.setItem('userData', JSON.stringify(user));
    return resp;
  }

  async forgotPassword(email) {
    return await this.api.post('/auth/forgot-password', { email });
  }

  async resetPassword(token, newPassword) {
    return await this.api.post('/auth/reset-password', { token, newPassword });
  }

  // Health check
  async healthCheck() {
    return await this.api.get('/health');
  }

  // Admin endpoints
  async getAllUsers() {
    return await this.api.get('/admin/users');
  }

  async createUser(userData) {
    return await this.api.post('/admin/users', userData);
  }

  async updateUser(userId, userData) {
    return await this.api.put(`/admin/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return await this.api.delete(`/admin/users/${userId}`);
  }

  async unlockAccount(userId) {
    return await this.api.post(`/admin/users/${userId}/unlock`);
  }

  async getAllBranches() {
    return await this.api.get('/admin/branches');
  }

  async getBranchesPaged(page = 0, size = 10) {
    return await this.api.get(`/admin/branches?page=${page}&size=${size}`);
  }

  async createBranch(branchData) {
    return await this.api.post('/admin/branches', branchData);
  }

  async updateBranch(branchId, branchData) {
    return await this.api.put(`/admin/branches/${branchId}`, branchData);
  }

  async deleteBranch(branchId) {
    return await this.api.delete(`/admin/branches/${branchId}`);
  }

  // Branch audit endpoints
  async getRecentBranchAudits() {
  return await this.api.get('/admin/branches/audits');
  }

  async getBranchAudits(branchId) {
  return await this.api.get(`/admin/branches/${branchId}/audits`);
  }

  async getSystemReports() {
    return await this.api.get('/admin/reports');
  }

  async getSecurityLogs() {
    return await this.api.get('/admin/security-logs');
  }

  // Manager endpoints
  async getPendingLoans() {
    return await this.api.get('/manager/loans/pending');
  }

  async approveLoan(loanId, decision) {
    return await this.api.post(`/manager/loans/${loanId}/approve`, { decision });
  }

  async getBranchReports() {
    return await this.api.get('/manager/reports/branch');
  }

  async getEmployeePerformance() {
    return await this.api.get('/manager/employees/performance');
  }

  // Employee endpoints
  async getPendingKYC() {
    return await this.api.get('/employee/kyc/pending');
  }

  async processKYC(kycId, decision, comments) {
    return await this.api.post(`/employee/kyc/${kycId}/process`, { decision, comments });
  }

  async getPendingTransactions() {
    return await this.api.get('/employee/transactions/pending');
  }

  async flagTransaction(transactionId, reason) {
    return await this.api.post(`/employee/transactions/${transactionId}/flag`, { reason });
  }

  async getPendingAccounts() {
    return await this.api.get('/employee/accounts/pending');
  }

  async processAccountOpening(accountId, decision) {
    return await this.api.post(`/employee/accounts/${accountId}/process`, { decision });
  }

  // User endpoints
  async getUserAccounts() {
    return await this.api.get('/user/accounts');
  }

  async getAccountTransactions(accountId, page = 0, size = 10) {
    return await this.api.get(`/user/accounts/${accountId}/transactions?page=${page}&size=${size}`);
  }

  async transferMoney(transferData) {
    return await this.api.post('/user/transfer', transferData);
  }

  async applyLoan(loanData) {
    return await this.api.post('/user/loans/apply', loanData);
  }

  async getLoanApplications() {
    return await this.api.get('/user/loans');
  }

  async updateProfile(profileData) {
    return await this.api.put('/user/profile', profileData);
  }

  async changePassword(oldPassword, newPassword) {
    return await this.api.post('/user/change-password', { oldPassword, newPassword });
  }

  async updateSettings(settingsData) {
    return await this.api.put('/user/settings', settingsData);
  }

  async getLoginHistory() {
    return await this.api.get('/user/login-history');
  }
}

const apiService = new ApiService();
export default apiService;
