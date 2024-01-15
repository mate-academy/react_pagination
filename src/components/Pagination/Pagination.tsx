import cn from 'classnames';
import { PaginationRules } from '../../types/PaginationRules';

interface Props<T> {
  paginationRules: PaginationRules
  items: T[]
  onPageChanged: (rules: PaginationRules) => void
}

function createLinksList(amount: number,
  activePage: number,
  onClickCallBack: (pageNumber: number) => void) {
  const linksList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < amount; i++) {
    linksList.push(
      <li className={cn('page-item', {
        active: i === activePage - 1,
      })}
      >
        <a
          onClick={() => onClickCallBack(i + 1)}
          data-cy="pageLink"
          className="page-link"
          href={`#${i + 1}`}
          key={i}
        >
          {i + 1}
        </a>
      </li>,
    );
  }

  return linksList;
}

export function Pagination<T>({ paginationRules,
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

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: paginationRules.currentPage === 1,
        })}
        >
          <a
            onClick={() => {
              if (paginationRules.currentPage === 1) {
                return;
              }

              onPageChanged({
                ...paginationRules,
                currentPage: paginationRules.currentPage - 1,
              });
            }}
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
            onClick={() => {
              if (paginationRules.currentPage === pageLinks.length) {
                return;
              }

              onPageChanged({
                ...paginationRules,
                currentPage: paginationRules.currentPage + 1,
              });
            }}
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
