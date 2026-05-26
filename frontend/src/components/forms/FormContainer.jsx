import React from 'react';
import './FormContainer.css';

const FormContainer = ({ children, title, subtitle }) => {
  return (
    <div className="form-container-wrapper">
      <div className="form-container">
        {title && <h1 className="form-title">{title}</h1>}
        {subtitle && <p className="form-subtitle">{subtitle}</p>}
        <div className="form-content">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;