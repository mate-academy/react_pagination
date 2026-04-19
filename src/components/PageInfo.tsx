import React from 'react';

interface PageInfoProps {
  currentPage: number;
  startIndex: number;
  lastIndex: number;
  total: number;
}
export const PageInfo: React.FC<PageInfoProps> = ({
  currentPage,
  startIndex,
  lastIndex,
  total,
}) => {
  return (
    <p className="lead" data-cy="info">
      Page {currentPage} (items {startIndex + 1} - {lastIndex} of {total})
    </p>
  );
};
