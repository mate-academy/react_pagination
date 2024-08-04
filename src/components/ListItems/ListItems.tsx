import React from 'react';
type Props = {
  items: string[];
  startIndex: number;
  endIndex: number;
};
export const ListItems: React.FC<Props> = ({ items, startIndex, endIndex }) => {
  return (
    <ul>
      {items.slice(startIndex, endIndex).map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
