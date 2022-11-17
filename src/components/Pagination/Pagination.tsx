import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/utils';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  pagesQuantity: number,
  itemsOnCurrentPage: number[],
};

export const Pagination: React.FC<Props> = ({
  pagesQuantity,
  itemsOnCurrentPage,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const arrayOfPages = getNumbers(1, pagesQuantity);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            {
              disabled: +page === 1,
            },
          )}
        >
          <Link
            data-cy="prevLink"
            className="page-link"
            to={{
              search: getSearchWith(searchParams, { page: `${+page - 1}` }),
            }}
            aria-disabled={+page === 1 ? 'true' : 'false'}
          >
            «
          </Link>
        </li>

        {arrayOfPages.map(pageNumber => (
          <li
            className={classNames(
              'page-item',
              { active: +page === pageNumber },
            )}
            key={pageNumber}
          >
            <Link
              data-cy="pageLink"
              className="page-link"
              to={{
                search: getSearchWith(searchParams, { page: `${pageNumber}` }),
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: pagesQuantity === +page },
          )}
        >
          <Link
            data-cy="nextLink"
            className="page-link"
            to={{
              search: getSearchWith(searchParams, { page: `${+page + 1}` }),
            }}
            aria-disabled={pagesQuantity === +page ? 'true' : 'false'}
          >
            »
          </Link>
        </li>
      </ul>
      <ul>
        {itemsOnCurrentPage.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
