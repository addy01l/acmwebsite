'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, fetchFromApi } from '@/utils/api';

type TabType = 'overview' | 'events' | 'team' | 'applications' | 'messages';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [token, setToken] = useState<string | null>(null);

  // States for DB contents
  const [stats, setStats] = useState({ members: 0, applications: 0, events: 0, messages: 0 });
  const [events, setEvents] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States (for creating/editing items)
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    description: '',
    category: 'Workshops',
    date: '',
    venue: '',
    banner: '',
    regLink: '',
    isUpcoming: true,
  });
  const [teamForm, setTeamForm] = useState({
    id: '',
    name: '',
    position: '',
    department: 'Computer Science & Engineering',
    category: 'Technical Team',
    photo: '',
    linkedin: '',
    github: '',
    email: '',
    order: 0,
  });
  
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [promptType, setPromptType] = useState<'success' | 'error' | ''>('');

  // 1. Guard route and load data
  useEffect(() => {
    const savedToken = localStorage.getItem('acm_admin_token');
    if (!savedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(savedToken);
    loadAllData(savedToken);
  }, [router]);

  const loadAllData = async (authToken: string) => {
    setLoading(true);
    try {
      // Fetch stats, events, team, applications, and messages
      const headers = { Authorization: `Bearer ${authToken}` };

      // Events
      const eventsData = await fetch(`${API_BASE_URL}/api/events`, { headers }).then((res) => res.json());
      setEvents(Array.isArray(eventsData) ? eventsData : []);

      // Team
      const teamData = await fetch(`${API_BASE_URL}/api/team`, { headers }).then((res) => res.json());
      setTeam(Array.isArray(teamData) ? teamData : []);

      // Applications
      const appsData = await fetch(`${API_BASE_URL}/api/applications`, { headers }).then((res) => res.json());
      setApplications(Array.isArray(appsData) ? appsData : []);

      // Messages
      const msgsData = await fetch(`${API_BASE_URL}/api/contact/messages`, { headers }).then((res) => res.json());
      setMessages(Array.isArray(msgsData) ? msgsData : []);

      // Members count
      const membersData = await fetch(`${API_BASE_URL}/api/applications/members`, { headers }).then((res) => res.json());
      const membersCount = Array.isArray(membersData) ? membersData.length : 0;

      setStats({
        members: membersCount,
        applications: Array.isArray(appsData) ? appsData.length : 0,
        events: Array.isArray(eventsData) ? eventsData.length : 0,
        messages: Array.isArray(msgsData) ? msgsData.length : 0,
      });
    } catch (error) {
      console.error('Failed to load dashboard data. Rendering fallback lists.', error);
      // fallback placeholders
      setEvents([]);
      setTeam([]);
      setApplications([]);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string, type: 'success' | 'error') => {
    setPromptMessage(msg);
    setPromptType(type);
    setTimeout(() => {
      setPromptMessage('');
      setPromptType('');
    }, 4000);
  };

  // 2. Events CRUD
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      
      const payload = {
        ...eventForm,
        isUpcoming: String(eventForm.isUpcoming) === 'true',
        regLink: eventForm.regLink || null,
      };

      let response;
      if (isEditingEvent) {
        response = await fetch(`${API_BASE_URL}/api/events/${eventForm.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/events`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        showNotification(isEditingEvent ? 'Event updated successfully' : 'Event created successfully', 'success');
        resetEventForm();
        if (token) loadAllData(token);
      } else {
        const data = await response.json();
        showNotification(data.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showNotification('A network error occurred', 'error');
    }
  };

  const handleEditEvent = (evt: any) => {
    setIsEditingEvent(true);
    setEventForm({
      id: evt.id,
      title: evt.title,
      description: evt.description,
      category: evt.category,
      date: evt.date.split('T')[0],
      venue: evt.venue,
      banner: evt.banner,
      regLink: evt.regLink || '',
      isUpcoming: evt.isUpcoming,
    });
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        showNotification('Event deleted successfully', 'success');
        if (token) loadAllData(token);
      }
    } catch (err) {
      showNotification('Delete request failed', 'error');
    }
  };

  const resetEventForm = () => {
    setIsEditingEvent(false);
    setEventForm({
      id: '',
      title: '',
      description: '',
      category: 'Workshops',
      date: '',
      venue: '',
      banner: '',
      regLink: '',
      isUpcoming: true,
    });
  };

  // 3. Team CRUD
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      
      const payload = {
        ...teamForm,
        order: parseInt(String(teamForm.order), 10) || 0,
      };

      let response;
      if (isEditingTeam) {
        response = await fetch(`${API_BASE_URL}/api/team/${teamForm.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/team`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        showNotification(isEditingTeam ? 'Team member updated' : 'Team member added', 'success');
        resetTeamForm();
        if (token) loadAllData(token);
      } else {
        const data = await response.json();
        showNotification(data.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showNotification('A network error occurred', 'error');
    }
  };

  const handleEditTeam = (tm: any) => {
    setIsEditingTeam(true);
    setTeamForm({
      id: tm.id,
      name: tm.name,
      position: tm.position,
      department: tm.department,
      category: tm.category,
      photo: tm.photo,
      linkedin: tm.linkedin || '',
      github: tm.github || '',
      email: tm.email || '',
      order: tm.order,
    });
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        showNotification('Member removed successfully', 'success');
        if (token) loadAllData(token);
      }
    } catch (err) {
      showNotification('Delete request failed', 'error');
    }
  };

  const resetTeamForm = () => {
    setIsEditingTeam(false);
    setTeamForm({
      id: '',
      name: '',
      position: '',
      department: 'Computer Science & Engineering',
      category: 'Technical Team',
      photo: '',
      linkedin: '',
      github: '',
      email: '',
      order: 0,
    });
  };

  // 4. Applications reviewer status toggles
  const handleUpdateAppStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        showNotification(`Application status marked as ${status}`, 'success');
        if (token) loadAllData(token);
      }
    } catch (err) {
      showNotification('Failed to update status', 'error');
    }
  };

  // 5. Excel Export trigger
  const handleExportExcel = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Export failed');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `acm_membership_applications_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showNotification('Excel sheet compiled and downloaded', 'success');
    } catch (err) {
      showNotification('Failed to compile Excel file', 'error');
    }
  };

  // 6. Messages mark as read
  const handleToggleMessageRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead }),
      });
      if (response.ok) {
        showNotification('Inbox message status updated', 'success');
        if (token) loadAllData(token);
      }
    } catch (err) {
      showNotification('Failed to update message state', 'error');
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Toast popup */}
      {promptMessage && (
        <div
          className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl border text-xs font-semibold shadow-2xl ${
            promptType === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {promptMessage}
        </div>
      )}

      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-6 mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white uppercase">
            ACM Chapter Dashboard
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Configure chapters board, manage event sign-ups, and review applicants</p>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2">
          {(['overview', 'events', 'team', 'applications', 'messages'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                activeTab === tab
                  ? 'border-[#007BFF] text-[#007BFF] bg-[#007BFF]/5'
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm">Loading admin dashboard...</div>
      ) : (
        <div className="space-y-12">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-zinc-900 text-center">
                  <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Approved Members</h3>
                  <p className="text-2xl md:text-3xl font-extrabold text-[#007BFF] mt-2">{stats.members}</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-zinc-900 text-center">
                  <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total Applications</h3>
                  <p className="text-2xl md:text-3xl font-extrabold text-white mt-2">{stats.applications}</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-zinc-900 text-center">
                  <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Events Created</h3>
                  <p className="text-2xl md:text-3xl font-extrabold text-white mt-2">{stats.events}</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-zinc-900 text-center">
                  <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Queries Received</h3>
                  <p className="text-2xl md:text-3xl font-extrabold text-white mt-2">{stats.messages}</p>
                </div>
              </div>

              {/* Direct links/actions */}
              <div className="glass-panel p-8 rounded-3xl border border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-white text-md font-bold uppercase tracking-wide">Membership Registry</h2>
                  <p className="text-zinc-400 text-xs mt-1">Review candidates and download compiled registration files.</p>
                </div>
                <button
                  onClick={handleExportExcel}
                  className="px-6 py-2.5 bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold rounded-lg shadow-md cursor-pointer transition-colors"
                >
                  Compile & Export Excel
                </button>
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Form Card */}
              <div className="glass-panel p-6 rounded-3xl border border-zinc-900 lg:col-span-1">
                <h2 className="text-white text-md font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">
                  {isEditingEvent ? 'Edit Event Details' : 'Create New Event'}
                </h2>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Event Title</label>
                    <input
                      type="text"
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="Hackathons">Hackathons</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Seminars">Seminars</option>
                      <option value="Coding Contests">Coding Contests</option>
                      <option value="Research Events">Research Events</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Date</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Venue</label>
                    <input
                      type="text"
                      required
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Banner Image Link</label>
                    <input
                      type="text"
                      required
                      value={eventForm.banner}
                      onChange={(e) => setEventForm({ ...eventForm, banner: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                      placeholder="Image URL or unsplash photo url"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Registration Link (Optional)</label>
                    <input
                      type="text"
                      value={eventForm.regLink}
                      onChange={(e) => setEventForm({ ...eventForm, regLink: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                      placeholder="e.g. google forms URL"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isUpcoming"
                      checked={eventForm.isUpcoming}
                      onChange={(e) => setEventForm({ ...eventForm, isUpcoming: e.target.checked })}
                      className="cursor-pointer"
                    />
                    <label htmlFor="isUpcoming" className="text-zinc-400 text-xs cursor-pointer select-none font-semibold">Mark as Upcoming Event</label>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="flex-grow bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {isEditingEvent ? 'Save Edits' : 'Publish Event'}
                    </button>
                    {isEditingEvent && (
                      <button
                        type="button"
                        onClick={resetEventForm}
                        className="px-4 py-2.5 border border-zinc-800 text-zinc-400 text-xs font-bold rounded-lg hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Table List */}
              <div className="glass-panel p-6 rounded-3xl border border-zinc-900 lg:col-span-2 overflow-x-auto">
                <h2 className="text-white text-md font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">
                  Active Listings ({events.length})
                </h2>
                <table className="w-full text-left text-xs text-zinc-400 border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase">
                      <th className="py-2">Event Title</th>
                      <th className="py-2">Category</th>
                      <th className="py-2">Date</th>
                      <th className="py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((evt) => (
                      <tr key={evt.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20">
                        <td className="py-3 font-semibold text-white">{evt.title}</td>
                        <td className="py-3">{evt.category}</td>
                        <td className="py-3">{new Date(evt.date).toLocaleDateString()}</td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleEditEvent(evt)}
                            className="text-[#007BFF] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="text-red-500 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Form Card */}
              <div className="glass-panel p-6 rounded-3xl border border-zinc-900 lg:col-span-1">
                <h2 className="text-white text-md font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">
                  {isEditingTeam ? 'Edit Board Member' : 'Add Board Member'}
                </h2>
                <form onSubmit={handleTeamSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Position</label>
                    <input
                      type="text"
                      required
                      value={teamForm.position}
                      onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                      placeholder="e.g. Chairperson"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Category</label>
                    <select
                      value={teamForm.category}
                      onChange={(e) => setTeamForm({ ...teamForm, category: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="Faculty Coordinator">Faculty Advisor</option>
                      <option value="Executive Board">Executive Board</option>
                      <option value="Technical Team">Technical Team</option>
                      <option value="Design Team">Design Team</option>
                      <option value="Management Team">Management Team</option>
                      <option value="Research Team">Research Team</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Department</label>
                    <input
                      type="text"
                      required
                      value={teamForm.department}
                      onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Photo URL</label>
                    <input
                      type="text"
                      required
                      value={teamForm.photo}
                      onChange={(e) => setTeamForm({ ...teamForm, photo: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">LinkedIn Profile (URL)</label>
                    <input
                      type="text"
                      value={teamForm.linkedin}
                      onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">GitHub Profile (URL)</label>
                    <input
                      type="text"
                      value={teamForm.github}
                      onChange={(e) => setTeamForm({ ...teamForm, github: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Email ID</label>
                    <input
                      type="email"
                      value={teamForm.email}
                      onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-zinc-500 text-[10px] font-bold uppercase">Order Priority (e.g. 1, 2, 3)</label>
                    <input
                      type="number"
                      value={teamForm.order}
                      onChange={(e) => setTeamForm({ ...teamForm, order: parseInt(e.target.value, 10) || 0 })}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-xl outline-none"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="flex-grow bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {isEditingTeam ? 'Save Edits' : 'Add Board Member'}
                    </button>
                    {isEditingTeam && (
                      <button
                        type="button"
                        onClick={resetTeamForm}
                        className="px-4 py-2.5 border border-zinc-800 text-zinc-400 text-xs font-bold rounded-lg hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Table List */}
              <div className="glass-panel p-6 rounded-3xl border border-zinc-900 lg:col-span-2 overflow-x-auto">
                <h2 className="text-white text-md font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">
                  Active Board ({team.length})
                </h2>
                <table className="w-full text-left text-xs text-zinc-400 border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase">
                      <th className="py-2">Name</th>
                      <th className="py-2">Position</th>
                      <th className="py-2">Category</th>
                      <th className="py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((tm) => (
                      <tr key={tm.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20">
                        <td className="py-3 font-semibold text-white">{tm.name}</td>
                        <td className="py-3">{tm.position}</td>
                        <td className="py-3">{tm.category}</td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleEditTeam(tm)}
                            className="text-[#007BFF] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(tm.id)}
                            className="text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-md font-bold uppercase tracking-wide">
                  Candidate Applications ({applications.length})
                </h2>
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 border border-[#007BFF] hover:bg-[#007BFF]/5 text-[#007BFF] text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Export to Excel
                </button>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-zinc-900 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-400 border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase">
                      <th className="py-2">Candidate</th>
                      <th className="py-2">Roll No</th>
                      <th className="py-2">Branch / Year</th>
                      <th className="py-2">Skills</th>
                      <th className="py-2 text-center">Resume</th>
                      <th className="py-2 text-center">Status</th>
                      <th className="py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20">
                        <td className="py-4">
                          <div className="font-semibold text-white">{app.name}</div>
                          <div className="text-[10px] text-zinc-500">{app.email} | {app.phone}</div>
                        </td>
                        <td className="py-4 font-mono">{app.enrollmentNo}</td>
                        <td className="py-4">{app.branch} (Y{app.year})</td>
                        <td className="py-4 max-w-[150px] truncate" title={app.skills}>{app.skills}</td>
                        <td className="py-4 text-center">
                          <a
                            href={`${API_BASE_URL}${app.resumeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#007BFF] hover:underline"
                          >
                            Open PDF
                          </a>
                        </td>
                        <td className="py-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              app.status === 'approved'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                : app.status === 'rejected'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateAppStatus(app.id, 'approved')}
                                className="text-green-400 hover:underline cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                                className="text-red-400 hover:underline cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {app.status !== 'pending' && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, 'pending')}
                              className="text-zinc-500 hover:underline cursor-pointer"
                            >
                              Reset Status
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="text-white text-md font-bold uppercase tracking-wide">
                Inbox Queries ({messages.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-panel p-6 rounded-2xl border flex flex-col justify-between min-h-[180px] ${
                      msg.isRead ? 'border-zinc-900 opacity-60' : 'border-[#007BFF]/30 shadow-lg'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white text-sm font-bold">{msg.name}</h4>
                          <span className="text-[10px] text-zinc-500">{msg.email}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="text-zinc-300 text-xs font-semibold mb-2">Subject: {msg.subject}</div>
                      <p className="text-zinc-400 text-xs leading-relaxed">{msg.message}</p>
                    </div>

                    <div className="border-t border-zinc-900/60 pt-4 mt-4 flex justify-between items-center">
                      <span className="text-[9px] text-[#007BFF] font-bold uppercase">QUERY</span>
                      <button
                        onClick={() => handleToggleMessageRead(msg.id, !msg.isRead)}
                        className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      >
                        {msg.isRead ? 'Mark Unread' : 'Mark as Read'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
