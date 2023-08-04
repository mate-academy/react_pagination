import React from 'react';
import { getNumbers } from '../../utils';
import { PaginationButton } from '../PaginationButton';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const countPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, countPage);

  const prevOnClick = () => {
    if (currentPage && currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextOnClick = () => {
    if (currentPage && currentPage !== countPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <PaginationButton
        label="«"
        active={false}
        disabled={currentPage === 1}
        ariaDisabled={currentPage === 1}
        onClick={prevOnClick}
        dataCy="prevLink"
      />

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          label={String(page)}
          disabled={false}
          onClick={() => onPageChange(page)}
          dataCy="pageLink"
        />
      ))}

      <PaginationButton
        label="»"
        active={false}
        disabled={currentPage === countPage}
        ariaDisabled={currentPage === countPage}
        onClick={nextOnClick}
        dataCy="nextLink"
      />
    </ul>
  );
};
