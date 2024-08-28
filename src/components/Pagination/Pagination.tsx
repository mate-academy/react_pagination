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
  if (perPage <= 0) {
    throw new Error('The number of items to display must be greater than 0');
  }

  const countLinks = Math.ceil(total / perPage);
  const links = getNumbers(1, countLinks);

  return (
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
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {links.map(link => (
        <li
          className={cn('page-item', {
            active: link === currentPage,
          })}
          key={link}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${link}`}
            onClick={() => onPageChange(link)}
          >
            {link}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === countLinks,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countLinks ? 'true' : 'false'}
          onClick={() =>
            currentPage < countLinks && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
