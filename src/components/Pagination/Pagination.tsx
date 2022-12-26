import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (selectPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = new Array(Math.ceil(total / perPage)).fill(0)
    .map((item, index) => item + index + 1);

  const slide = (direction: string) => {
    switch (direction) {
      case 'prevLink':
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }

        break;

      case 'nextLink':
        if (currentPage < pages.length) {
          onPageChange(currentPage + 1);
        }

        break;

      default:
        break;
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item', (currentPage === 1) ? 'disabled' : '',
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
          onClick={() => {
            slide('prevLink');
          }}
        >
          «
        </a>
      </li>

      {pages.map((item) => (
        <li
          key={item}
          className={classNames(
            'page-item', (item === currentPage) ? 'active' : '',
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={() => {
              onPageChange(item);
            }}
            href={`#${item}`}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item', (currentPage === pages.length) ? 'disabled' : '',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === pages.length}
          onClick={() => {
            slide('nextLink');
          }}
        >
          »
        </a>
      </li>
    </ul>

  );
};
