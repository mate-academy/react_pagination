import React, { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [activeButtons, setActiveButtons] = useState({
    prev: true,
    next: false,
  });

  useEffect(() => {
    setActiveButtons({
      prev: true,
      next: false,
    });
  }, [perPage]);

  const pageNumber = [];

  for (let i = 0; i < total; i += 1) {
    pageNumber.push(i);
  }

  const handleDirectButton = (number: number) => {
    const newPage = currentPage + number;

    onPageChange(newPage);

    setActiveButtons({
      prev: newPage === 0,
      next: newPage === pageNumber.length - 1,
    });
  };

  const handleActivePage = (page: number) => {
    onPageChange(page);

    setActiveButtons({
      prev: !page,
      next: !!page,
    });
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${cn({ disabled: activeButtons.prev })}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={activeButtons.prev}
          onClick={() => handleDirectButton(-1)}
        >
          «
        </a>
      </li>
      {pageNumber.map(item => {
        const page = item + 1;

        return (
          <li
            key={item}
            className={`page-item ${cn({ active: currentPage === item })}`}
          >
            <a
              onClick={() => handleActivePage(item)}
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={`page-item ${cn({ disabled: activeButtons.next })}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={activeButtons.next}
          onClick={() => handleDirectButton(1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
