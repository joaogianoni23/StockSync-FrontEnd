'use client';

import React from 'react';

export const Table = ({ headers, data, actions }) => {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--primary)', color: 'var(--neutral-light)' }}>
            {headers.map((header, index) => (
              <th 
                key={index}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {header}
              </th>
            ))}
            {actions && <th style={{ padding: '12px 16px', textAlign: 'center' }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              style={{
                borderBottom: '1px solid var(--border)',
                background: rowIndex % 2 === 0 ? 'var(--card-bg)' : 'var(--background)'
              }}
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  style={{
                    padding: '12px 16px',
                    color: 'var(--foreground)',
                    fontSize: '14px'
                  }}
                >
                  {cell}
                </td>
              ))}
              {actions && (
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  {actions(row, rowIndex)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--foreground)', opacity: 0.6 }}>
          Nenhum dado disponível
        </div>
      )}
    </div>
  );
};

