import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

const DOMAINS = [
  { name: 'Artificial Intelligence', desc: 'Exploring ML, Neural Networks, and AI algorithms.', icon: '🧠' },
  { name: 'Web Development', desc: 'Building modern, scalable, and responsive web applications.', icon: '🌐' },
  { name: 'App Development', desc: 'Crafting intuitive mobile experiences for iOS and Android.', icon: '📱' },
  { name: 'Cloud Computing', desc: 'Mastering AWS, Azure, and distributed systems infrastructure.', icon: '☁️' },
  { name: 'Cybersecurity', desc: 'Protecting networks and applications from vulnerabilities.', icon: '🛡️' },
  { name: 'UI/UX Design', desc: 'Designing human-centric interfaces and user experiences.', icon: '🎨' },
  { name: 'Competitive Programming', desc: 'Solving algorithmic challenges and optimizing code.', icon: '⚡' },
  { name: 'Blockchain & Web3', desc: 'Decentralized applications, smart contracts, and crypto.', icon: '⛓️' },
  { name: 'Game Development', desc: 'Creating immersive virtual worlds and interactive entertainment.', icon: '🎮' }
];

const Domains = () => {
  return (
    <section id="domains" className="container section">
      <div className="section-header text-center" style={{ marginBottom: '80px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>03 — The Disciplines</span>
        <h1 className="section-title">Technical <span className="text-gradient"><GlitchText text="Domains" /></span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
          Choose your path. We operate across 9 core technological domains to ensure comprehensive skill development for every engineer.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {DOMAINS.map((domain, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
          >
            <TiltCard className="h-full">
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {domain.icon}
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                {domain.name}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {domain.desc}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Domains;
