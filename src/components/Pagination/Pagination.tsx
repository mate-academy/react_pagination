import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const linksAmount = Math.ceil(total / perPage);
  const linkNumbers = getNumbers(1, linksAmount);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {linkNumbers.map(linkNumber => {
        return (
          <li
            className={`page-item ${currentPage === linkNumber ? 'active' : ''}`}
            key={linkNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${linkNumber}`}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                onPageChange(linkNumber);
              }}
            >
              {linkNumber}
            </a>
          </li>
        );
      })}

      <li
        className={`page-item ${currentPage === linksAmount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === linksAmount ? 'true' : 'false'}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
