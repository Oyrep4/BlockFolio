import React, { useState } from 'react';
import './EmployerDashboard.css';

interface EmployerDashboardProps {
  onBack?: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('workHistory');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'workHistory': return <WorkHistory />;
      case 'stats': return <Statistics />;
      default: return <WorkHistory />;
    }
  };

  return (
    <div className="employer-dashboard">
      <div className="dashboard-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <h1>Employer Dashboard</h1>
      </div>
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'workHistory' ? 'active' : ''}`}
          onClick={() => setActiveTab('workHistory')}
        >
          Work History
        </button>
        <button
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>
      
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

// Work History Component
const WorkHistory = () => {
  //sample work history data for now, in a real app, this would come from an API
  const workHistory = [
    {
      id: 1,
      freelancer: 'Anderson Silva',
      project: 'E-commerce Website Development',
      rating: 4.8,
      review: 'Great communication and timely payments.',
      date: '10-03-2025'
    },
    {
      id: 2,
      freelancer: 'Chael Sonnon',
      project: 'Mobile App Design',
      rating: 4.5,
      review: 'Clear requirements and fair negotiation. Good collaboration.',
      date: '10-04-2025'
    },
    {
      id: 3,
      freelancer: 'Demetrious Johnson',
      project: 'Content Writing',
      rating: 3.2,
      review: 'Decent pay, heavier workload than expected',
      date: '12-04-2025'
    }
  ];

  return (
    <div className="work-history-container">
      <h2>Work History</h2>
      <div className="work-history">
        {workHistory.map(job => (
          <div key={job.id} className="work-history-card">
            <div className="work-history-header">
              <h3>{job.project}</h3>
              <div className="rating">
                <span className="rating-value">{job.rating}</span>
                <span className="star">★</span>
              </div>
            </div>
            <p className="freelancer">Freelancer: {job.freelancer}</p>
            <p className="review">"{job.review}"</p>
            <p className="date">{new Date(job.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Statistics Component
const Statistics = () => {
    const [showRatingInfo, setShowRatingInfo] = useState(false);
  
    return (
      <div className="tab-pane">
        <div className="stats-section">
          <h2>Your Personal Statistics</h2>
          <div className="stats-grid">
            {[
              { title: 'Assigned Jobs', value: '155' },
              { title: 'Average Pay Rate (dev. IS)', value: '+1.2' },
              { title: 'Freelancer Satisfaction', value: '4.9/5' },
              { title: 'Repeat Hire Rate', value: '83.3%' },
              { title: 'Dispute Rate', value: '11.0%' }
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
              { 
                title: 'Average Rating', 
                value: '4.3', 
                icon: '★',
                info: true 
              },
              { title: 'Jobs Assigneed', value: '155' },
              { title: 'Dispute Rate', value: '11.0%' },
              { title: 'Aggregate Reputation Score', value: '751/800' }
            ].map(stat => (
              <div key={`resume-${stat.title}`} className="stat-card">
                <h3>{stat.title}</h3>
                <p>
                  {stat.icon && <span className="stat-icon">{stat.icon} </span>}
                  {stat.value}
                  {stat.info && (
                    <button 
                      className="info-button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRatingInfo(true);
                      }}
                      aria-label="Rating information"
                    >
                      <span className="info-icon">?</span>
                    </button>
                  )}
                </p>
                {showRatingInfo && stat.info && (
                  <div className="modal-overlay" onClick={() => setShowRatingInfo(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                      <button className="close-button" onClick={() => setShowRatingInfo(false)}>×</button>
                      <img src={RatingSystemImage} alt="Rating System Information" className="rating-info-image" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default EmployerDashboard;
