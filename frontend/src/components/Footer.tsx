const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        <div className="social-links" style={{ display: 'flex', gap: '20px' }}>
          <a 
            href="https://www.instagram.com/acm_sgoc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNwsth==" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#E1306C'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#0077B5'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1DA1F2'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} ACM Shivalik Student Chapter. All rights reserved.</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Shivalik College of Engineering, Dehradun</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
