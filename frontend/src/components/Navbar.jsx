import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// cSpell:ignore Ettihad
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDrawerOpen(false);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="drawer z-50">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      <div className="drawer-content">
        <div className="navbar bg-base-100 shadow-md px-4 fixed top-0">
          <div className="flex-1">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <Link to="/" className="btn btn-ghost text-xl font-bold text-primary" onClick={closeDrawer}>
              ❤️ Ettihad Foundation
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="menu menu-horizontal px-1 gap-1">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="flex-none">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link to="/admin" onClick={closeDrawer}>📊 Dashboard</Link></li>
                  <li><Link to="/change-password" onClick={closeDrawer}>🔒 Change Password</Link></li>
                  <li><Link to="/add-user" onClick={closeDrawer}>👤 Add New Admin</Link></li>
                  <li><hr className="my-1" /></li>
                  <li><button onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            )}
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><Link to="/" onClick={closeDrawer}>🏠 Home</Link></li>
          <li><Link to="/about" onClick={closeDrawer}>ℹ️ About</Link></li>
          <li><Link to="/projects" onClick={closeDrawer}>📁 Projects</Link></li>
          <li><Link to="/contact" onClick={closeDrawer}>📞 Contact</Link></li>
          {user && (
            <>
              <div className="divider"></div>
              <li><Link to="/admin" onClick={closeDrawer}>⚙️ Dashboard</Link></li>
              <li><Link to="/change-password" onClick={closeDrawer}>🔒 Change Password</Link></li>
              <li><Link to="/add-user" onClick={closeDrawer}>👤 Add New Admin</Link></li>
              <li><button onClick={handleLogout}>🚪 Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;