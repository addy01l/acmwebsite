import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import TiltCard from '../components/TiltCard';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  ticket_price: number;
}

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://acmwebsite.onrender.com/api/' : 'http://127.0.0.1:8000/api/')}events/?is_upcoming=true`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="events" className="container section">
      <div className="section-header text-center" style={{ marginBottom: '60px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>02 — The Arena</span>
        <h1 className="section-title">Upcoming <span className="text-gradient"><GlitchText text="Events" /></span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
          Discover our flagship hackathons, guest lectures, and tech workshops. Build the future with us.
        </p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading events...</div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--bg-surface)', borderRadius: '12px' }}>
          No upcoming events at the moment. Stay tuned!
        </div>
      ) : (
        <div className="grid">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TiltCard className="h-full" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', width: '100%', overflow: 'hidden', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', position: 'relative' }}>
                   {/* Abstract Placeholder for event poster */}
                   <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                </div>
                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="label-mono" style={{ color: 'var(--accent-primary)', display: 'block' }}>
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    {event.ticket_price > 0 ? (
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: '#fff3e0', color: '#f57c00', padding: '4px 8px', borderRadius: '4px' }}>
                        ₹{event.ticket_price}
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px' }}>
                        FREE
                      </span>
                    )}
                  </div>
                  
                  <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>{event.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', flex: 1 }}>
                    {event.description.length > 120 ? event.description.substring(0, 120) + '...' : event.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {event.venue}
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', padding: '12px', textAlign: 'center' }}
                    onClick={() => navigate(`/events/${event.id}/register`)}
                  >
                    Register Now
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Events;
