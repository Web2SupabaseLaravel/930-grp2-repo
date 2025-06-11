import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditProfile from './components/Profile/EditProfile';
import ProfilePage from './components/Profile/ProfilePage';


const App = () => {
  return (
    <Router>
      <Routes>

         <Route path="/edit" element={<EditProfile />} />
         <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default App;

// Rendering logic (moved to index.js or handled by Vite)

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
