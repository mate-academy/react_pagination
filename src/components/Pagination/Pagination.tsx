import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const islastPage = currentPage === Math.ceil(total / perPage);

  const PrevNextPage = (direction: string) => {
    if (!islastPage && direction === 'next') {
      onPageChange(currentPage + 1);
    }

    if (!isFirstPage && direction === 'prev') {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => PrevNextPage('prev')}
        >
          «
        </a>
      </li>
      {
        pagesCount.map(page => (
          <li
            key={page}
            className={
              classNames('page-item', { active: currentPage === page })
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
        ))
      }
      <li className={classNames('page-item', { disabled: islastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={islastPage}
          onClick={() => PrevNextPage('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
