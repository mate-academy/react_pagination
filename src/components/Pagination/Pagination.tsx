import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: string,
  currentPage: number,
  currentItems: number[],
  onPageChange: CallableFunction,
  prevButton: CallableFunction,
  nextButton: CallableFunction,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  currentItems,
  onPageChange,
  prevButton,
  nextButton,
}) => {
  const numberOfPages = Math.ceil(total / +perPage);
  const pagesCollection = getNumbers(1, numberOfPages);

  return (
    <>
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
            aria-disabled={currentPage === 1}
            onClick={() => prevButton()}
          >
            «
          </a>
        </li>
        {pagesCollection.map((num: number) => (
          <li
            className={classNames('page-item', {
              active: num === currentPage,
            })}
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
          className={classNames('page-item', {
            disabled: currentPage === numberOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages}
            onClick={() => nextButton()}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {currentItems.map((number: number) => (
          <li
            data-cy="item"
            key={number}
          >
            {`Item ${number}`}
          </li>
        ))}
      </ul>
    </>
  );
};
