import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  is_upcoming: boolean;
  ticket_price: number;
  payment_details: string;
  custom_form_fields: Array<{ type: string; question: string; required: boolean }>;
}

interface Registration {
  id: string;
  event: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  custom_answers: Record<string, string>;
  payment_screenshot: string | null;
  payment_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'events' | 'registrations'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  
  // Event Form State
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '', description: '', category: '', date: '', venue: '',
    is_upcoming: true, ticket_price: 0, payment_details: '', custom_form_fields: []
  });

  const [stats, setStats] = useState<any>(null);
  
  const userRole = localStorage.getItem('user_role') || 'admin';
  const userName = localStorage.getItem('user_name') || 'Admin';
  const isAdmin = userRole !== 'member';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchStats();
    fetchEvents();
    fetchRegistrations();
  }, [navigate]);

  const fetchStats = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}admin/stats/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}events/`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events');
    }
  };

  const fetchRegistrations = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}event-registrations/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Failed to fetch registrations');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    navigate('/admin-login');
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowEventForm(false);
        fetchEvents();
      } else {
        alert('Failed to create event');
      }
    } catch (err) {
      alert('Error creating event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}events/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert('Failed to delete event');
      }
    } catch (err) {
      alert('Error deleting event');
    }
  };

  const addCustomField = () => {
    setFormData({
      ...formData,
      custom_form_fields: [
        ...(formData.custom_form_fields || []),
        { type: 'text', question: '', required: true }
      ]
    });
  };

  const updateCustomField = (index: number, key: string, value: any) => {
    const newFields = [...(formData.custom_form_fields || [])];
    newFields[index] = { ...newFields[index], [key]: value };
    setFormData({ ...formData, custom_form_fields: newFields });
  };

  const filteredRegistrations = selectedEventId 
    ? registrations.filter(r => r.event === selectedEventId)
    : registrations;

  return (
    <div className="section container" style={{ minHeight: '80vh', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="section-title" style={{ margin: 0 }}>
          {isAdmin ? 'Admin' : userName.split(' ')[0]}'s <span className="text-gradient">Dashboard</span>
        </h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--error)', color: 'var(--error)', background: 'transparent', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => setActiveTab('stats')}
          style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'stats' ? '2px solid var(--accent-primary)' : 'none', color: activeTab === 'stats' ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: '600', cursor: 'pointer' }}
        >
          Overview Stats
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'events' ? '2px solid var(--accent-primary)' : 'none', color: activeTab === 'events' ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: '600', cursor: 'pointer' }}
        >
          Manage Events
        </button>
        <button 
          onClick={() => setActiveTab('registrations')}
          style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'registrations' ? '2px solid var(--accent-primary)' : 'none', color: activeTab === 'registrations' ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: '600', cursor: 'pointer' }}
        >
          View Registrations
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '5px' }}>{value as number}</h3>
              <p style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{key}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px' }}>All Events</h2>
            {isAdmin && (
              <button className="btn-primary" onClick={() => setShowEventForm(!showEventForm)}>
                {showEventForm ? 'Cancel' : '+ Create New Event'}
              </button>
            )}
          </div>

          {isAdmin && showEventForm && (
            <div style={{ background: 'var(--bg-surface)', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
              <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label>Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                  <div>
                    <label>Category</label>
                    <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                  <div>
                    <label>Date & Time</label>
                    <input type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                  <div>
                    <label>Venue</label>
                    <input type="text" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                  <div>
                    <label>Ticket Price (₹)</label>
                    <input type="number" value={formData.ticket_price} onChange={e => setFormData({...formData, ticket_price: parseInt(e.target.value)})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                  <div>
                    <label>Payment UPI ID / Link</label>
                    <input type="text" value={formData.payment_details} onChange={e => setFormData({...formData, payment_details: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                  </div>
                </div>
                
                <div>
                  <label>Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', minHeight: '100px' }} />
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '18px' }}>Custom Registration Questions</h3>
                    <button type="button" onClick={addCustomField} style={{ padding: '6px 12px', background: 'var(--accent-primary)', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>+ Add Question</button>
                  </div>
                  
                  {formData.custom_form_fields?.map((field, index) => (
                    <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '10px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        placeholder="Question (e.g. Branch?)" 
                        value={field.question} 
                        onChange={e => updateCustomField(index, 'question', e.target.value)}
                        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      />
                      <select 
                        value={field.type} 
                        onChange={e => updateCustomField(index, 'type', e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      >
                        <option value="text">Short Text</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Save Event</button>
              </form>
            </div>
          )}

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {events.map(event => (
              <div key={event.id} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{event.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '5px' }}><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '15px' }}><strong>Price:</strong> ₹{event.ticket_price}</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', padding: '4px 8px', background: 'var(--bg-default)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    {event.custom_form_fields.length} Custom Qs
                  </span>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      style={{ fontSize: '12px', padding: '4px 8px', background: '#ffebee', color: '#c62828', borderRadius: '4px', border: '1px solid #ffcdd2', cursor: 'pointer' }}
                    >
                      Delete Event
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '15px', fontWeight: '500' }}>Filter by Event:</label>
            <select 
              value={selectedEventId} 
              onChange={e => setSelectedEventId(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', minWidth: '300px' }}
            >
              <option value="">All Events</option>
              {events.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-surface)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: 'var(--bg-default)', borderBottom: '2px solid var(--border-color)' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Email / Phone</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Custom Answers</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Payment Status</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Screenshot</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map(reg => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '15px', fontWeight: '500' }}>{reg.applicant_name}</td>
                    <td style={{ padding: '15px', fontSize: '14px' }}>
                      {reg.applicant_email}<br/>
                      <span style={{ color: 'var(--text-secondary)' }}>{reg.applicant_phone}</span>
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px' }}>
                      {Object.entries(reg.custom_answers || {}).map(([q, a]) => (
                        <div key={q}><strong>{q}:</strong> {a as string}</div>
                      ))}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                        background: reg.payment_status === 'verified' ? '#e8f5e9' : '#fff3e0',
                        color: reg.payment_status === 'verified' ? '#2e7d32' : '#f57c00'
                      }}>
                        {reg.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      {reg.payment_screenshot ? (
                        <a href={reg.payment_screenshot} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontSize: '14px' }}>
                          View Image
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
