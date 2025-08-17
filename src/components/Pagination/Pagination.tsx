import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
                                              total,
                                              perPage,
                                              currentPage,
                                              onPageChange,
                                            }) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1 ? true : false}`}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(elem => (
        <li
          className={classNames('page-item', {
            active: elem === currentPage,
          })}
          key={elem}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${elem}`}
            onClick={() => onPageChange(elem)}
          >
            {elem}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === totalPages ? true : false}`}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
