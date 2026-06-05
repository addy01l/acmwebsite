import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

const Events = () => {
  const hackathons = [
    {
      id: 1,
      title: 'Hack The Future 2.0',
      date: 'March 15-16, 2024',
      description: 'A 36-hour national level hackathon focused on AI and Web3 technologies. Over 500+ participants.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'CodeSprint 2023',
      date: 'October 10, 2023',
      description: 'A 24-hour coding sprint building solutions for smart cities and sustainable environments.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <section id="events" className="container section">
      <div className="section-header text-center" style={{ marginBottom: '60px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>02 — The Arena</span>
        <h1 className="section-title">Flagship <span className="text-gradient"><GlitchText text="Hackathons" /></span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
          Where caffeine meets code. Explore our intense, non-stop hackathons that challenge engineers to build the impossible under pressure.
        </p>
      </div>

      <div className="grid">
        {hackathons.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <TiltCard className="h-full" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.2)' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <span className="label-mono" style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '10px' }}>{event.date}</span>
                <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>{event.title}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
