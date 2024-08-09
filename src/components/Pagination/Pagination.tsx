import { useMemo } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  items: string[];
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  items,
  onPageChange,
}) => {
  const navigationLinks = Math.ceil(total / perPage);
  const allPages: number[] = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= navigationLinks; i++) {
      pages.push(i);
    }

    return pages;
  }, [navigationLinks]);

  const start = (currentPage - 1) * perPage;
  const finish = (currentPage - 1) * perPage + perPage;
  const itemsShow = items.slice(start, finish);

  const prevPage = currentPage - 1 < 1 ? 1 : currentPage - 1;
  const nextPage =
    currentPage + 1 > allPages.length ? allPages.length : currentPage + 1;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === prevPage,
          })}
          onClick={() => onPageChange(prevPage)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${prevPage}`}
            aria-disabled={prevPage === currentPage}
          >
            «
          </a>
        </li>
        {allPages.map(page => (
          <li
            className={cn('page-item', {
              active: page === currentPage,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href="#1">
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === nextPage,
          })}
          onClick={() => onPageChange(nextPage)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${nextPage}`}
            aria-disabled={nextPage === currentPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsShow.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
