import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const ItemList: React.FC<Props> = ({ total, perPage, currentPage }) => {
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(startIndex + perPage - 1, total);

  const items = [];

  for (let i = startIndex; i <= endIndex; i++) {
    items.push(i);
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item} data-cy="item">
          Item {item}
        </li>
      ))}
    </ul>
  );
};
