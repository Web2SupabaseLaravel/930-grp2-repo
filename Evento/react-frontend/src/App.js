import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './DashBoardUser/Dashboard';
import './App.css';
import CreateEvent from './create-events/Create-EvPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<CreateEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
