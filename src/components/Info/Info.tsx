import type { FC } from 'react';

type Props = {
  currentPage: number;
  firstItem: number;
  lastItem: number;
  length: number;
};

export const Info: FC<Props> = ({
  currentPage,
  firstItem,
  lastItem,
  length,
}) => (
  <p className="lead" data-cy="info">
    {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${length})`}
  </p>
);
