import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const buttons = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {buttons.map(button => {
        return (
          <li
            onClick={() => {
              if (button !== currentPage) {
                onPageChange(button);
              }
            }}
            className={
              currentPage === button ? 'page-item active' : 'page-item'
            }
            key={button}
          >
            <a data-cy="pageLink" className="page-link" href={`#${button}`}>
              {button}
            </a>
          </li>
        );
      })}
      <li
        className={
          currentPage === buttons.length ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === buttons.length ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== buttons.length) {
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
