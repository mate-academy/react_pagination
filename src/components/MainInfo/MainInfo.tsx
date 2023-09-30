import React from 'react';

type Props = {
  currentPage: number;
  itemStart: number;
  itemEnd: number;
  totalItems: number;
};

export const MainInfo: React.FC<Props> = ({
  currentPage,
  itemStart,
  itemEnd,
  totalItems,
}) => (
  <>
    <h1>Items with Pagination</h1>

    <p className="lead" data-cy="info">
      {`Page ${currentPage} (items ${
        itemStart + 1
      } - ${itemEnd} of ${totalItems})`}
    </p>
  </>
);
