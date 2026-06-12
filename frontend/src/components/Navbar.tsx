import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/acm-logo.svg" alt="ACM Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="text-gradient">ACM</span>
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <a href="#domains">Domains</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div style={{ display: 'flex', gap: '10px' }}>
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
