import type { MouseEvent, FC } from 'react';
import { StepButton } from '../StepButton';
import { PageNumber } from '../PageNumber';

type Props = {
  currentPage: number;
  pages: number;
  onPageChange: (action: number | string) => void;
};

export const Pagination: FC<Props> = ({ currentPage, onPageChange, pages }) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const nextClick = (e: MouseEvent) => {
    e.preventDefault();

    if (currentPage === pages) {
      return;
    }

    onPageChange('next');
  };

  const prevClick = (e: MouseEvent) => {
    e.preventDefault();
    if (currentPage === 1) {
      return;
    }

    onPageChange('prev');
  };

  return (
    <ul className="pagination">

      <StepButton
        direction="prev"
        page={currentPage}
        totalPage={pages}
        handleClick={prevClick}
      />

      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <StepButton
        direction="next"
        page={currentPage}
        totalPage={pages}
        handleClick={nextClick}
      />
    </ul>
  );
};
