import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange(page: number): void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, Math.ceil(total / perPage)).map(number => (
        <li
          className={classNames(
            'page-item',
            {
              active: number === currentPage,
            },
          )}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => {
              if (number !== currentPage) {
                onPageChange(number);
              }
            }}
          >
            {number}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === Math.ceil(total / perPage),
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => {
            if (currentPage !== Math.ceil(total / perPage)) {
              onPageChange(Math.ceil(total / perPage));
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
