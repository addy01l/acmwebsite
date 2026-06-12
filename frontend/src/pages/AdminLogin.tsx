import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.access);
        localStorage.setItem('admin_refresh_token', data.refresh);
        navigate('/admin-dashboard');
      } else {
        setError(data.non_field_errors?.[0] || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', backgroundColor: 'var(--bg-surface)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Admin <span className="text-gradient">Login</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div style={{ padding: '12px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-default)', color: 'var(--text-primary)', outline: 'none' }}
              placeholder="Enter password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
            style={{ width: '100%', padding: '14px', marginTop: '10px', display: 'flex', justifyContent: 'center', opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
