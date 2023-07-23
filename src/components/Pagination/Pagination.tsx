import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  firstItemOnPage: number,
  lastItemOnPage: number,
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => {},
}

export const Pagination: React.FC<Props> = ({
  firstItemOnPage,
  lastItemOnPage,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pageArr = getNumbers(1, pagesAmount);

  const allItems = getNumbers(1, total);

  const itemsOnPageArr
  = [...allItems].slice(firstItemOnPage - 1, lastItemOnPage);

  const eventHandler = (newPage: number) => {
    if (currentPage !== newPage) {
      onPageChange(newPage);
    }
  };

  const prevHandler = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage !== pagesAmount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => prevHandler()}
          >
            «
          </a>
        </li>
        {pageArr.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => eventHandler(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn('page-item', {
          disabled: currentPage === pagesAmount,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesAmount ? 'true' : 'false'}
            onClick={() => nextHandler()}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPageArr.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
