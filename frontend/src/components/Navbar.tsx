import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={closeMenu}>
          <img src="/images/acm-logo.svg" alt="ACM Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="text-gradient">ACM</span>
        </Link>
        
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <a href="#home" onClick={closeMenu}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={closeMenu}>About</a>
          </li>
          <li>
            <a href="#events" onClick={closeMenu}>Events</a>
          </li>
          <li>
            <a href="#domains" onClick={closeMenu}>Domains</a>
          </li>
          <li>
            <a href="#team" onClick={closeMenu}>Team</a>
          </li>
          <li>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </li>
          <li className="mobile-only-buttons">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
              <Link to="/member-login" className="btn-outline" onClick={closeMenu} style={{ padding: '8px 16px', fontSize: '14px', width: '200px' }}>
                Member Login
              </Link>
              <Link to="/membership" className="btn-primary" onClick={closeMenu} style={{ padding: '8px 16px', fontSize: '14px', width: '200px' }}>
                Join Us
              </Link>
            </div>
          </li>
        </ul>
        <div className="nav-buttons" style={{ display: 'flex', gap: '10px' }}>
          <Link to="/member-login" className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>
            Member Login
          </Link>
          <Link to="/membership" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

