'use client';

import React from 'react';

export const Button = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const variantClass = variant === 'secondary' ? 'btn-secondary' : variant === 'danger' ? 'btn-danger' : '';
  
  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

