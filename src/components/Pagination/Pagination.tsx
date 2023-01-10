import type { MouseEvent, FC } from 'react';
import { StepButton } from '../StepButton';
import { PageNumber } from '../PageNumber';
import { Direction } from '../../types/Direction';

type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange: (action: number | Direction) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  onPageChange,
  pageCount,
}) => {
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const nextClick = (e: MouseEvent) => {
    e.preventDefault();

    if (currentPage === pageCount) {
      return;
    }

    onPageChange(Direction.Next);
  };

  const prevClick = (e: MouseEvent) => {
    e.preventDefault();
    if (currentPage === 1) {
      return;
    }

    onPageChange(Direction.Prev);
  };

  return (
    <ul className="pagination">

      <StepButton
        direction={Direction.Prev}
        page={currentPage}
        totalPage={pageCount}
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
        direction={Direction.Next}
        page={currentPage}
        totalPage={pageCount}
        handleClick={nextClick}
      />
    </ul>
  );
};
