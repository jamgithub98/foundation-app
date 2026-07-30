import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200 pt-16">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              Building a <span className="text-secondary">Better</span> Tomorrow
            </h1>
            <p className="py-6 text-lg md:text-xl">
              We are a non-profit foundation dedicated to empowering communities,
              providing education, and bringing positive change to those in need.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/projects" className="btn btn-primary btn-lg">Our Projects</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Get Involved</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="stat shadow-lg bg-base-200 rounded-box p-6">
              <div className="stat-value text-primary">250+</div>
              <div className="stat-title">Lives Impacted</div>
              <div className="stat-desc">Through our various programs</div>
            </div>
            <div className="stat shadow-lg bg-base-200 rounded-box p-6">
              <div className="stat-value text-secondary">15+</div>
              <div className="stat-title">Projects Completed</div>
              <div className="stat-desc">Across education & healthcare</div>
            </div>
            <div className="stat shadow-lg bg-base-200 rounded-box p-6">
              <div className="stat-value text-accent">50+</div>
              <div className="stat-title">Active Volunteers</div>
              <div className="stat-desc">Helping us make a difference</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">🎯 Our Mission</h2>
              <p className="text-lg">
                To empower underprivileged communities through education, 
                healthcare, and sustainable development programs.
              </p>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">🌟 Our Vision</h2>
              <p className="text-lg">
                A world where every individual has access to quality education, 
                proper healthcare, and the opportunity to build a better life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;