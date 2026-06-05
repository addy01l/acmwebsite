import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

const formatRole = (filename: string) => {
  let role = filename.replace('.jpeg', '').replace('.png', '');
  // Add spaces before capital letters
  role = role.replace(/([A-Z])/g, ' $1').trim();
  // Capitalize first letter
  role = role.charAt(0).toUpperCase() + role.slice(1);
  return role;
};

const TEAM_MEMBERS = [
  "facultyCoordinator.jpeg",
  "chairperson.jpeg",
  "viceChairperson.jpeg",
  "Secretary.jpeg",
  "jointsecretary.jpeg",
  "Treasurer.jpeg",
  "technicalhead.jpeg",
  "Eventhead.jpeg",
  "marketinghead.jpeg",
  "CorporateRelationshead.jpeg",
  "Applicationhead.jpeg",
  "GraphicHead.jpeg",
  "MediaHead.jpeg",
  "MediaViceHead.jpeg",
  "Research&PublicationLead.jpeg",
  "ViceResearchHead.jpeg",
  "InterCollegeRelationsCoordinator.jpeg",
  "AlumniRelationsCoordinator.jpeg",
  "campusambassadorlead.jpeg"
];

const Team = () => {
  return (
    <section id="team" className="container section">
      <div className="section-header text-center" style={{ marginBottom: '80px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>04 — The Architects</span>
        <h1 className="section-title">Core <span className="text-gradient"><GlitchText text="Team" /></span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
          Meet the dedicated minds orchestrating the future of technology at Shivalik.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
        {TEAM_MEMBERS.map((filename, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
          >
            <TiltCard style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={`/images/team/${filename}`} 
                  alt={formatRole(filename)} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    filter: 'grayscale(20%) contrast(1.1)',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(19, 19, 19, 1), transparent)'
                }}></div>
              </div>
              <div style={{ padding: '20px', position: 'relative', zIndex: 2, marginTop: '-40px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>
                  {formatRole(filename)}
                </h3>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
