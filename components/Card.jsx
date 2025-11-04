'use client';

import React from 'react';

export const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

