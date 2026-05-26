import React from 'react';
import './SubjectCard.css';

const SubjectCard = ({ subject, onSelect }) => {
  return (
    <div className="subject-card">
      <div className="subject-header">
        <h3>{subject.name}</h3>
        <span className="subject-category">{subject.category}</span>
      </div>
      <p className="subject-description">{subject.description}</p>
      <div className="subject-details">
        <div className="detail-item">
          <span className="label">Nivo:</span>
          <span className="value">{subject.level}</span>
        </div>
        <div className="detail-item">
          <span className="label">Dostupno:</span>
          <span className="value">{subject.availableSlots || 'Neograničeno'}</span>
        </div>
      </div>
      <button className="btn-select" onClick={() => onSelect(subject)}>
        Odaberi Predmet
      </button>
    </div>
  );
};

export default SubjectCard;