import React from 'react';

interface Props {
  allItems: string[],
  start: number,
  end: number,
}

export const ItemsList: React.FC<Props> = ({ allItems, start, end }) => (
  <ul>
    {allItems
      .slice(start, end)
      .map(item => {
        return (
          <li data-cy="item" key={item}>{item}</li>
        );
      })}
  </ul>
);
