import React from 'react';

type PaginationProps = {
  total: string[];
};

export const Pagination = ({ total }: PaginationProps) => {
  return (
    <ul>
      {total.map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
