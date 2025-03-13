import React from 'react';
import { Item } from '../../types';

type Props = {
  perPage: number;
  currentPage: number;
  items: Item[];
};

export const ContentItems: React.FC<Props> = ({
  perPage: itemsPerPage,
  currentPage,
  items,
}: Props) => {
  const from: number = itemsPerPage * (currentPage - 1);
  const to: number = Math.min(from + itemsPerPage, items.length);

  return (
    <ul>
      {items.slice(from, to).map((item: Item) => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
