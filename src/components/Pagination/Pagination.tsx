import { getNumbers } from '../../utils';
import cn from 'classnames';
type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
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
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages).map(page => `${page}`);
  const handleLinkBackward = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    } else {
      return;
    }
  };

  const handleLinkForwar = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    } else {
      return;
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={() => handleLinkBackward()}
        >
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
          <li
            key={page}
            className={cn('page-item', { active: currentPage === +page })}
            onClick={() => onPageChange(+page)}
          >
            <a data-cy="pageLink" className="page-link " href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: currentPage === totalPages })}
          onClick={() => handleLinkForwar()}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items
          .slice(perPage * currentPage - perPage, perPage * currentPage)
          .map(item => (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
