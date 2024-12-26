import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/s3.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa'; // Import the shopping bag icon

const Navbar = ({ isLoggedIn, handleLogout, cartCount }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  const handleMenuClick = (menu) => {
    localStorage.setItem('lastVisitedPage', menu);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className='responsive-navbar'>
      <div className="nav-container">
        <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt='Logo' />
          <p>Ti-TECH</p>
        </div>
        <div className={`nav-menu ${isMobile ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink 
                to='/' 
                exact 
                className={({ isActive }) => (isActive ? 'active' : '')} 
                onClick={() => handleMenuClick('/')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/course' 
                className={({ isActive }) => (isActive ? 'active' : '')} 
                onClick={() => handleMenuClick('/course')}>
                Course
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/blog' 
                className={({ isActive }) => (isActive ? 'active' : '')} 
                onClick={() => handleMenuClick('/blog')}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/aboutUs' 
                className={({ isActive }) => (isActive ? 'active' : '')} 
                onClick={() => handleMenuClick('/aboutUs')}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/contact' 
                className={({ isActive }) => (isActive ? 'active' : '')} 
                onClick={() => handleMenuClick('/contact')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <form className="nav-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="nav-search-input"
          />
          <button type="submit" className="nav-search-btn">Search</button>
        </form>

        <div className="nav-actions">
          {isLoggedIn ? (
            <button className="nav-login-btn" onClick={handleLogoutClick}>Logout</button>
          ) : (
            <NavLink to='/login'>
              <button className="nav-login-btn">Login</button>
            </NavLink>
          )}
          <NavLink to='/cart' className="nav-cart">
            <FaShoppingBag className="nav-cart-icon" style={{ color: 'white', fontSize: '24px' }} /> {/* Bag icon */}
            <span className="nav-cart-count">{cartCount}</span>
          </NavLink>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          {isMobile ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
