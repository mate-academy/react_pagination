import classnames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props>
  = ({
    total,
    perPage,
    currentPage,
    onPageChange,
  }) => {
    const pagesCount = Math.ceil(total / perPage);
    const pages = getNumbers(1, pagesCount);

    function handlePrevClick() {
      if (currentPage !== 1) {
        onPageChange(currentPage - 1);
      }
    }

    function handleForwardClick() {
      if (currentPage !== pagesCount) {
        onPageChange(currentPage + 1);
      }
    }

    return (
      <ul className="pagination">
        <li className={
          classnames('page-item', { disabled: currentPage === 1 })
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>

        {pages.map((item, index) => {
          return (
            <li
              className={
                classnames('page-item', { active: index + 1 === currentPage })
              }
              key={item}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${index + 1}`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          );
        })}

        <li className={
          classnames('page-item', { disabled: currentPage === pagesCount })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount ? 'true' : 'false'}
            onClick={handleForwardClick}
          >
            »
          </a>
        </li>
      </ul>
    );
  };
