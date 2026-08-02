import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const { data } = await API.post('/auth/admin/register', { name, email, password });
      setMsg(`✅ User ${data.name} created successfully!`);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">👤 Add New Admin User</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {msg && <p className="text-success text-sm text-center">{msg}</p>}
          {error && <p className="text-error text-sm text-center">{error}</p>}
          <button type="submit" className="btn btn-accent w-full">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;