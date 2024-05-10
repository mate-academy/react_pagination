import React from 'react';
import { ItemsProps } from '../types';

export const Items: React.FC<ItemsProps> = ({
  activePage,
  itemsPerPage,
  total,
}) => {
  const startingItemToShow = activePage * itemsPerPage - itemsPerPage;
  const lastItemToShow = activePage * itemsPerPage - 1;

  return (
    <ul>
      {total.map((item: string, i: number) => {
        return i >= startingItemToShow && i <= lastItemToShow ? (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ) : null;
      })}
    </ul>
  );
};
