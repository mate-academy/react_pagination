import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: React.FormEvent<HTMLAnchorElement>) => void;
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange, onPerPageChange,
}) => {
  const arrOfPages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={(event) => onPerPageChange(event)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <ul className="pagination">
        <li className={
          classNames(
            'page-item',
            { disabled: currentPage <= 1 },
          )
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage <= 1}
            onClick={(event) => onPageChange(event)}
          >
            «
          </a>
        </li>
        {
          arrOfPages.map((page) => (
            <li className={
              classNames(
                'page-item',
                { active: page === currentPage },
              )
            }
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={(event) => onPageChange(event)}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li className={
          classNames(
            'page-item',
            { disabled: currentPage >= total },
          )
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= total}
            onClick={(event) => onPageChange(event)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
