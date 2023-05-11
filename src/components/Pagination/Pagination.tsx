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

  const onChangePageBtn = (page: number, mod: 'next' | 'prev') => {
    switch (mod) {
      case 'next':
        if (page !== getNumberOfPages) {
          onPageChange(page + 1);
        }

        return;
      case 'prev':
        if (page !== 1) {
          onPageChange(page - 1);
        }

        break;
      default:
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
                active: currentPage === page,
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
