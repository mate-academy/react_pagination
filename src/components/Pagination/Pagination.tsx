import React from 'react';
import cN from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageItems = Math.ceil(total / perPage);
  const pageRender = getNumbers(1, pageItems);

  return (

    <ul className="pagination">
      <li className={cN(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pageRender.map(number => {
        return (
          <li className={cN(
            'page-item',
            { active: currentPage === number },
          )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => {
                onPageChange(number);
              }}
            >
              {number}
            </a>
          </li>
        );
      })}
      <li className={cN(
        'page-item',
        { disabled: currentPage === pageItems },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>

  );
};
