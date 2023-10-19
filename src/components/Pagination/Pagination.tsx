import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pagesArray = getNumbers(1, pages);

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: currentPage === pagesArray[0] })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === pagesArray[0] ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pagesArray.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
          role="presentation"
          onClick={() => onPageChange(page)}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: currentPage === pagesArray[pagesArray.length - 1] })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesArray[pagesArray.length - 1]
            ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
