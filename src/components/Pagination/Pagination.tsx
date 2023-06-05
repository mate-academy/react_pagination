import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  currentPage: string,
  itemsToShow: string[],
  pages: string[],
};

export const Pagination: FC<Props> = ({ pages, currentPage, itemsToShow }) => {
  const [searchParams] = useSearchParams();
  const isFirstPage = currentPage === pages[0];
  const isLastPage = currentPage === pages[pages.length - 1];

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: isFirstPage,
          })}
        >
          <Link
            data-cy="nextLink"
            className="page-link"
            to={{
              search: getSearchWith(searchParams, { page: `${+currentPage - 1}` }),
            }}
            aria-disabled={isFirstPage ? 'true' : 'false'}
          >
            «
          </Link>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <Link
              data-cy="pageLink"
              className="page-link"
              to={{
                search: getSearchWith(searchParams, { page }),
              }}
            >
              {page}
            </Link>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: isLastPage,
          })}
        >
          <Link
            data-cy="nextLink"
            className="page-link"
            to={{
              search: getSearchWith(searchParams, { page: `${+currentPage + 1}` }),
            }}
            aria-disabled={isLastPage ? 'true' : 'false'}
          >
            »
          </Link>
        </li>
      </ul>

      <ul>
        {itemsToShow.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
