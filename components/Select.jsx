'use client';

import React from 'react';

export const Select = ({ 
  label, 
  error, 
  options,
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
      <select className={`input ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs" style={{ color: '#c44' }}>{error}</p>
      )}
    </div>
  );
};

