import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';
// eslint-disable-next-line import/no-cycle
import { items } from '../../App';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
  firstItemIndex: number,
  lastItemIndex: number
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  firstItemIndex,
  lastItemIndex,
}) => {
  const pageQuantity = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageQuantity);

  return (
    <>
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
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={classNames(
              'page-item',
              {
                active: page === currentPage,
              },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={(ev) => {
                if (ev.currentTarget.textContent
                  && +ev.currentTarget.textContent !== currentPage) {
                  onPageChange(+ev.currentTarget.textContent);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === pageQuantity,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(firstItemIndex, lastItemIndex).map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
