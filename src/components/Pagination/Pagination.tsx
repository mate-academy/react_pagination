import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  visibleRange: [number, number];
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  visibleRange,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
          onClick={handlePrevClick}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {(() => {
          const elements = [];

          for (let i = 1; i <= totalPages; i++) {
            elements.push(
              <li
                key={i}
                className={classNames('page-item', {
                  active: currentPage === i,
                })}
                onClick={() => onPageChange(i)}
              >
                <a data-cy="pageLink" className="page-link" href={`#${i}`}>
                  {i}
                </a>
              </li>,
            );
          }

          return elements;
        })()}
        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
          onClick={handleNextClick}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {(() => {
          const elements = [];

          for (let i = visibleRange[0]; i <= visibleRange[1]; i++) {
            elements.push(
              <li key={i} data-cy="item">
                Item {i}
              </li>,
            );
          }

          return elements;
        })()}
      </ul>
    </>
  );
};
