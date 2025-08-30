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

const Ratings = () => {
  const ratings = [
    { 
      employer: 'DevEx', 
      rating: 4.2, 
      platform: 'Upwork',
      date: '2025-08-22',
      review: 'Great work, delivered on time!'
    },
    { 
      employer: 'ReRep', 
      rating: 3.8, 
      platform: 'Fiverr',
      date: '2025-07-17',
      review: 'Good quality but lacked communication and updates.'
    },
    { 
      employer: 'Tony Montana', 
      rating: 4.5, 
      platform: 'Upwork',
      date: '2025-07-09',
      review: 'Exceptional freelancer, highly recommended!'
    },
    { 
      employer: 'Micheal Corleone', 
      rating: 4.0, 
      platform: 'Freelancer',
      date: '2025-06-27',
      review: 'Reliable and professional service.'
    },
    { 
      employer: 'WeHire', 
      rating: 4.3, 
      platform: 'Upwork',
      date: '2025-06-24',
      review: 'Will definitely work with again.'
    },
    { 
      employer: 'CodeMasters', 
      rating: 3.5, 
      platform: 'Fiverr',
      date: '2025-06-22',
      review: 'Good work, but had some delays.'
    },
    { 
      employer: 'TechGurus', 
      rating: 4.1, 
      platform: 'Freelancer',
      date: '2025-05-12',
      review: 'Great technical skills and communication.'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div className="tab-pane">
      <h2>Your Ratings</h2>
      <div className="ratings-container">
        <div className="overall-rating">
          <span className="rating-value">
            {(
              ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            ).toFixed(1)}
          </span>
          {renderStars(ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length)}
          <p>Based on {ratings.length} reviews</p>
        </div>

        <div className="ratings-list">
          {ratings.map((item, index) => (
            <div key={index} className="rating-item">
              <div className="rating-header">
                <div>
                  <h3>{item.employer}</h3>
                  <span className="rating-date">{item.date}</span>
                </div>
                <span className="platform-badge">{item.platform}</span>
              </div>
              <div className="rating-details">
                <div>
                  <div className="rating-score">
                    <span className="rating-value">{item.rating.toFixed(1)}</span>
                    {renderStars(item.rating)}
                  </div>
                  <p className="review-text">"{item.review}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Statistics = () => (
  <div className="tab-pane">
    <div className="stats-section">
      <h2>Your Personal Statistics</h2>
      <div className="stats-grid">
        {[
          { title: 'Total Earnings', value: '$0' },
          { title: 'Jobs Completed', value: '0' },
          { title: 'Active Jobs', value: '0' },
          { title: 'Completion Rate', value: '0%' },
          { title: 'Acceptance Rate', value: '0%' }
        ].map(stat => (
          <div key={`personal-${stat.title}`} className="stat-card">
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="stats-section">
      <h2>Your Blockchain Resume</h2>
      <div className="stats-grid">
        {[
          { title: 'Average Rating', value: '0.0', icon: '★' },
          { title: 'Jobs Completed', value: '0' },
          { title: 'Completion Rate', value: '0%' },
          { title: 'Aggregate Reputation Score', value: '0' }
        ].map(stat => (
          <div key={`resume-${stat.title}`} className="stat-card">
            <h3>{stat.title}</h3>
            <p>{stat.icon && <span className="stat-icon">{stat.icon} </span>}{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FreelancerDashboard;