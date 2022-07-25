import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: React.FormEvent<HTMLAnchorElement>) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const [pages, setPages] = useState(9);

  useEffect(() => {
    setPages(Math.ceil(total / perPage));
  });

  const arrOfPages = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <>
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
            { disabled: currentPage >= pages },
          )
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= pages}
            onClick={(event) => onPageChange(event)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
