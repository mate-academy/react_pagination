import { FC } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
        {getNumbers(1, pagesCount).map(n => (
          <li
            className={`page-item ${currentPage === n ? 'active' : ''}`}
            key={n}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${n}`}
              onClick={() => {
                onPageChange(n);
              }}
            >
              {n}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === pagesCount ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== pagesCount) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
