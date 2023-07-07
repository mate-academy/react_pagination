import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const countPage = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage <= 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {getNumbers(1, countPage).map(numberPage => (
        <li
          key={numberPage}
          className={cn(
            'page-item',
            { active: numberPage === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${numberPage}`}
            onClick={() => setCurrentPage(numberPage)}
          >
            {numberPage}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item',
        { disabled: currentPage === countPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPage ? 'true' : 'false'}
          onClick={() => currentPage !== countPage
            && setCurrentPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
