import React from 'react';

interface Props {
  items: string[];
}

export const Items: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item} data-cy="item">{item}</li>
      ))}
    </ul>
  );
};
