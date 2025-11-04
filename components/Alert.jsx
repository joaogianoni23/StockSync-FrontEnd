'use client';

import React from 'react';

export const Alert = ({ 
  type = 'info', 
  children, 
  className = '' 
}) => {
  const typeClass = type === 'warning' ? 'alert-warning' : 
                    type === 'error' ? 'alert-error' : 
                    type === 'success' ? 'alert-success' : '';
  
  return (
    <div className={`alert ${typeClass} ${className}`}>
      {type === 'warning' && <span>⚠️</span>}
      {type === 'error' && <span>❌</span>}
      {type === 'success' && <span>✅</span>}
      {type === 'info' && <span>ℹ️</span>}
      {children}
    </div>
  );
};

