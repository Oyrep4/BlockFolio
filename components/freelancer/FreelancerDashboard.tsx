import React, { useState } from 'react';
import RatingSystemImage from '../../src/assets/RatingSystem.png';
import './FreelancerDashboard.css';

interface FreelancerDashboardProps {
  onBack?: () => void;
}

const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('connected');
  const [showRatingInfo, setShowRatingInfo] = useState(false);

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
        {['connected', 'ratings', 'stats'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'connected' && 'Connected Platforms'}
            {tab === 'ratings' && (
              <React.Fragment>
                Ratings
                <button 
                  className="tab-info-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRatingInfo(true);
                  }}
                  aria-label="Rating information"
                >
                  ?
                </button>
              </React.Fragment>
            )}
            {tab === 'stats' && 'Statistics'}
          </button>
        ))}
      </div>

      {showRatingInfo && (
        <div className="modal-overlay" onClick={() => setShowRatingInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowRatingInfo(false)}>×</button>
            <img 
              src={RatingSystemImage} 
              alt="Rating System Information" 
              className="rating-info-image" 
              onLoad={(e) => {
                // Auto-size the modal to fit the image
                const img = e.target as HTMLImageElement;
                const modalContent = img.closest('.modal-content') as HTMLElement | null;
                if (modalContent) {
                  modalContent.style.width = `${img.naturalWidth}px`;
                  modalContent.style.maxWidth = 'none';
                }
              }}
            />
          </div>
        </div>
      )}

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

const ConnectedPlatforms = () => (
  <div className="tab-pane">
    <h2>Your Connected Platforms</h2>
    <div className="platforms-grid">
      {['Upwork', 'Fiverr', 'Freelancer.com'].map(platform => (
        <div key={platform} className="platform-card connected">
          <h3>{platform}</h3>
          <p className="connected-status">
            <span className="status-dot"></span>
            Connected
          </p>
          <button className="connect-btn" disabled>
            Connected
          </button>
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
      employer: 'SoloGigs', 
      rating: 4.5, 
      platform: 'Upwork',
      date: '2025-07-09',
      review: 'Exceptional freelancer, highly recommended!'
    },
    { 
      employer: 'TestWork', 
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

const Statistics = () => {

  return (
    <div className="tab-pane">
      <div className="stats-section">
        <h2>Your Personal Statistics</h2>
        <div className="stats-grid">
          {[
            { title: 'Total Earnings', value: '$7,839' },
            { title: 'Jobs Completed', value: '66' },
            { title: 'Active Jobs', value: '2' },
            { title: 'Completion Rate', value: '95.3%' },
            { title: 'Acceptance Rate', value: '67.0%' }
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
            { title: 'Jobs Completed', value: '66' },
            { title: 'Completion Rate', value: '95.3%' },
            { title: 'Aggregate Reputation Score', value: '698/800' }
          ].map(stat => (
            <div key={`resume-${stat.title}`} className="stat-card">
              <h3>{stat.title}</h3>
              <p>
                {stat.icon && <span className="stat-icon">{stat.icon} </span>}
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;