'use client';

import React from 'react';

export const Input = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {label}
        </label>
      )}
      <input className={`input ${className}`} {...props} />
      {error && (
        <p className="mt-1 text-xs" style={{ color: '#c44' }}>{error}</p>
      )}
    </div>
  );
};

