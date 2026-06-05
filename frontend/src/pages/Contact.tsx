import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      await api.post('contact/', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="section container">
      <div className="section-header text-center" style={{ marginBottom: '60px' }}>
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>05 — Get In Touch</span>
        <h1 className="section-title">Contact <span className="text-gradient">Us</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Have a question about our chapter, events, or partnerships? Reach out to us.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 style={{ marginBottom: '20px' }}>Contact Information</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            We'd love to hear from you. You can either fill out the form or reach us via email or WhatsApp.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="label-mono" style={{ display: 'block', marginBottom: '5px' }}>Email</span>
              <a href="mailto:acm.shivalik@gmail.com" style={{ fontSize: '18px', fontWeight: '500' }}>acm.shivalik@gmail.com</a>
            </div>
            <div>
              <span className="label-mono" style={{ display: 'block', marginBottom: '5px' }}>Location</span>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>Shivalik College of Engineering<br/>Dehradun, UK, India</p>
            </div>
            <div>
              <span className="label-mono" style={{ display: 'block', marginBottom: '5px' }}>WhatsApp</span>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ fontSize: '18px', fontWeight: '500' }}>+91 98765 43210</a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <h3 style={{ color: '#4ade80', marginBottom: '15px' }}>Message Sent!</h3>
              <p>Thanks for reaching out. We will get back to you shortly.</p>
              <button className="btn-outline" style={{ marginTop: '20px' }} onClick={() => setStatus('idle')}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Subject</label>
                <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-input" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="form-input" />
              </div>

              {errorMsg && <p style={{ color: 'var(--error)', fontSize: '14px' }}>{errorMsg}</p>}

              <button type="submit" className="btn-primary" disabled={status === 'submitting'} style={{ marginTop: '10px' }}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
