import cn from 'classnames';
import { getNumbers } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Callback = (prevState: number) => number;

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number | Callback) => void,
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const maxItemOnCurPage = currentPage + perPage - 1 > total
    ? total : currentPage + perPage - 1;

  const pageNumberHandler = (n: number) => {
    if (currentPage === 1 + perPage * (n - 1)) {
      return;
    }

    onPageChange(1 + perPage * (n - 1));
  };

  const rightArrowHandler = () => {
    if (maxItemOnCurPage === total) {
      return;
    }

    onPageChange(prevState => prevState + perPage);
  };

  const leftArrowHandler = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(prevState => prevState - perPage);
  };

  return (
    <>
      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={leftArrowHandler}
          >
            «
          </a>
        </li>
        {getNumbers(1, Math.ceil(total / perPage))
          .map(n => (
            <li
              className={cn('page-item', {
                active: n === Math.ceil(maxItemOnCurPage / perPage),
              })}
              key={n}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${n}`}
                onClick={() => pageNumberHandler(n)}
              >
                {n}
              </a>
            </li>
          ))}
        <li className={cn('page-item', {
          disabled: maxItemOnCurPage === total,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={maxItemOnCurPage === total ? 'true' : 'false'}
            onClick={rightArrowHandler}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(currentPage, maxItemOnCurPage)
          .map(n => (
            <li
              data-cy="item"
              key={n}
            >
              {`Item ${n}`}
            </li>
          ))}
      </ul>
    </>
  );
};
