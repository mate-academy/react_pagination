import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOnPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOnPage);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === numberOnPage - 1;

  const prevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', isFirstPage ? 'disabled' : '')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={(e) => {
            e.preventDefault();
            prevPage();
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item',
            currentPage === page - 1 ? 'active' : '')}
          key={`page-item-${page - 1}`}
          onClickCapture={() => onPageChange(page - 1)}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', isLastPage ? 'disabled' : '')}
        onClickCapture={nextPage}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
