import classnames from 'classnames';
import { getNumbers } from '../../utils';

const startPage = 1;

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onChangePage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pageList = getNumbers(startPage, lastPage);

  const isPrevBtnDisabled = currentPage === startPage;
  const isNextBtnDisabled = currentPage === lastPage;

  const increasePage = () => {
    if (currentPage !== startPage) {
      onChangePage(currentPage - 1);
    }
  };

  const decreasePage = () => {
    if (!isNextBtnDisabled) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classnames(
          'page-item',
          { disabled: isPrevBtnDisabled },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevBtnDisabled}
          onClick={increasePage}
        >
          «
        </a>
      </li>
      {pageList.map(page => (
        <li
          className={classnames(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onChangePage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classnames(
          'page-item',
          { disabled: isNextBtnDisabled },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextBtnDisabled}
          onClick={decreasePage}
        >
          »
        </a>
      </li>
    </ul>

  );
};
