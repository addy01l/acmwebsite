import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import Magnetic from '../components/Magnetic';
import About from './About';
import Events from './Events';
import Domains from './Domains';
import Team from './Team';
import Contact from './Contact';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-content" style={{ marginTop: '-50px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '20px' }}
          >
            <span className="label-mono" style={{ color: 'var(--accent-primary)', border: '1px solid var(--glass-border)', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(148, 204, 255, 0.05)' }}>
              Association for Computing Machinery — Shivalik
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-title"
          >
            Where engineers build, collaborate, and shape the <br />
            <span className="text-gradient"><GlitchText text="future of technology." /></span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
            style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)' }}
          >
            ACM Chapter Shivalik is the official student chapter of the Association for Computing Machinery at Shivalik College of Engineering, Dehradun.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Magnetic>
              <Link to="/membership" className="btn-primary" style={{ display: 'inline-block' }}>Become a Member</Link>
            </Magnetic>
            <Magnetic>
              <a href="#events" className="btn-outline" style={{ display: 'inline-block' }}>Explore Events</a>
            </Magnetic>
          </motion.div>

          <motion.div
            style={{ marginTop: '80px', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}><GlitchText text="18+" /></span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Members</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}><GlitchText text="2" /></span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Hackathons</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}><GlitchText text="9" /></span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Domains</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}><GlitchText text="1+" /></span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Years Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <About />
      <Events />
      <Domains />
      <Team />
      <Contact />
    </div>
  );
};

export default Home;
