import React from 'react';
import '../DashB_U_CSS/StatsCard.css';

function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">
          <span className="number">{value}</span>
          {icon && <span className="icon">{icon}</span>}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
