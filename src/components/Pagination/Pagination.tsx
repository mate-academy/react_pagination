import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  itemsPerPage: number,
  items: number[],
  currentPage: number,
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  items,
  currentPage,
  onPageChange = () => { },
}) => {
  const pages = getNumbers(1, Math.ceil(total / itemsPerPage));

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item',
              { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={(event) => {
                event.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={cn('page-item',
          { disabled: currentPage === pages.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
