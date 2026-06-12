import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ThreeMascot from './components/ThreeMascot';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventPopup from './components/EventPopup';
import WhatsAppButton from './components/WhatsAppButton';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Membership = lazy(() => import('./pages/Membership'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const MemberLogin = lazy(() => import('./pages/MemberLogin'));

function App() {
  return (
    <>
      <CustomCursor />
      <ThreeMascot />
      <EventPopup />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/member-login" element={<MemberLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/events/:id/register" element={<EventRegistration />} />
        </Routes>
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
