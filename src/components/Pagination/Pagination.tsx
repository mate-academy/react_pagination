import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

enum Direction {
  Prev = 'prev',
  Next = 'next',
}

type ButtonProp = {
  direction: Direction
};

export const Pagination: FC<Props> = ({
  total,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / itemsPerPage));

  const [prev, setPrev] = useState(currentPage - 1);
  const [next, setNext] = useState(currentPage + 1);

  useEffect(() => {
    setNext(currentPage + 1);
    setPrev(currentPage - 1);
  }, [currentPage]);

  const StepButton: FC<ButtonProp> = ({ direction }) => {
    const isAnEdgePage = currentPage === {
      prev: 1,
      next: pages.length,
    }[direction];

    const page = {
      prev,
      next,
    }[direction];

    const button = {
      prev: '«',
      next: '»',
    }[direction];

    return (
      <li
        className={cn('page-item', {
          disabled: isAnEdgePage,
        })}
      >
        <a
          data-cy={`${direction}Link`}
          className="page-link"
          href={`#${direction}`}
          aria-disabled={isAnEdgePage}
          onClick={() => {
            if (!isAnEdgePage) {
              onPageChange(page);
            }
          }}
        >
          {button}
        </a>
      </li>
    );
  };

  return (
    <ul className="pagination">
      <StepButton direction={Direction.Prev} />

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <StepButton direction={Direction.Next} />
    </ul>
  );
};
