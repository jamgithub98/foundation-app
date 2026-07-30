import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-16">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form onSubmit={submitHandler} className="mt-4">
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input input-bordered w-full mb-3" required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full mb-3" required />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;