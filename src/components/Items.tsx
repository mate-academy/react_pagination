import React from 'react';

type Props = {
  itemsList: string[];
};

export const Items: React.FC<Props> = ({ itemsList }) => (
  <ul>
    {itemsList.map((item: string) => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
