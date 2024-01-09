/* eslint-disable no-plusplus */
import cn from 'classnames';
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
  const totalPages = Math.ceil(total / perPage);
  const isLastPage = totalPages === currentPage;
  const lastPageItems = isLastPage
    ? total % perPage
    : perPage;

  const pageNumbers = getNumbers(1, totalPages);
  const pageContent = [];

  for (let i = 0; i < lastPageItems; i++) {
    pageContent.push(i + ((currentPage - 1) * perPage) + 1);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item',
          { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageNumbers.map((page) => {
          return (
            <li
              className={cn('page-item', { active: page === currentPage })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item',
          { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pageContent.map((item) => {
          const content = `Item ${item}`;

          return (
            <li key={item} data-cy="item">
              {content}
            </li>
          );
        })}
      </ul>
    </>
  );
};
