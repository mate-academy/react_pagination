import React from 'react';

type Props = {
  currentPage: number;
  firstItem: number;
  lastItem: number;
  items: string[];
};

export const PageInfo: React.FC<Props> = ({
  currentPage,
  firstItem,
  lastItem,
  items,
}) => {
  return (
    <p className="lead" data-cy="info">
      {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${items.length})`}
    </p>
  );
};
