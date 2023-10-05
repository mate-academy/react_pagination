import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
}

export const Items: React.FC<Props> = ({
  total, perPage, currentPage,
}) => {
  const items = getNumbers(1, total)
    .map(item => `Item ${item}`);

  const currentItems = items
    .slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <ul>
      {currentItems.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  );
};
