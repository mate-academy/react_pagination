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
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
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
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={handlePrevPage}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {getNumbers(1, Math.ceil(items.length / perPage)).map(num => (
          <li
            key={num}
            className={cn('page-item', {
              active: currentPage === num,
            })}
            onClick={() => onPageChange(num)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${num}`}>
              {num}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === Math.ceil(items.length / perPage),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={handleNextPage}
            aria-disabled={
              currentPage === Math.ceil(items.length / perPage)
                ? 'true'
                : 'false'
            }
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(currentPage * perPage - perPage, currentPage * perPage)
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
