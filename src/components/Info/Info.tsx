import React from 'react';

type Props = {
  currentPage: number;
  items: string[];
  total: number;
};

export const Info: React.FC<Props> = ({ currentPage, items, total }) => {
  const firstItemOnPage = items[0].split(' ')[1];
  const lastItemOnPage = items[items.length - 1].split(' ')[1];

  return (
    <p className="lead" data-cy="info">
      {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
    </p>
  );
};
