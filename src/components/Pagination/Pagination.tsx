import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total = 42,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const pagging = Array(Math.ceil(total / perPage)).fill(0);

  return (
    <ul className="pagination">
      <li
        className={classNames({
          'page-item': true,
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage !== 1 ? currentPage - 1 : currentPage);
          }}
        >
          «
        </a>
      </li>

      {pagging.map((item, index) => (
        <li
          key={item + index}
          onClick={() => {
            onPageChange(index + 1);
          }}
          className={classNames({
            'page-item': true,
            active: index + 1 === currentPage,
          })}
        >
          <a data-cy="pageLink" className="page-link" href="#1">
            {index + 1}
          </a>
        </li>
      ))}

      <li
        className={classNames({
          'page-item': true,
          disabled: currentPage === pagging.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagging.length}
          onClick={() => {
            onPageChange(
              currentPage === pagging.length ? currentPage : currentPage + 1,
            );
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
