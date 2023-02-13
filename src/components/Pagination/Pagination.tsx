import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (
    currentPage: number,
    startItem: number,
    lastItem: number,
  ) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const startItem = perPage * currentPage - perPage + 1;
  const endItem = perPage * currentPage > total ? total : perPage * currentPage;
  const items = getNumbers(startItem, endItem);
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const getSartItemPage = (nextPage: number) => {
    const nextStartItem = perPage * nextPage - perPage + 1;

    return nextStartItem;
  };

  const getLastItemPage = (nextPage: number) => {
    const nextEndItem = perPage * nextPage > total ? total : perPage * nextPage;

    return nextEndItem;
  };

  const changePage = (page: number) => {
    onPageChange(
      page,
      getSartItemPage(page),
      getLastItemPage(page),
    );
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          // eslint-disable-next-line
          'disabled': !(currentPage > 1),
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => changePage(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(item => (
          <li
            className={cn('page-item', {
            // eslint-disable-next-line
            'active': currentPage === item,
            })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => changePage(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li className={cn('page-item', {
          // eslint-disable-next-line
          'disabled': currentPage >= pageCount,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => changePage(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
