import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  itemPerPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  itemPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageList = getNumbers(1, Math.ceil(total / itemPerPage));

  const handlerPage = (page: number) => {
    if (currentPage !== page && page >= 1 && page <= pageList.length) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            handlerPage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pageList.map(page => (
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
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', {
        disabled: currentPage === pageList.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageList.length}
          onClick={() => {
            handlerPage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
