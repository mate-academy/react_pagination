import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number[],
  currentPage: number,
  setCurrentPage: (event: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  setCurrentPage,
}) => {
  const onNext = () => {
    if (currentPage < total.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item',
            { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={onPrev}
          >
            «
          </a>
        </li>

        {total.map(page => (
          <li
            className={classNames('page-item',
              { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item',
            { disabled: currentPage === total.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === total.length}
            onClick={onNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
