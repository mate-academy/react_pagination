import classNames from 'classnames';
import { getNumbers, numberOfPages, getCurrentItems } from '../../utils';

type Props = {
  total: number,
  perPage: string,
  currentPage: number,
  onPageChange: CallableFunction,
  prevButton: () => void,
  nextButton: CallableFunction,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  prevButton,
  nextButton,
}) => {
  const pagesCollection = getNumbers(1, numberOfPages(total, perPage));

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
            onClick={prevButton}
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
            disabled: currentPage === numberOfPages(total, perPage),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages(total, perPage)}
            onClick={() => nextButton()}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {getCurrentItems(total, currentPage, perPage)
          .map((number: number) => (
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
