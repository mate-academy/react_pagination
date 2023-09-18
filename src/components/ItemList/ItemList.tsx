import React from 'react';

type Props = {
  items: string[],
};

export const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  );
};
