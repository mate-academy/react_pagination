import React from 'react';

export const ContentWindow: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  );
};
