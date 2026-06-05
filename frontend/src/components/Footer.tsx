const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} ACM Shivalik Student Chapter. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>Shivalik College of Engineering, Dehradun</p>
      </div>
    </footer>
  );
};

export default Footer;
