import classNames from 'classnames';
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

const getNumbers = (count: number) => {
  return Array(count)
    .fill(0)
    .map((_, index) => index + 1);
};

type PaginationProps = {
  current: number,
  count: number,
  onChangeCurrentPage: (number:number) => void
};

export const Pagination: FC<PaginationProps> = ({
  current,
  count,
  onChangeCurrentPage,
}) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    setNumbers(
      getNumbers(count),
    );
  }, [count]);

  const incrementCurrentPage = useCallback(() => {
    if (current + 1 > numbers.length) {
      return;
    }

    onChangeCurrentPage(current + 1);
  }, [current]);

  const decrementCurrentPage = useCallback(() => {
    if (current - 1 < 1) {
      return;
    }

    onChangeCurrentPage(current - 1);
  }, [current]);

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item', {
            disabled: current === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={current === 1}
          onClick={decrementCurrentPage}
        >
          «
        </a>
      </li>

      {numbers.map(number => (
        <li
          className={classNames(
            'page-item', {
              active: number === current,
            },
          )}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onChangeCurrentPage(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item', {
            disabled: current === numbers.length,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={current === numbers.length}
          onClick={incrementCurrentPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
