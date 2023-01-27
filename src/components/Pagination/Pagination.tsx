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
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const handlerOnClickPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlerOnClickNext = () => {
    if (currentPage !== pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlerOnClickPrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlerOnClickPrev}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        return (
          <li
            className={classNames(
              'page-item',
              {
                active: page === currentPage,
              },
            )}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                handlerOnClickPage(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === pages.length,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={handlerOnClickNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
