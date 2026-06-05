import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import CustomCursor from './components/CustomCursor';
import ThreeMascot from './components/ThreeMascot';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
      <CustomCursor />
      <ThreeMascot />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
