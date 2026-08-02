import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    fetchProjects();
  }, [user, loading, navigate]);

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

  const submitHandler = async (e) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pt-40 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 Project Management</h1>

      {/* Add Project Form */}
      <div className="card bg-base-100 shadow-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={submitHandler} className="space-y-4">
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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