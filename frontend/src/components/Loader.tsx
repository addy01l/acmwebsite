import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(2, 170, 176, 0.2)',
          borderTop: '5px solid var(--accent-primary)',
          borderRadius: '50%'
        }}
      />
    </div>
  );
};

export default Loader;
