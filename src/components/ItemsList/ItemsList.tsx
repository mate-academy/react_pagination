import React from 'react';

type Props = {
  items: string[]
};

export const ItemsList: React.FC<Props> = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
