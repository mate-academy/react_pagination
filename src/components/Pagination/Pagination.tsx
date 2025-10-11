import { getNumbers } from '../../utils';
import cn from 'classnames';
type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};
/* eslint-disable @typescript-eslint/no-unused-vars */

export const Pagination = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pages = getNumbers(1, perPage).map(page => `${page}`);
  const active = false;

  return (
    <>
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li key={page} className={cn('page-item', { active: active })}>
            <a data-cy="pageLink" className="page-link " href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
