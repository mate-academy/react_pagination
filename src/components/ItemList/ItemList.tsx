import React from 'react';

interface ItemListProps {
  items: string[];
}

export const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
