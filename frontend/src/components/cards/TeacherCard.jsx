import React from 'react';
import './TeacherCard.css';

const TeacherCard = ({ teacher, onSelect }) => {
  const getRatingStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="teacher-card">
      <div className="teacher-avatar">
        {teacher.avatar ? (
          <img src={teacher.avatar} alt={teacher.name} />
        ) : (
          <div className="avatar-placeholder">{teacher.name.charAt(0)}</div>
        )}
      </div>
      <div className="teacher-info">
        <h3>{teacher.name}</h3>
        <p className="teacher-title">{teacher.title}</p>
        <div className="teacher-rating">
          <span className="stars">{getRatingStars(teacher.rating)}</span>
          <span className="rating-value">{teacher.rating?.toFixed(1)}/5</span>
        </div>
        <p className="teacher-bio">{teacher.bio}</p>
        <div className="teacher-meta">
          <span className="experience">📚 {teacher.experience} godina iskustva</span>
          <span className="reviews">💬 {teacher.reviewCount || 0} recenzija</span>
        </div>
        <div className="teacher-price">
          <span className="price-label">Satnica:</span>
          <span className="price-value">{teacher.hourlyRate} RSD/sat</span>
        </div>
      </div>
      <button className="btn-select-teacher" onClick={() => onSelect(teacher)}>
        Odaberi Predavača
      </button>
    </div>
  );
};

export default TeacherCard;