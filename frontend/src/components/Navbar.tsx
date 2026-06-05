import { Link, NavLink } from 'react-router-dom';
import Magnetic from './Magnetic';
import GlitchText from './GlitchText';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Magnetic>
          <Link to="/" className="logo text-gradient" style={{ display: 'inline-block' }}>
            <GlitchText text="ACM Shivalik" />
          </Link>
        </Magnetic>
        <ul className="nav-links">
          <li>
            <Magnetic>
              <a href="#home">Home</a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#about">About</a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#events">Events</a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#domains">Domains</a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#team">Team</a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#contact">Contact</a>
            </Magnetic>
          </li>
        </ul>
        <Magnetic>
          <Link to="/membership" className="btn-primary">
            Join Us
          </Link>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Navbar;
