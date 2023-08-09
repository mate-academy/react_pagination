import React from 'react';

interface Props {
  start: number;
  end: number;
  items: string[];
}

export const ItemList: React.FC<Props> = ({ start, end, items }) => {
  return (
    <ul>
      {items
        .slice(start, end)
        .map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
    </ul>
  );
};
