import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  totalItemsCount: number;
  itemsPerPage: number;
  currectPage: number;
};

export const ItemsList: React.FC<Props> = ({
  totalItemsCount,
  itemsPerPage,
  currectPage,
}) => {
  const fromItem = itemsPerPage * (currectPage - 1) + 1;
  const toItem = Math.min(itemsPerPage * currectPage, totalItemsCount);

  const visibleItems: number[] = getNumbers(fromItem, toItem);

  return (
    <ul>
      {visibleItems.map((item: number) => (
        <li key={item} data-cy="item">
          Item {item}
        </li>
      ))}
    </ul>
  );
};
