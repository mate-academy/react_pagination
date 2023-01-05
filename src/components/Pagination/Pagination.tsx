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
  const pagesCount = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const islastPage = currentPage === Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isFirstPage}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {
        pages.map(page => (
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
          href={`#${currentPage}`}
          aria-disabled={islastPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
