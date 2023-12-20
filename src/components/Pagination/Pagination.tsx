import React from 'react';
import cn from 'classnames';

type Props = {
  total: number[],
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
  const paginationNumbs = Math.ceil(total[total.length - 1] / perPage);
  const sliseFrom = (currentPage - 1) * perPage;
  const sliseTo = perPage * currentPage;

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {total.slice(0, paginationNumbs).map(item => {
          return (
            <li className={cn(
              'page-item',
              { active: item === currentPage },
            )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => onPageChange(item)}
              >
                {`${item}`}
              </a>
            </li>
          );
        })}

        <li className={cn(
          'page-item',
          { disabled: currentPage === paginationNumbs },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === paginationNumbs}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {total.slice(sliseFrom, sliseTo).map(item => {
          return (
            <li data-cy="item">
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};
