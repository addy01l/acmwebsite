import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState<EventData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://acmwebsite.onrender.com/api/' : 'http://127.0.0.1:8000/api/')}events/?is_upcoming=true`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          setEvent(data[0]); // Get the most recent upcoming event
          
          const hasSeenPopup = sessionStorage.getItem(`hasSeenEventPopup_${data[0].id}`);
          if (!hasSeenPopup) {
            setTimeout(() => {
              setIsOpen(true);
              sessionStorage.setItem(`hasSeenEventPopup_${data[0].id}`, 'true');
            }, 1500);
          }
        }
      } catch (err) {
        console.error("Failed to load upcoming events for popup");
      }
    };

    fetchEvent();
  }, []);

  if (!isOpen || !event || location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <style>
        {`
          .popup-card {
            display: flex;
            flex-direction: row;
            background-color: #ffffff;
            border-radius: 16px;
            max-width: 850px;
            width: 90%;
            min-height: 450px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
            overflow: hidden;
          }
          .popup-left {
            flex: 1;
            position: relative;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          }
          .popup-right {
            flex: 1.2;
            padding: 40px;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .popup-maybe-btn {
            width: 100%;
            padding: 14px;
            font-size: 14px;
            background-color: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .popup-maybe-btn:hover {
            background-color: var(--bg-surface);
            color: var(--text-primary);
          }
          @media (max-width: 768px) {
            .popup-card {
              flex-direction: column;
            }
            .popup-left {
              min-height: 200px;
            }
            .popup-right {
              padding: 30px 20px;
            }
          }
        `}
      </style>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="popup-card"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Image Side */}
            <div className="popup-left">
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
            </div>

            {/* Right Content Side */}
            <div className="popup-right">
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  lineHeight: 1,
                  padding: '5px'
                }}
              >
                &times;
              </button>

              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                padding: '6px 14px', 
                borderRadius: '20px', 
                border: '1px solid var(--accent-primary)',
                color: 'var(--accent-primary)',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '25px',
                width: 'fit-content',
                textTransform: 'uppercase'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', marginRight: '8px', animation: 'pulse 2s infinite' }}></span>
                Registration Live
              </div>

              <h2 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px', letterSpacing: '-0.5px' }}>
                {event.title}
              </h2>

              <p style={{ color: 'var(--accent-primary)', fontWeight: '600', fontSize: '14px', marginBottom: '15px' }}>
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '40px', flex: 1 }}>
                {event.description.length > 150 ? event.description.substring(0, 150) + '...' : event.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/events/${event.id}/register`);
                  }}
                  style={{ width: '100%', padding: '16px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  Register Now 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </button>
                <button 
                  className="popup-maybe-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default EventPopup;
