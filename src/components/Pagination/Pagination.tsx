import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const items = getNumbers(1, Math.ceil(total / perPage))
    .map(n => n);

  const checkPrevLink = currentPage === 1;
  const checkNextLink = items.length === currentPage;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: checkPrevLink },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={checkPrevLink}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {items.map((item) => (
        <li
          className={
            classNames('page-item', { active: item === currentPage })
          }

        >
          <a
            onClick={() => {
              onPageChange(item);
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: checkNextLink },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={checkNextLink}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
