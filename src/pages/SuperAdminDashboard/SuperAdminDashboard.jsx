import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    phoneNumber: '',
    aadhaarNumber: ''
  });

  const [editProfile, setEditProfile] = useState({
    phoneNumber: '',
    aadhaarNumber: ''
  });

  const roles = ['USER', 'EMPLOYEE', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'];

  useEffect(() => {
    if (user?.role === 'SUPER_ADMIN') {
      fetchUsers();
      fetchStats();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/super-admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/super-admin/stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      await api.put(`/super-admin/users/${userId}/promote`);
      await fetchUsers();
      await fetchStats();
      alert('User promoted successfully');
    } catch (error) {
      alert('Error promoting user: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDemoteUser = async (userId) => {
    try {
      await api.put(`/super-admin/users/${userId}/demote`);
      await fetchUsers();
      await fetchStats();
      alert('User demoted successfully');
    } catch (error) {
      alert('Error demoting user: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleSetRole = async (userId, role) => {
    try {
      await api.put(`/super-admin/users/${userId}/role`, { role });
      await fetchUsers();
      await fetchStats();
      alert('User role updated successfully');
    } catch (error) {
      alert('Error updating role: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`/super-admin/users/${userId}`);
        await fetchUsers();
        await fetchStats();
        alert('User deleted successfully');
      } catch (error) {
        alert('Error deleting user: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleResetPassword = async (userId) => {
    const newPassword = prompt('Enter new password (min 6 characters):');
    if (newPassword && newPassword.length >= 6) {
      try {
        await api.put(`/super-admin/users/${userId}/reset-password`, { password: newPassword });
        alert('Password reset successfully');
      } catch (error) {
        alert('Error resetting password: ' + (error.response?.data?.error || error.message));
      }
    } else if (newPassword) {
      alert('Password must be at least 6 characters');
    }
  };

  const handleToggleLock = async (userId) => {
    try {
      await api.put(`/super-admin/users/${userId}/toggle-lock`);
      await fetchUsers();
      alert('User lock status updated successfully');
    } catch (error) {
      alert('Error updating lock status: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/super-admin/users', newUser);
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        phoneNumber: '',
        aadhaarNumber: ''
      });
      setShowCreateUser(false);
      await fetchUsers();
      await fetchStats();
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/super-admin/users/${selectedUser.id}/profile`, editProfile);
      setShowUserProfile(false);
      await fetchUsers();
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile: ' + (error.response?.data?.error || error.message));
    }
  };

  if (user?.role !== 'SUPER_ADMIN') {
    return <div className="access-denied">Access Denied: Super Admin privileges required</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="super-admin-dashboard">
      <h1>Super Admin Dashboard</h1>
      
      {/* Statistics Section */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p className="stat-number active">{stats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Locked Users</h3>
            <p className="stat-number locked">{stats.lockedUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Super Admins</h3>
            <p className="stat-number">{stats.superAdmins}</p>
          </div>
          <div className="stat-card">
            <h3>Admins</h3>
            <p className="stat-number">{stats.admins}</p>
          </div>
          <div className="stat-card">
            <h3>Managers</h3>
            <p className="stat-number">{stats.managers}</p>
          </div>
          <div className="stat-card">
            <h3>Employees</h3>
            <p className="stat-number">{stats.employees}</p>
          </div>
          <div className="stat-card">
            <h3>Users</h3>
            <p className="stat-number">{stats.users}</p>
          </div>
        </div>
      )}

      {/* Actions Section */}
      <div className="actions-section">
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateUser(true)}
        >
          Create New User
        </button>
      </div>

      {/* Users Table */}
      <div className="users-section">
        <h2>User Management</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <select 
                      value={user.role} 
                      onChange={(e) => handleSetRole(user.id, e.target.value)}
                      disabled={user.role === 'SUPER_ADMIN' && user.id !== user.id}
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className={`status ${user.active ? 'active' : 'inactive'} ${user.locked ? 'locked' : ''}`}>
                      {user.locked ? 'Locked' : user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handlePromoteUser(user.id)}
                        disabled={user.role === 'SUPER_ADMIN'}
                      >
                        ↑
                      </button>
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={() => handleDemoteUser(user.id)}
                        disabled={user.role === 'USER'}
                      >
                        ↓
                      </button>
                      <button 
                        className="btn btn-sm btn-info"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserProfile(true);
                          setEditProfile({ phoneNumber: '', aadhaarNumber: '' });
                        }}
                      >
                        Profile
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        Reset Pwd
                      </button>
                      <button 
                        className={`btn btn-sm ${user.locked ? 'btn-success' : 'btn-warning'}`}
                        onClick={() => handleToggleLock(user.id)}
                      >
                        {user.locked ? 'Unlock' : 'Lock'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === 'SUPER_ADMIN'}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Aadhaar Number:</label>
                <input
                  type="text"
                  value={newUser.aadhaarNumber}
                  onChange={(e) => setNewUser({...newUser, aadhaarNumber: e.target.value})}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Create User</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateUser(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile for {selectedUser.username}</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={editProfile.phoneNumber}
                  onChange={(e) => setEditProfile({...editProfile, phoneNumber: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Aadhaar Number:</label>
                <input
                  type="text"
                  value={editProfile.aadhaarNumber}
                  onChange={(e) => setEditProfile({...editProfile, aadhaarNumber: e.target.value})}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update Profile</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowUserProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;