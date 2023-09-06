import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  items: Array<string>,
};

export const Pagination = ({
  total, perPage, currentPage, onPageChange, items,
}: Props) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const onClickHandle = (page: number) => {
    if (page >= 1 && page <= pages.length) {
      onPageChange(page);
    } else {
      onPageChange(1);
    }
  };

  const showItems = items.filter((_item, index) => index + 1
  >= (((currentPage - 1) * perPage) + 1) && index + 1
    <= Math.min(currentPage * perPage, total));

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onClickHandle(currentPage === 1
              ? currentPage
              : currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: currentPage > 0 && currentPage <= pages.length
                ? page === currentPage
                : page === 1,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onClickHandle(page)}
            >
              {page}

            </a>
          </li>
        ))}

        <li className={cn('page-item', {
          disabled: currentPage === pages.length,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={() => onClickHandle(currentPage === pages.length
              ? pages.length
              : currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {showItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
