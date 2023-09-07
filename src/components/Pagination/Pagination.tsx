import cn from 'classnames';
import { getNumbers } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Callback = (prevState: number) => number;

interface Props {
  total: number,
  perPage: number,
  currentItem: number,
  onPageChange: (page: number | Callback) => void,
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentItem,
    onPageChange,
  } = props;

  const maxItemOnCurPage = currentItem + perPage - 1 > total
    ? total : currentItem + perPage - 1;

  const pageNumberHandler = (n: number) => {
    if (currentItem === 1 + perPage * (n - 1)) {
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
    if (currentItem === 1) {
      return;
    }

    onPageChange(prevState => prevState - perPage);
  };

  return (
    <>
      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentItem === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentItem === 1}
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
            aria-disabled={maxItemOnCurPage === total}
            onClick={rightArrowHandler}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(currentItem, maxItemOnCurPage)
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
