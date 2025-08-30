import { useState } from 'react';
import './App.css';
import FreelancerDashboard from '../components/freelancer/FreelancerDashboard';
import EmployerDashboard from '../components/employer/EmployerDashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState<'none' | 'freelancer' | 'employer'>('none');

  if (showDashboard === 'freelancer') {
    return <FreelancerDashboard onBack={() => setShowDashboard('none')} />;
  }

  if (showDashboard === 'employer') {
    return <EmployerDashboard onBack={() => setShowDashboard('none')} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>BlockFolio</h1>
        <p className="tagline">Your Work, Your Reputation, Anywhere</p>
      </header>
      <main className="main-content">
        <div className="buttons-container">
          <button 
            className="login-button freelancer"
            onClick={() => setShowDashboard('freelancer')}
          >
            <i className="fas fa-user-tie"></i>
            Freelancer
          </button>
          <button 
            className="login-button employer"
            onClick={() => setShowDashboard('employer')}
          >
            <i className="fas fa-building"></i>
            Employer
          </button>
        </div>
      </main>
    </div>
  );
}

export default App
