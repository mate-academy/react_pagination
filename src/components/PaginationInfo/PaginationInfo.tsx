import React from 'react';

interface Props {
  total: number;
  currentPage: number;
  firstItem: number;
  lastItem: number;
}

export const PaginationInfo: React.FC<Props> = ({
  total,
  currentPage,
  firstItem,
  lastItem,
}) => {
  return (
    <p className="lead" data-cy="info">
      {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
    </p>
  );
};
