import React from 'react';

type Props = {
  items: number[];
};

export const Page: React.FC<Props> = ({
  items,
}) => (
  <ul>
    {items.map(item => (
      <li data-cy="item" key={item}>{`Item ${item}`}</li>
    ))}
  </ul>
);
