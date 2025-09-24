import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Search, Visibility } from '@mui/icons-material';
import apiService from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const emptyBranch = {
  branchCode: '',
  branchName: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  phoneNumber: '',
  email: '',
  active: true
};

const ManageBranches = () => {
  const { isDemoMode } = useAuth();
  
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyBranch);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [auditOpen, setAuditOpen] = useState(false);
  const [audits, setAudits] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditBranch, setAuditBranch] = useState(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return branches.filter(b =>
      b.branchCode?.toLowerCase().includes(term) ||
      b.branchName?.toLowerCase().includes(term) ||
      b.city?.toLowerCase().includes(term) ||
      b.state?.toLowerCase().includes(term)
    );
  }, [branches, search]);

  const loadBranches = async () => {
    setLoading(true); 
    setError('');
    try {
      let data;
      if (isDemoMode) {
        // Use demo data for branches
        data = [
          {
            id: 1,
            branchCode: 'OBS001',
            branchName: 'Main Branch',
            address: '123 Banking Street',
            city: 'Metro City',
            state: 'Central State',
            pincode: '12345',
            phoneNumber: '+1-555-0101',
            email: 'main@obs.com',
            active: true
          },
          {
            id: 2,
            branchCode: 'OBS002',
            branchName: 'Downtown Branch',
            address: '456 Commerce Ave',
            city: 'Metro City',
            state: 'Central State',
            pincode: '12346',
            phoneNumber: '+1-555-0102',
            email: 'downtown@obs.com',
            active: true
          },
          {
            id: 3,
            branchCode: 'OBS003',
            branchName: 'Suburban Branch',
            address: '789 Residential Lane',
            city: 'Suburb City',
            state: 'Central State',
            pincode: '12347',
            phoneNumber: '+1-555-0103',
            email: 'suburban@obs.com',
            active: false
          }
        ];
      } else {
        data = await apiService.getAllBranches();
      }
      setBranches(data);
    } catch (e) {
      console.warn('Error loading branches:', e);
      if (!isDemoMode) {
        // Fallback to demo data if real API fails
        const demoData = [
          {
            id: 1,
            branchCode: 'OBS001',
            branchName: 'Main Branch',
            address: '123 Banking Street',
            city: 'Metro City',
            state: 'Central State',
            pincode: '12345',
            phoneNumber: '+1-555-0101',
            email: 'main@obs.com',
            active: true
          }
        ];
        setBranches(demoData);
        setError('Backend unavailable - showing demo data');
      } else {
        setError(e.message || 'Failed to load branches');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBranches(); }, []);

  const openCreate = () => {
    setForm(emptyBranch); setEditingId(null); setDialogOpen(true);
  };
  const openEdit = (branch) => {
    setForm({
      branchCode: branch.branchCode,
      branchName: branch.branchName,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      pincode: branch.pincode,
      phoneNumber: branch.phoneNumber,
      email: branch.email,
      active: branch.active
    });
    setEditingId(branch.id); setDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = (e) => {
    setForm(prev => ({ ...prev, active: e.target.checked }));
  };

  const validate = () => {
    if (!form.branchCode.trim() || !form.branchName.trim()) return false;
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return false;
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) return false;
    return true;
  };

  const saveBranch = async () => {
    if (!validate()) { setError('Please fill required fields correctly'); return; }
    setSaving(true); setError('');
    try {
      if (editingId) {
        await apiService.updateBranch(editingId, form);
      } else {
        await apiService.createBranch(form);
      }
      setDialogOpen(false);
      await loadBranches();
    } catch (e) {
      setError(e.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const deleteBranch = async () => {
    if (!confirmDelete) return;
    setSaving(true); setError('');
    try {
      await apiService.deleteBranch(confirmDelete.id);
      setConfirmDelete(null);
      await loadBranches();
    } catch (e) {
      setError(e.message || 'Delete failed');
    } finally { setSaving(false); }
  };

  const openAudits = async (branch) => {
    setAuditBranch(branch);
    setAuditOpen(true);
    setAuditLoading(true);
    try {
      const data = await apiService.getBranchAudits(branch.id);
      setAudits(data);
    } catch (e) {
      setAudits([]);
    } finally { setAuditLoading(false); }
  };

  const openRecentAudits = async () => {
    setAuditBranch(null);
    setAuditOpen(true);
    setAuditLoading(true);
    try {
      const data = await apiService.getRecentBranchAudits();
      setAudits(data);
    } catch (e) { setAudits([]); } finally { setAuditLoading(false); }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>Branch Management</Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="Refresh"><span><IconButton onClick={loadBranches} disabled={loading}><Refresh /></IconButton></span></Tooltip>
          <Tooltip title="View Recent Audits"><span><IconButton onClick={openRecentAudits}><Visibility /></IconButton></span></Tooltip>
          <Button variant="contained" startIcon={<Add />} onClick={openCreate}>New Branch</Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Search by code, name, city, state"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <Search sx={{ mr: 1, opacity: 0.6 }} /> }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Total: {filtered.length} {filtered.length === 1 ? 'branch' : 'branches'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.branchCode}</TableCell>
                  <TableCell>{row.branchName}</TableCell>
                  <TableCell>{row.city || '-'}</TableCell>
                  <TableCell>{row.state || '-'}</TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block">{row.phoneNumber || '-'}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.email || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={row.active ? 'Active' : 'Inactive'} color={row.active ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => openEdit(row)}><Edit fontSize="inherit" /></IconButton></Tooltip>
                    <Tooltip title="Audits"><IconButton size="small" color="primary" onClick={() => openAudits(row)}><Visibility fontSize="inherit" /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => setConfirmDelete(row)}><Delete fontSize="inherit" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>No branches found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create / Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => !saving && setDialogOpen(false)} 
        fullWidth 
        maxWidth="md"
        aria-labelledby="branch-dialog-title"
        disableRestoreFocus={false}
      >
        <DialogTitle id="branch-dialog-title">
          {editingId ? 'Edit Branch' : 'Create Branch'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Branch Code"
                name="branchCode"
                fullWidth
                value={form.branchCode}
                onChange={handleChange}
                required
                disabled={!!editingId}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label="Branch Name"
                name="branchName"
                fullWidth
                value={form.branchName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={form.address}
                onChange={handleChange}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="City" name="city" fullWidth value={form.city} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="State" name="state" fullWidth value={form.state} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="Pincode" name="pincode" fullWidth value={form.pincode} onChange={handleChange} inputProps={{ maxLength: 6 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField label="Phone" name="phoneNumber" fullWidth value={form.phoneNumber} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Email" name="email" type="email" fullWidth value={form.email} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} display="flex" alignItems="center">
              <FormControlLabel control={<Switch checked={form.active} onChange={handleToggleActive} />} label={form.active ? 'Active' : 'Inactive'} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
          <Button onClick={saveBranch} disabled={saving} variant="contained">{saving ? 'Saving...' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog 
        open={!!confirmDelete} 
        onClose={() => !saving && setConfirmDelete(null)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        disableRestoreFocus={false}
        keepMounted={false}
        disableEscapeKeyDown={saving}
      >
        <DialogTitle id="delete-dialog-title">Delete Branch</DialogTitle>
        <DialogContent dividers>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete branch <strong>{confirmDelete?.branchCode}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmDelete(null)} 
            disabled={saving}
            autoFocus
          >
            Cancel
          </Button>
          <Button 
            color="error" 
            onClick={deleteBranch} 
            disabled={saving} 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Audit Dialog */}
      <Dialog 
        open={auditOpen} 
        onClose={() => setAuditOpen(false)} 
        fullWidth 
        maxWidth="md"
        aria-labelledby="audit-dialog-title"
        disableRestoreFocus={false}
      >
        <DialogTitle id="audit-dialog-title">
          {auditBranch ? `Branch Audits - ${auditBranch.branchCode}` : 'Recent Branch Audits'}
        </DialogTitle>
        <DialogContent dividers>
          {auditLoading ? (
            <Box display="flex" justifyContent="center" py={4}><CircularProgress size={32} /></Box>
          ) : audits.length === 0 ? (
            <Typography color="text.secondary" align="center" py={3}>No audit records found.</Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Branch Code</TableCell>
                  <TableCell>Actor</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audits.map(a => (
                  <TableRow key={a.id} hover>
                    <TableCell>{new Date(a.timestamp).toLocaleString()}</TableCell>
                    <TableCell><Chip label={a.action} size="small" color={a.action === 'DELETE' ? 'error' : a.action === 'UPDATE' ? 'warning' : 'success'} /></TableCell>
                    <TableCell>{a.branchCode}</TableCell>
                    <TableCell>{a.actor || '-'}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="caption" sx={{ whiteSpace: 'pre-wrap' }}>{a.details}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuditOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageBranches;
