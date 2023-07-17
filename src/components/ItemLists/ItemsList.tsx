import React from 'react';

type Props = {
  currentItems: string[],
};

export const ItemsList: React.FC<Props> = ({ currentItems }) => (
  <ul>
    {currentItems.map(item => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
