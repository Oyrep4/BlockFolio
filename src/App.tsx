import { useState } from 'react';
import './App.css';
import FreelancerDashboard from '../components/freelancer/FreelancerDashboard';

function App() {
  const [showFreelancerDashboard, setShowFreelancerDashboard] = useState(false);

  if (showFreelancerDashboard) {
    return <FreelancerDashboard onBack={() => setShowFreelancerDashboard(false)} />;
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
            onClick={() => setShowFreelancerDashboard(true)}
          >
            Freelancer
          </button>
          <button className="login-button employer">Employer</button>
        </div>
      </main>
    </div>
  );
}

export default App
