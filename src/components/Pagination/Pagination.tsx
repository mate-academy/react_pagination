import cn from 'classnames';
import { PageGhangeCallback } from '../../types/PageChangeCallback';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange(page: number | PageGhangeCallback): void;
}

const getPages = (total: number, perPage: number) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }

  return pages;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getPages(total, perPage);

  const handlePrevNextPage = (increase: boolean) => {
    if (currentPage !== 1 && !increase) {
      return onPageChange((currentState => {
        let currentValue = currentState;

        return (currentValue -= 1);
      }) as PageGhangeCallback);
    }

    if (currentPage !== pages[pages.length - 1] && increase) {
      return onPageChange((currentState => {
        let currentValue = currentState;

        return (currentValue += 1);
      }) as PageGhangeCallback);
    }
  };

  const handleChangePage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => handlePrevNextPage(false)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
          onClick={() => handleChangePage(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === pages[pages.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === pages[pages.length - 1] ? 'true' : 'false'
          }
          onClick={() => handlePrevNextPage(true)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
