import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';

const MemberLogin = () => {
  const [email, setEmail] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/member-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, enrollment_no: enrollmentNo }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.access);
        localStorage.setItem('admin_refresh_token', data.refresh);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_name', data.member_name);
        navigate('/admin-dashboard');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: 'var(--bg-surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}><GlitchText text="Member Login" /></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Access your chapter dashboard</p>
        </div>

        {error && (
          <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid #ffcdd2' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-default)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Enrollment Number</label>
            <input 
              type="text" 
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-default)', color: 'var(--text-primary)' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberLogin;
