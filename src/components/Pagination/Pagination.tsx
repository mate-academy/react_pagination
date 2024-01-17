import cn from 'classnames';
import { PaginationRules } from '../../types/PaginationRules';
import { createLinksList } from '../../services/LinksService';

interface Props<T> {
  paginationRules: PaginationRules
  items: T[]
  onPageChanged: (rules: PaginationRules) => void
}

export function Pagination<T>({
  paginationRules,
  items,
  onPageChanged,
}: Props<T>) {
  const pageLinks = createLinksList(
    Math.ceil(paginationRules.total / paginationRules.perPage),
    paginationRules.currentPage,
    (pageNumber: number) => onPageChanged({
      ...paginationRules,
      currentPage: pageNumber,
    }),
  );

  const visibleItems = items
    .slice((paginationRules.currentPage - 1) * paginationRules.perPage,
      (paginationRules.currentPage - 1) * paginationRules.perPage
      + paginationRules.perPage);

  const handleNextPageButtonClicked = () => {
    if (paginationRules.currentPage === pageLinks.length) {
      return;
    }

    onPageChanged({
      ...paginationRules,
      currentPage: paginationRules.currentPage + 1,
    });
  };

  const handlePrevPageButtonClicked = () => {
    if (paginationRules.currentPage === 1) {
      return;
    }

    onPageChanged({
      ...paginationRules,
      currentPage: paginationRules.currentPage - 1,
    });
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: paginationRules.currentPage === 1,
        })}
        >
          <a
            onClick={handlePrevPageButtonClicked}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={paginationRules.currentPage === 1}
          >
            «
          </a>
        </li>
        {pageLinks}
        <li className={cn('page-item', {
          disabled: paginationRules.currentPage === pageLinks.length,
        })}
        >
          <a
            onClick={handleNextPageButtonClicked}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={paginationRules.currentPage === pageLinks.length}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item as unknown as string}>{item}</li>
        ))}
      </ul>
    </>
  );
}
