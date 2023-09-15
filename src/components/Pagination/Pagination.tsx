import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visibleItems = getNumbers(1, Math.ceil(total / perPage));

  const pagesAmount = Math.ceil(total / perPage);

  const selectPrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const selectNextPage = () => {
    onPageChange((currentPage + 1));
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={selectPrevPage}
          >
            «
          </a>
        </li>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            className={cn('page-item', {
              active: currentPage === item,
            })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => {
                onPageChange(item);
              }}
            >
              {item}
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
            aria-disabled={currentPage === pagesAmount}
            onClick={selectNextPage}
          >
            »
          </a>
        </li>
      </ul>
    </ >
  );
};
