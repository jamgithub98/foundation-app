import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // --- Project States ---
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // --- Change Password States ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passError, setPassError] = useState('');

  // --- Add User States ---
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [userError, setUserError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    fetchProjects();
  }, [user, loading, navigate]);

  // --- Project Functions ---
  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await API.post('/upload', formData);
      setImageUrl(data.imageUrl);
      alert('✅ Image uploaded successfully!');
    } catch (err) {
      alert('❌ Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const submitProjectHandler = async (e) => {
    e.preventDefault();
    if (!imageUrl) return alert('Please upload an image first');

    try {
      await API.post('/projects', { title, description, imageUrl, category });
      alert('✅ Project created successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setImageUrl('');
      fetchProjects();
    } catch (error) {
      alert('❌ Error creating project: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        alert('❌ Error deleting project');
      }
    }
  };

  // --- Change Password Handler ---
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters');
      return;
    }

    try {
      const { data } = await API.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setPassMsg(data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPassError(error.response?.data?.message || 'Failed to change password');
    }
  };

  // --- Add User Handler ---
  const addUserHandler = async (e) => {
    e.preventDefault();
    setUserMsg('');
    setUserError('');

    if (newPass.length < 6) {
      setUserError('Password must be at least 6 characters');
      return;
    }

    try {
      const { data } = await API.post('/auth/admin/register', {
        name: newName,
        email: newEmail,
        password: newPass,
      });
      setUserMsg(`✅ User ${data.name} created successfully!`);
      setNewName('');
      setNewEmail('');
      setNewPass('');
    } catch (error) {
      setUserError(error.response?.data?.message || 'Failed to create user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pt-24 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* --- GRID: 2 Columns (Project Form left, User/Password right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* LEFT COLUMN: Add Project */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
          <form onSubmit={submitProjectHandler} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g. Education)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full"
            />

            <div>
              <input
                type="file"
                onChange={uploadFileHandler}
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
              {uploading && <span className="ml-2 text-primary">Uploading...</span>}
              {imageUrl && <div className="mt-2 badge badge-success">Image Uploaded ✅</div>}
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
              Add Project
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Change Password & Add User */}
        <div className="flex flex-col gap-6">
          
          {/* Change Password Card */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-3">🔒 Change Password</h2>
            <form onSubmit={changePasswordHandler} className="space-y-3">
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
              {passMsg && <p className="text-success text-sm">{passMsg}</p>}
              {passError && <p className="text-error text-sm">{passError}</p>}
              <button type="submit" className="btn btn-secondary w-full">
                Update Password
              </button>
            </form>
          </div>

          {/* Add New Admin User Card */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-3">👤 Add New Admin User</h2>
            <form onSubmit={addUserHandler} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              {userMsg && <p className="text-success text-sm">{userMsg}</p>}
              {userError && <p className="text-error text-sm">{userError}</p>}
              <button type="submit" className="btn btn-accent w-full">
                Add User
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* --- Projects List (Full Width) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {projects.map((p) => (
          <div key={p._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={p.imageUrl} alt={p.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.title}</h2>
              <p className="truncate">{p.description}</p>
              <div className="card-actions justify-end">
                <button onClick={() => deleteHandler(p._id)} className="btn btn-error btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;