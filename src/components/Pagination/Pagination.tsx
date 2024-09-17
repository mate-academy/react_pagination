import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}: Props) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>

      {getNumbers(1, lastPage).map(number => (
        <li
          key={number}
          className={classNames('page-item', {
            active: currentPage === number,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === lastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            if (currentPage < lastPage) {
              onPageChange(currentPage + 1);
            }
          }}
          aria-disabled={currentPage === lastPage ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
