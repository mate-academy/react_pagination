import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = [];

  for (let page = 1; page <= numberOfPages; page += 1) {
    pages.push(
      <li className={classNames('page-item', { active: page === currentPage })}>
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${page}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      </li>,
    );
  }

  const items = getNumbers(1, 42)
    .map(n => `Item ${n}`);

  const startItem = (currentPage - 1) * perPage;
  const endItem = startItem + perPage;

  const preparedItems = items.slice(startItem, endItem);

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item', { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages}
        <li className={classNames(
          'page-item', { disabled: currentPage === numberOfPages },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {preparedItems.map((preparedItem: string) => (
          <li data-cy="item">{preparedItem}</li>
        ))}
      </ul>
    </>
  );
};
