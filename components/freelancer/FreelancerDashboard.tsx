import React, { useState } from 'react';
import './FreelancerDashboard.css';

interface FreelancerDashboardProps {
  onBack?: () => void;
}

const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('connected');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'connected': return <ConnectedPlatforms />;
      case 'history': return <WorkHistory />;
      case 'ratings': return <Ratings />;
      case 'stats': return <Statistics />;
      default: return <ConnectedPlatforms />;
    }
  };

  return (
    <div className="freelancer-dashboard">
      <div className="dashboard-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <h1>Freelancer Dashboard</h1>
      </div>
      
      <div className="tabs">
        {['connected', 'history', 'ratings', 'stats'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

const ConnectedPlatforms = () => (
  <div className="tab-pane">
    <h2>Your Connected Platforms</h2>
    <div className="platforms-grid">
      {['Upwork', 'Fiverr', 'Freelancer.com'].map(platform => (
        <div key={platform} className="platform-card">
          <h3>{platform}</h3>
          <p>Not Connected</p>
          <button className="connect-btn">Connect</button>
        </div>
      ))}
    </div>
  </div>
);

const WorkHistory = () => (
  <div className="tab-pane">
    <h2>Your Work History</h2>
    <div className="work-history">
      <p>No work history available. Complete jobs to see them here.</p>
    </div>
  </div>
);

const Ratings = () => (
  <div className="tab-pane">
    <h2>Your Ratings</h2>
    <div className="ratings-container">
      <div className="overall-rating">
        <span className="rating-value">0.0</span>
        <div className="stars">★★★★★</div>
        <p>No ratings yet</p>
      </div>
    </div>
  </div>
);

const Statistics = () => (
  <div className="tab-pane">
    <h2>Your Statistics</h2>
    <div className="stats-grid">
      {[
        { title: 'Total Earnings', value: '$0' },
        { title: 'Jobs Completed', value: '0' },
        { title: 'Active Jobs', value: '0' },
        { title: 'Response Rate', value: '0%' }
      ].map(stat => (
        <div key={stat.title} className="stat-card">
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FreelancerDashboard;