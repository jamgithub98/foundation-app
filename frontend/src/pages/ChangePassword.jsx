import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const { data } = await API.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setMsg(data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Optionally redirect after success
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">🔒 Change Password</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="New Password (min 6 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {msg && <p className="text-success text-sm text-center">{msg}</p>}
          {error && <p className="text-error text-sm text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;