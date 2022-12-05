import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const amountOfPages = Math.ceil(total / perPage);
  const currentList = getNumbers(1, amountOfPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === amountOfPages;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: isFirstPage,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>

      {currentList.map(num => (
        <li
          className={classNames(
            'page-item',
            {
              active: currentPage === num,
            },
          )}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: isLastPage,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            if (!isLastPage) {
              onPageChange(currentPage + 1);
            }
          }}
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
