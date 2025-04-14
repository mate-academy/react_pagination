import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            className="page-link"
            data-cy="prevLink"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {getNumbers(1, numberOfPages).map(page => (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === numberOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === numberOfPages}
            onClick={() =>
              currentPage !== numberOfPages && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
