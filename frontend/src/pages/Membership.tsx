import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Membership = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    enrollment_no: '',
    skills: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setErrorMsg('Please upload your resume');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key as keyof typeof formData]);
    });
    form.append('resume', resume);

    try {
      await api.post('applications/', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Application Submitted Successfully!');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', branch: '', year: '', enrollment_no: '', skills: '' });
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      const msg = err.response?.data?.detail || 'An error occurred. Please ensure all fields are correct.';
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="section container" style={{ paddingTop: '150px' }}>
      <div className="section-header">
        <span className="label-mono" style={{ color: 'var(--accent-primary)', marginBottom: '10px', display: 'block' }}>Join Us</span>
        <h1 className="section-title">Become an <span className="text-gradient">ACM Member</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Ready to build the future? Apply below to join the premier computing society at Shivalik College of Engineering.
        </p>
      </div>

      <motion.div 
        className="glass-panel" 
        style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h3 style={{ color: '#4ade80', marginBottom: '15px' }}>Application Submitted!</h3>
            <p>Thank you for applying. Our team will review your application and contact you soon.</p>
            <button className="btn-outline" style={{ marginTop: '20px' }} onClick={() => setStatus('idle')}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Enrollment No.</label>
                <input required type="text" name="enrollment_no" value={formData.enrollment_no} onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Branch</label>
                <input required type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. CSE, AI/ML" className="form-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-mono">Year</label>
                <select required name="year" value={formData.year} onChange={handleChange} className="form-input">
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="label-mono">Skills / Why do you want to join?</label>
              <textarea required name="skills" value={formData.skills} onChange={handleChange} rows={4} className="form-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="label-mono">Resume (PDF/Docx)</label>
              <input required type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={fileInputRef} className="form-input" style={{ padding: '10px' }} />
            </div>

            {errorMsg && <p style={{ color: 'var(--error)', fontSize: '14px' }}>{errorMsg}</p>}

            <button type="submit" className="btn-primary" disabled={status === 'submitting'} style={{ marginTop: '10px' }}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Membership;
