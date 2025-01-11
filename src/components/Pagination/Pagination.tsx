import classNames from 'classnames';
import { PaginationPage } from './PaginationPage';
import { PaginationInterface } from './types';
import { PaginationItems } from './PaginationItems';

export const Pagination = ({
  pagination,
}: {
  pagination: PaginationInterface;
}) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: pagination.currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={pagination.currentPage === 1}
            onClick={() => {
              const lastPage = (pagination.currentPage || 1) - 1;

              if (lastPage > 0) {
                pagination.onPageChange(lastPage);
              }
            }}
          >
            «
          </a>
        </li>

        <PaginationPage pagination={pagination} />

        <li
          className={classNames('page-item', {
            disabled:
              pagination.currentPage ===
              Math.ceil(pagination.total / pagination.perPage),
          })}
        >
          <a
            data-cy="nextLink"
            href="#next"
            className="page-link"
            aria-disabled={
              pagination.currentPage ===
              Math.ceil(pagination.total / pagination.perPage)
            }
            onClick={() => {
              const nextPage = (pagination.currentPage || 1) + 1;
              const maxPage = Math.ceil(pagination.total / pagination.perPage);

              if (nextPage <= maxPage) {
                pagination.onPageChange(nextPage);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        <PaginationItems pagination={pagination} />
      </ul>
    </>
  );
};
