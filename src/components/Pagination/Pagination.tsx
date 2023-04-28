import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';
// eslint-disable-next-line import/no-cycle

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
  items: string[]
  firstItemIndex: number,
  lastItemIndex: number
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
  firstItemIndex,
  lastItemIndex,
}) => {
  const pageQuantity = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageQuantity);
  const onArrowChange = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const arrow = ev.currentTarget.href.slice(-5);

    if (arrow === '#prev') {
      onPageChange(currentPage - 1);

      return;
    }

    onPageChange(currentPage + 1);
  };

  const onNumberChange = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { textContent } = ev.currentTarget;

    if (textContent && +textContent !== currentPage) {
      onPageChange(+textContent);
    }
  };

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
            onClick={onArrowChange}
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
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={onNumberChange}
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
            onClick={onArrowChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(firstItemIndex, lastItemIndex).map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
