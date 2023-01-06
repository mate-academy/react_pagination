import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const [prev, setPrev] = useState(currentPage - 1);
  const [next, setNext] = useState(currentPage + 1);

  useEffect(() => {
    setNext(currentPage + 1);
    setPrev(currentPage - 1);
  }, [currentPage]);

  const renderStepButton = (direction: 'prev' | 'next') => {
    const isAnEdgePage = {
      prev: currentPage === 1,
      next: currentPage === pages.length,
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
      {renderStepButton('prev')}

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

      {renderStepButton('next')}
    </ul>
  );
};
