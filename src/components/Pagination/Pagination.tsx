import React from 'react';
import classNames from 'classnames';

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

  const nextPage = () => {
    if (currentPage < total.length) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {total.map(item => {
        return (
          <li
            key={item}
            className={classNames(
              'page-item',
              { active: currentPage === item },
            )}
          >
            <a
              className="page-link"
              data-cy="pageLink"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        );
      })}
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === total.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === total.length}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
