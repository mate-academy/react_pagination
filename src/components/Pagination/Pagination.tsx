import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (num: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttons = getNumbers(1, Math.ceil(total / perPage));

  const handleClickPagination = (page: number) => {
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== buttons.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {buttons.map(button => (
        <li
          key={button}
          className={classNames(
            'page-item',
            { active: currentPage === button },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${button}`}
            onClick={() => handleClickPagination(button)}
          >
            {button}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: currentPage === buttons.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === buttons.length}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
