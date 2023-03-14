import classNames from 'classnames';
import { useState } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.MouseEventHandler<HTMLAnchorElement>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const countPagination = Math.ceil(total / perPage);
  const countMassive = getNumbers(1, countPagination);
  const firstPage = selectedPage === 1;

  return (
    <ul className="pagination">
      <li
        id="prev"
        className={classNames(
          'page-item', { disabled: firstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={(event) => {
            onPageChange(event);
            setSelectedPage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {countMassive.map((number) => (
        <li
          key={number}
          id={`${number}`}
          className={classNames('page-item', {
            active: number === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={(event) => {
              onPageChange(event);
              setSelectedPage(number);
            }}
          >
            {number}
          </a>
        </li>
      ))}
      <li
        id="next"
        className={classNames(
          'page-item', { disabled: selectedPage === countPagination },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPagination}
          onClick={(event) => {
            onPageChange(event);
            setSelectedPage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
