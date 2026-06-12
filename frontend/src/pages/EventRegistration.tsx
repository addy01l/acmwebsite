import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  ticket_price: number;
  payment_details: string;
  custom_form_fields: Array<{ type: string; question: string; required: boolean }>;
}

const EventRegistration = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [screenshot, setScreenshot] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch Event Details
    fetch(`http://127.0.0.1:8000/api/events/${id}/`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (event.ticket_price > 0 && !screenshot) {
      toast.error("Please upload the payment screenshot to proceed.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('event', event.id);
    formData.append('applicant_name', name);
    formData.append('applicant_email', email);
    formData.append('applicant_phone', phone);
    formData.append('custom_answers', JSON.stringify(customAnswers));
    if (screenshot) {
      formData.append('payment_screenshot', screenshot);
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/event-registrations/`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success("Registration Successful!");
        setSuccess(true);
      } else {
        const errorData = await res.json();
        console.error(errorData);
        toast.error('Failed to register. Please check your inputs.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return <div className="container section" style={{ textAlign: 'center', paddingTop: '100px' }}>Loading event details...</div>;
  }

  if (success) {
    return (
      <div className="container section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#e8f5e9', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ color: '#2e7d32', marginBottom: '15px' }}>Registration Successful! 🎉</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            Thank you for registering for <strong>{event.title}</strong>. Your application has been received. 
            {event.ticket_price > 0 && " Our team will verify your payment screenshot shortly."}
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="section container" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="section-title" style={{ fontSize: '32px', marginBottom: '10px' }}>Register for <span className="text-gradient">{event.title}</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Date: {new Date(event.date).toLocaleDateString()} | Venue: {event.venue}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* Step 1: Basic Details */}
        <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>1. Basic Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number *</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
        </div>

        {/* Step 2: Custom Questions (if any) */}
        {event.custom_form_fields?.length > 0 && (
          <>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>2. Additional Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {event.custom_form_fields.map((field, idx) => (
                <div key={idx}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{field.question} {field.required && '*'}</label>
                  <input 
                    type={field.type} 
                    required={field.required}
                    onChange={e => setCustomAnswers({...customAnswers, [field.question]: e.target.value})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 3: Payment (if applicable) */}
        {event.ticket_price > 0 && (
          <>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>{event.custom_form_fields?.length > 0 ? '3' : '2'}. Payment Details</h3>
            <div style={{ background: 'var(--bg-default)', padding: '20px', borderRadius: '8px', border: '1px solid var(--accent-primary)', marginBottom: '30px' }}>
              <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Ticket Price: <span style={{ color: 'var(--accent-primary)' }}>₹{event.ticket_price}</span></p>
              <p style={{ marginBottom: '15px' }}>Please complete the payment using the details below and upload the screenshot as proof.</p>
              
              <div style={{ background: 'var(--bg-surface)', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>
                {event.payment_details || "No payment details provided by admin."}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Upload Payment Screenshot *</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => e.target.files && setScreenshot(e.target.files[0])} 
                  required 
                  style={{ width: '100%', padding: '10px', background: '#fff', border: '1px dashed var(--accent-primary)', borderRadius: '8px' }}
                />
              </div>
            </div>
          </>
        )}

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isSubmitting}
          style={{ width: '100%', padding: '16px', fontSize: '16px', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}
        </button>

      </form>
    </div>
  );
};

export default EventRegistration;
