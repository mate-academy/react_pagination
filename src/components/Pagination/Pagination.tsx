import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  currentPage: number,
  perPage: number
  handlePageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  handlePageChange,
}) => {
  const countPages = Math.ceil(total / perPage);
  const items = getNumbers(1, total).map(n => `Item ${n}`);
  const arrayOfPage: number[] = getNumbers(1, countPages);
  const currentItemsOnPage = items.slice(
    (currentPage - 1) * perPage, (currentPage * perPage),
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === countPages;

  const pageChange = (page: number) => () => {
    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  const prevLinkClick = () => {
    if (!isFirstPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const nextLinkClick = () => {
    if (!isLastPage) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: isFirstPage })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={prevLinkClick}
          >
            «
          </a>
        </li>
        {arrayOfPage.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item', { active: page === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className={classNames('page-link')}
              href={`#${page}`}
              onClick={pageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item', { disabled: isLastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className={classNames('page-link')}
            href="#next"
            aria-disabled={isLastPage}
            onClick={nextLinkClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItemsOnPage.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>

  );
};
