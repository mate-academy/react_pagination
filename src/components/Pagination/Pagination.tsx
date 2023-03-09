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
  const pagesQuantity = total % perPage === 0
    ? total / perPage
    : Math.ceil(total / perPage);

  const firstPageCheck = currentPage === 1;
  const lastPageCheck = currentPage === pagesQuantity;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pages = getNumbers(1, pagesQuantity);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagesQuantity) {
      return;
    }

    onPageChange(page);
  };

  return (
    <>
      <ul className="pagination">
        <li className={
          classNames('page-item', { disabled: firstPageCheck })
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${prevPage}`}
            onClick={() => handlePageChange(prevPage)}
            aria-disabled={firstPageCheck}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={
              classNames('page-item', { active: currentPage === page })
            }
          >
            <a
              data-cy="pageLink"
              className="page-link"
              onClick={() => handlePageChange(page)}
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={
          classNames('page-item', { disabled: lastPageCheck })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${nextPage}`}
            onClick={() => handlePageChange(nextPage)}
            aria-disabled={lastPageCheck}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
