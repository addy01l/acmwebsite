import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';

const About = lazy(() => import('./About'));
const Events = lazy(() => import('./Events'));
const Domains = lazy(() => import('./Domains'));
const Team = lazy(() => import('./Team'));
const Contact = lazy(() => import('./Contact'));

const Home = () => {
  return (
    <div className="home-page">
      <Helmet>
        <title>ACM Chapter Shivalik | Home</title>
        <meta name="description" content="ACM Chapter Shivalik is the official student chapter of the Association for Computing Machinery at Shivalik College of Engineering, Dehradun." />
        <meta property="og:title" content="ACM Chapter Shivalik | Home" />
        <meta property="og:description" content="Where engineers build, collaborate, and shape the future of technology." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '20px' }}
          >
            <span className="label-mono" style={{ color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(2, 170, 176, 0.05)' }}>
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
            <span className="text-gradient">future of technology.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            ACM Chapter Shivalik is the official student chapter of the Association for Computing Machinery at Shivalik College of Engineering, Dehradun.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/membership" className="btn-primary">Become a Member</Link>
            <a href="#events" className="btn-outline">Explore Events</a>
          </motion.div>

          <motion.div
            style={{ marginTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '40px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>18+</span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Members</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>2</span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Hackathons</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>9</span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Domains</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>1+</span>
                <span className="label-mono" style={{ color: 'var(--text-secondary)' }}>Years Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<Loader />}>
        <About />
        <Events />
        <Domains />
        <Team />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;
