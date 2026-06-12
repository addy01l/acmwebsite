import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

const FACULTY_COORDINATORS = [
  { name: "Kshitij Jain", role: "ACM Faculty Coordinator", filename: "kshitij.jpeg" },
  { name: "Santosh Kumar", role: "Faculty Coordinator", filename: "santosh.jpeg" },
  { name: "Shivali Pundir", role: "Faculty Coordinator", filename: "shivali.jpeg" },
  { name: "Shiv Singh", role: "Faculty Coordinator", filename: "shiv.jpeg" }
];

const STUDENT_MEMBERS = [
  { name: "Gaurav Singh", role: "Chairperson", filename: "chairperson.jpeg" },
  { name: "Rifat Parvez", role: "Vice Chairperson", filename: "viceChairperson.jpeg" },
  { name: "Gaurav Kumar", role: "Secretary", filename: "Secretary.jpeg" },
  { name: "Shivam Raj", role: "Joint Secretary", filename: "jointsecretary.jpeg" },
  { name: "Shivam Kumar", role: "Treasurer", filename: "Treasurer.jpeg" },
  { name: "Mohd Mahtab", role: "Technical Head", filename: "technicalhead.jpeg" },
  { name: "Mahesh Singh Pawar", role: "Event Head", filename: "Eventhead.jpeg" },
  { name: "Ankit Panwar", role: "Marketing Head", filename: "marketinghead.jpeg" },
  { name: "Ishant", role: "Corporate Relations Head", filename: "CorporateRelationshead.jpeg" },
  { name: "Khushi Kumari", role: "Application Head", filename: "Applicationhead.jpeg" },
  { name: "Kumar Satyam", role: "Graphic Head", filename: "GraphicHead.jpeg" },
  { name: "Aman Bharadwaj", role: "Media Head", filename: "MediaHead.jpeg" },
  { name: "Priyanjali", role: "Media Vice Head", filename: "MediaViceHead.jpeg" },
  { name: "Ansh Pandey", role: "Research & Publication Lead", filename: "Research&PublicationLead.jpeg" },
  { name: "Agrani Mishra", role: "Vice Research Head", filename: "ViceResearchHead.jpeg" },
  { name: "Ankit Raj", role: "Inter-College Relations Coordinator", filename: "InterCollegeRelationsCoordinator.jpeg" },
  { name: "Mishti", role: "Alumni Relations Coordinator", filename: "AlumniRelationsCoordinator.jpeg" },
  { name: "Prashant Shekhar", role: "Campus Ambassador Lead", filename: "campusambassadorlead.jpeg" }
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

      {/* Faculty Coordinators Section */}
      <div style={{ marginBottom: '60px' }}>
        <h3 className="label-mono" style={{ color: 'var(--text-secondary)', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>FACULTY COORDINATORS</h3>

        {/* Kshitij Jain at the Top */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '350px' }}
          >
            <TiltCard style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ height: '350px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  loading="lazy"
                  src={`/images/team/${FACULTY_COORDINATORS[0].filename}`}
                  alt={FACULTY_COORDINATORS[0].name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%) contrast(1.1)',
                    transition: 'transform 0.5s ease'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(FACULTY_COORDINATORS[0].name)}&background=random`;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: '40px 20px 20px 20px',
                  background: 'linear-gradient(to top, rgba(255, 255, 255, 1), transparent)',
                  textAlign: 'center'
                }}>
                  <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: '0 0 5px 0' }}>
                    {FACULTY_COORDINATORS[0].name}
                  </h2>
                  <h3 style={{ fontSize: '15px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    {FACULTY_COORDINATORS[0].role}
                  </h3>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Other Faculty Coordinators */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {FACULTY_COORDINATORS.slice(1).map((member, index) => (
            <motion.div
              key={`faculty-${index}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                  loading="lazy"
                    src={`/images/team/${member.filename}`}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(20%) contrast(1.1)',
                      transition: 'transform 0.5s ease'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: '40px 20px 20px 20px',
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 1), transparent)',
                    textAlign: 'center'
                  }}>
                    <h2 style={{ fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 5px 0' }}>
                      {member.name}
                    </h2>
                    <h3 style={{ fontSize: '14px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                      {member.role}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Student Members Section */}
      <div>
        <h3 className="label-mono" style={{ color: 'var(--text-secondary)', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>STUDENT MEMBERS</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
          {STUDENT_MEMBERS.map((member, index) => (
            <motion.div
              key={`student-${index}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            >
              <TiltCard style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    loading="lazy"
                    src={`/images/team/${member.filename}`}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(20%) contrast(1.1)',
                      transition: 'transform 0.5s ease'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: '40px 20px 20px 20px',
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 1), transparent)',
                    textAlign: 'center'
                  }}>
                    <h2 style={{ fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 5px 0' }}>
                      {member.name}
                    </h2>
                    <h3 style={{ fontSize: '14px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                      {member.role}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
