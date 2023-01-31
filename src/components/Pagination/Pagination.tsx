import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);
  const maxPageNumber = Math.ceil(items.length / perPage);
  const firstItem = perPage * (currentPage - 1) + 1;
  const lastItem = firstItem + perPage - 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === maxPageNumber;

  const pageNumbers = getNumbers(1, maxPageNumber);
  const filteredItems = items.filter(item => {
    const num = +item.slice(4);

    return (num <= lastItem && num >= firstItem);
  });

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPrevDisabled}
            onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageNumbers.map(num => (
          <li className={cn(
            'page-item',
            { active: currentPage === num },
          )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        ))}
        <li className={cn(
          'page-item',
          { disabled: maxPageNumber === currentPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isNextDisabled}
            onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {filteredItems.map(
          item => <li data-cy="item" key={item.slice(4)}>{item}</li>,
        )}
      </ul>
    </>
  );
};
