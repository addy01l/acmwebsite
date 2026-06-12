import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
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
      toast.success('Message Sent! Thanks for reaching out.');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      const msg = err.response?.data?.detail || 'An error occurred. Please try again.';
      setErrorMsg(msg);
      toast.error(msg);
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
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 style={{ marginBottom: '20px' }}>Contact Information</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            We'd love to hear from you. You can either fill out the form or reach us via email or WhatsApp.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="label-mono" style={{ display: 'block', marginBottom: '5px' }}>Email</span>
              <a href="mailto:kshitij.jain@shivalikcollege.edu.in" style={{ fontSize: '16px', fontWeight: '500', wordBreak: 'break-all' }}>kshitij.jain@shivalikcollege.edu.in</a>
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
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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

      {/* FAQs Section */}
      <div style={{ marginTop: '100px', maxWidth: '800px', margin: '100px auto 0 auto' }}>
        <div className="section-header text-center" style={{ marginBottom: '40px' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Can't find the answer you're looking for? Reach out to our team.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <details className="glass-panel" style={{ padding: '20px', cursor: 'pointer' }}>
            <summary style={{ fontSize: '18px', fontWeight: '600', outline: 'none' }}>Who can join ACM Shivalik?</summary>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Any student enrolled at Shivalik College of Engineering can join the chapter, regardless of their branch or year. We welcome anyone with a passion for technology.</p>
          </details>

          <details className="glass-panel" style={{ padding: '20px', cursor: 'pointer' }}>
            <summary style={{ fontSize: '18px', fontWeight: '600', outline: 'none' }}>Do I need prior coding experience to join?</summary>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>Not at all! We have domains and events catered to all skill levels, from absolute beginners to advanced developers. Our goal is to learn and grow together.</p>
          </details>

          <details className="glass-panel" style={{ padding: '20px', cursor: 'pointer' }}>
            <summary style={{ fontSize: '18px', fontWeight: '600', outline: 'none' }}>How can I participate in the hackathons?</summary>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>We announce all our upcoming hackathons and events on our website and social media channels. You can register through the links provided during the announcement period.</p>
          </details>

          <details className="glass-panel" style={{ padding: '20px', cursor: 'pointer' }}>
            <summary style={{ fontSize: '18px', fontWeight: '600', outline: 'none' }}>Is there a membership fee?</summary>
            <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>There is a nominal annual membership fee which covers the cost of access to premium workshops, resources, and special event discounts. Please contact us for the current fee structure.</p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Contact;
