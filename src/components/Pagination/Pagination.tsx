import React from 'react';

import { PrevPageButton } from '../PrevPageButton';
import { NextPageButton } from '../NextPageButton';
import { Pages } from '../Pages';

type Props = {
  total: number[],
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    onPageChange,
    total,
    currentPage,
  } = props;

  return (
    <ul className="pagination">
      <PrevPageButton
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <Pages
        total={total}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <NextPageButton
        total={total}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </ul>
  );
};
