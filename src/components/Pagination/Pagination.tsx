import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: Callback;
};

type Callback = (page: number) => void;

export const Pagination = (props: Props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const totalPages = Math.ceil(total / perPage);
  const listOfNavigation = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {listOfNavigation.map(link => (
        <li className={classNames('page-item', {
          active: link === currentPage,
        })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${link}`}
            onClick={() => {
              if (link !== currentPage) {
                onPageChange(link);
              }
            }}
          >
            {link}
          </a>
        </li>
      ))}

      <li
        className={
          classNames('page-item', { disabled: currentPage === totalPages })
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage !== totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
