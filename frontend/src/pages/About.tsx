import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

const About = () => {
  return (
    <section id="about" className="container section">
      <div className="section-header text-center" style={{ marginBottom: '60px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>01 — The Story</span>
        <h1 className="section-title">About <span className="text-gradient"><GlitchText text="ACM Shivalik" /></span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
          We aim at uniting the computing fraternity at Shivalik College under one tag and allowing the students to learn together and share their knowledge to cater the interests of the individuals as well as the institute as a whole. We organize a plethora of events which cover most of the fields of the computer science domain like hackathons, guest lectures, workshops, coding contests etc. which give the students an exposure to the competitive computing world as well as allow them to understand the advancements going on in the computing sphere worldwide.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <TiltCard className="h-full">
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--text-primary)' }}>Our <GlitchText text="Vision" /></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              To cultivate a community of future technology leaders who are equipped with the skills, 
              knowledge, and ethical foundation to innovate and solve global challenges through computing. 
              We envision a campus where every student has the resources and mentorship to turn their ideas into reality.
            </p>
          </TiltCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TiltCard className="h-full">
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--text-primary)' }}>Our <GlitchText text="Mission" /></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              To empower students by providing them with practical exposure to cutting-edge technologies. 
              We achieve this by organizing hands-on workshops, competitive hackathons, expert seminars, 
              and collaborative open-source projects that foster both technical excellence and professional networking.
            </p>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
