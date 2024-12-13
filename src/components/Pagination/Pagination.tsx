import { getPagesCount } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = (props: Props) => {
  const { total, currentPage, perPage, onPageChange } = props;
  const countPages = getPagesCount(total, perPage);

  const isAvailableNextPage = currentPage === countPages.at(-1);
  const isAvailablePrevPage = currentPage === 1;

  const handleClickPrevPage = () => {
    if (!isAvailablePrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleClickNextPage = () => {
    if (!isAvailableNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: isAvailablePrevPage })}
        onClick={handleClickPrevPage}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isAvailablePrevPage}
        >
          «
        </a>
      </li>
      {countPages.map(page => {
        return (
          <li
            className={classNames('page-item', {
              active: currentPage === page,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={classNames('page-item', {
          disabled: isAvailableNextPage,
        })}
        onClick={handleClickNextPage}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isAvailableNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
