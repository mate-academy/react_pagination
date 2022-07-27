import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  let allPages = Math.floor(total / perPage + 1);

  if (total % perPage === 0) {
    allPages = total / perPage;
  }

  const numbers = getNumbers(1, allPages);
  let items = getNumbers(1, perPage);

  if (currentPage !== 1 && currentPage !== allPages) {
    const start = (perPage * (currentPage - 1) + 1);
    const end = currentPage * perPage;

    items = getNumbers(start, end);
  }

  if (currentPage === allPages && currentPage !== 1) {
    const start = (allPages - 1) * perPage + 1;
    const end = total;

    items = getNumbers(start, end);
  }

  const nextPage = (n: number) => {
    if (n === allPages) {
      return;
    }

    onPageChange(n + 1);
  };

  const previousPage = (n: number) => {
    if (n === 1) {
      return;
    }

    onPageChange(n - 1);
  };

  return (
    <div>
      <ul className="pagination">
        <li className={classNames(
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
            aria-disabled={currentPage === 1}
            onClick={() => previousPage(currentPage)}
          >
            «
          </a>
        </li>
        {numbers.map(number => (
          <li
            className={classNames(
              'page-item',
              {
                active: currentPage === number,
              },
            )}
            key={number}
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
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === allPages,
          },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === allPages}
            onClick={() => nextPage(currentPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </div>
  );
};
