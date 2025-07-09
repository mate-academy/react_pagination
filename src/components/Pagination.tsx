import { items } from '../App';
import { Item } from './Item';
import classNames from 'classnames';

type Props = {
  perPage: number;
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination = ({
  perPage,
  total,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );

  const start = perPage * (currentPage - 1);
  const end = start + perPage;

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
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pages.length) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(start, end).map(number => (
          <Item key={number} number={number} />
        ))}
      </ul>
    </>
  );
};
