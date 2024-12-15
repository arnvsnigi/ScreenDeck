import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Hero from './components/Hero'
import ParticipantView from './components/ParticipantView'
import MeetingView from './components/MeetingView'
import AuthContextProvider from './store/AuthContextProvider.jsx';

// Placeholder components for new routes
const About = () => <div className="pt-20">About Page</div>
const Services = () => <div className="pt-20">Services Page</div>
const Contact = () => <div className="pt-20">Contact Page</div>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="meeting" element={<MeetingView />} />
          <Route path="participant" element={<ParticipantView />} />
          <Route path="*" element={<div className="pt-20">404: Page Not Found</div>} />
      </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
