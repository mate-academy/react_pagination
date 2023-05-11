import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page:number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const getNumberOfPages = Math.ceil(total / perPage);
  const arrayOfPages = getNumbers(1, getNumberOfPages);

  const activePage = (
    firstPage: number,
    currentP: number,
    lastPage: number,
  ) => {
    if (currentP <= firstPage) {
      return firstPage;
    }

    if (currentP >= lastPage) {
      return lastPage;
    }

    return currentP;
  };

  const onChangePageBtn = (page: number, mod: 'next' | 'prev') => {
    switch (mod) {
      case 'next':
        onPageChange(page + 1);
        break;
      case 'prev':
        onPageChange(page - 1);
        break;
      default:
        break;
    }
  };

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onChangePageBtn(currentPage, 'prev')}
        >
          «
        </a>
      </li>
      {arrayOfPages.map(page => (
        <li
          key={page}
          className={
            classNames(
              'page-item',
              {
                active: activePage(1, currentPage, getNumberOfPages) === page,
              },
            )
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={
        classNames(
          'page-item',
          { disabled: currentPage === getNumberOfPages },
        )
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === getNumberOfPages}
          onClick={() => onChangePageBtn(currentPage, 'next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
