import React from 'react';
import { getNumbers } from '../../utils';
import { PaginationButton } from './PaginationButton/PaginationButton';

type Props = {
  total: number
  perPage: number
  currentPage: number
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

  const prevButton = () => {
    if (currentPage && currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextButton = () => {
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
        onClickedEvent={prevButton}
        dataCy="prevLink"
      />

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          label={String(page)}
          disabled={false}
          onClickedEvent={() => onPageChange(page)}
          dataCy="pageLink"
        />
      ))}

      <PaginationButton
        label="»"
        active={false}
        disabled={currentPage === countPage}
        ariaDisabled={currentPage === countPage}
        onClickedEvent={nextButton}
        dataCy="nextLink"
      />
    </ul>
  );
};
