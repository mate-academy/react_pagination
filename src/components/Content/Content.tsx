import React from 'react';

type Props = {
  items: string[];
};
export const Content: React.FC<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li
        key={item}
        data-cy="item"
      >
        {item}
      </li>
    ))}
  </ul>
);
