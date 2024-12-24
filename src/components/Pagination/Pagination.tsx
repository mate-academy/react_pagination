import { getNumbers, getPaginatedItems } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (arg: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const items = getNumbers(1, total).map(n => `Item ${n}`);
  const paginatedItems = getPaginatedItems(items, perPage);

  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pages.length;

  const handleBackwardsClick = () => {
    if (!isCurrentPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleForwardsClick = () => {
    if (!isCurrentPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: isCurrentPageFirst })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isCurrentPageFirst}
            onClick={handleBackwardsClick}
          >
            «
          </a>
        </li>
        {pages.map((page, i) => {
          const pageNumber = i + 1;

          return (
            <li
              key={page}
              className={classNames('page-item', {
                active: currentPage === pageNumber,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={classNames('page-item', { disabled: isCurrentPageLast })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isCurrentPageLast}
            onClick={handleForwardsClick}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {paginatedItems[currentPage - 1].map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
