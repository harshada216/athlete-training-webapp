import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Athletes from './pages/Athletes';
import AddAthlete from './pages/AddAthlete';
import Sessions from './pages/Sessions';
import AddSession from './pages/AddSession';
import AthleteSessions from './pages/AthleteSessions';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/athletes" element={<Athletes />} />
          <Route path="/athletes/new" element={<AddAthlete />} />
          <Route path="/athletes/:id/sessions" element={<AthleteSessions />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/new" element={<AddSession />} />
          {/* IMPORTANT: analytics needs :id */}
          <Route path="/analytics/:id" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
