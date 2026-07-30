import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="text-4xl font-bold text-center mb-10">Our Projects</h1>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects added yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure><img src={p.imageUrl} alt={p.title} className="h-56 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title">{p.title}</h2>
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="badge badge-primary badge-outline mt-2">{p.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;