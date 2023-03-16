import { FC } from 'react';
import classNames from 'classnames';
import { getCurrentAmountPages } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const hendlerPrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const hendlerActivePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onPageChange(+e.currentTarget.id);
  };

  const hendlerNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={hendlerPrevPage}
        >
          «
        </a>
      </li>
      {getCurrentAmountPages(Math.ceil(total / perPage)).map(page => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            id={`${page}`}
            className="page-link"
            href={`#${page}`}
            onClick={hendlerActivePage}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item', { disabled: Math.ceil(total / perPage) === currentPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="true"
          onClick={hendlerNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
