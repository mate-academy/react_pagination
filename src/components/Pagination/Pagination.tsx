import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  items: string[];
  perPage: number;
  currentPage: number;
  itemsStartRange: number;
  itemsEndRange: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = (
  {
    total,
    items,
    perPage,
    currentPage,
    itemsStartRange,
    itemsEndRange,
    onPageChange,
  },
) => {
  const pageNumbers = (getNumbers(1,
    Math.ceil(total / perPage))
  );

  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === pageNumbers.at(-1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNextPageChange = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPageChange = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const visibleItems = items.filter((_, index) => (
    index >= (itemsStartRange - 1)
    && index <= (itemsEndRange - 1)
  ));

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item',
            { disabled: isFirstPageActive })}
        >
          <a
            onClick={handlePrevPageChange}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPageActive}
          >
            «
          </a>
        </li>

        {pageNumbers.map((page) => (
          <li
            key={page}
            className={classNames('page-item',
              { active: page === currentPage })}
          >
            <a
              onClick={() => handlePageChange(page)}
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={classNames('page-item',
          { disabled: isLastPageActive })}
        >
          <a
            onClick={handleNextPageChange}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPageActive}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
