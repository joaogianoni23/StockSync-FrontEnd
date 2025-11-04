'use client';

import React from 'react';

interface AlertProps {
  type?: 'warning' | 'error' | 'success' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
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
      <div>{children}</div>
    </div>
  );
};
