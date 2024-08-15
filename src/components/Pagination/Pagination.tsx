import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  currentPage: number;
  items: string[];
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  items,
  perPage,
  onPageChange,
}) => {
  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < Math.ceil(items.length / perPage)) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <button
            data-cy="prevLink"
            className="page-link"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </button>
        </li>
        {getNumbers(1, Math.ceil(items.length / perPage)).map(num => (
          <li
            key={num}
            className={cn('page-item', {
              active: currentPage === num,
            })}
          >
            <button
              data-cy="pageLink"
              className="page-link"
              onClick={() => onPageChange(num)}
              aria-current={currentPage === num ? 'page' : undefined}
            >
              {num}
            </button>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === Math.ceil(items.length / perPage),
          })}
        >
          <button
            data-cy="nextLink"
            className="page-link"
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(items.length / perPage)}
            aria-disabled={currentPage >= Math.ceil(items.length / perPage)}
          >
            »
          </button>
        </li>
      </ul>
      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
