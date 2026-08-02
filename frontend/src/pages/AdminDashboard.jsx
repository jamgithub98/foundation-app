import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Project States
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editUploading, setEditUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    fetchProjects();
  }, [user, loading, navigate]);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Image Upload for Add
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

  // Add Project
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

  // Delete Project
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

  // --- Edit Functions ---
  const openEditModal = (project) => {
    setEditId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditCategory(project.category || '');
    setEditImageUrl(project.imageUrl);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditId('');
    setEditTitle('');
    setEditDescription('');
    setEditCategory('');
    setEditImageUrl('');
  };

  // Image Upload for Edit
  const editUploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setEditUploading(true);
    try {
      const { data } = await API.post('/upload', formData);
      setEditImageUrl(data.imageUrl);
      alert('✅ New image uploaded successfully!');
    } catch (err) {
      alert('❌ Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setEditUploading(false);
    }
  };

  // Update Project
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/projects/${editId}`, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        imageUrl: editImageUrl,
      });
      alert('✅ Project updated successfully!');
      closeEditModal();
      fetchProjects();
    } catch (error) {
      alert('❌ Error updating project: ' + (error.response?.data?.message || error.message));
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
    <div className="p-4 md:p-8 pt-60 max-w-6xl mx-auto">
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
              <div className="badge badge-primary badge-outline mt-2">{p.category}</div>
              <div className="card-actions justify-end mt-4">
                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(p)}
                  className="btn btn-primary btn-sm"
                >
                  ✏️ Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deleteHandler(p._id)}
                  className="btn btn-error btn-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Edit Modal (Popup) --- */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="modal-box relative bg-base-100 p-6 rounded-xl shadow-2xl max-w-lg w-full">
            <h3 className="font-bold text-2xl mb-4">✏️ Edit Project</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <textarea
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="input input-bordered w-full"
              />
              <div>
                <p className="text-sm font-semibold mb-1">Current Image:</p>
                <img src={editImageUrl} alt="Current" className="h-20 w-20 object-cover rounded-lg border" />
                <input
                  type="file"
                  onChange={editUploadFileHandler}
                  className="file-input file-input-bordered w-full mt-2"
                  accept="image/*"
                />
                {editUploading && <span className="ml-2 text-primary">Uploading...</span>}
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary flex-1" disabled={editUploading}>
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="btn btn-ghost flex-1"
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

export default AdminDashboard;