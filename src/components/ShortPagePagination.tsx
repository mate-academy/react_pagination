/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';

import './ShortPagePagination.css';

type Props = {
  total: number,
  page: number,
  onPageChange: (selectedPage: number) => void,
};

export const ShortPagePagination: React.FC<Props> = ({
  total, page, onPageChange,
}) => {
  return (
    <nav className="shortPagePagination">
      <ul className="shortPagePagination__list">
        <li
          className="shortPagePagination__item"
        >
          <a
            className={classNames(
              'shortPagePagination__link', {
                'shortPagePagination__link--passive': (
                  page === 1
                ),
              },
            )}
            href="#"
            onClick={() => onPageChange(page - 1)}
          >
            <span>&lt;</span>
          </a>
        </li>
        <li
          className="shortPagePagination__item"
          hidden={page < 3}
        >
          <a
            className="shortPagePagination__link"
            href="#"
            onClick={() => onPageChange(1)}
          >
            1
          </a>
        </li>
        <span
          hidden={page < 3}
          className="shortPagePagination__span"
        >
          . . .
        </span>
        <li
          className="shortPagePagination__item"
          hidden={page === 1}
        >
          <a
            className="shortPagePagination__link"
            href="#"
            onClick={() => onPageChange(page - 1)}
          >
            {page - 1}
          </a>
        </li>
        <li
          className="shortPagePagination__item"
        >
          <a
            className={'shortPagePagination__link'
              + 'shortPagePagination__link--current'}
            href="#"
          >
            {`[ ${page} ]`}
          </a>
        </li>
        <li
          className="shortPagePagination__item"
          hidden={page === total}
        >
          <a
            className="shortPagePagination__link"
            href="#"
            onClick={() => onPageChange(page + 1)}
          >
            {page + 1}
          </a>
        </li>
        {/* <span hidden=>...</span> */}
        <span
          hidden={page + 1 >= total}
          className="shortPagePagination__span"
        >
          . . .
        </span>
        <li
          className="shortPagePagination__item"
          hidden={page + 1 >= total}
        >
          <a
            className="shortPagePagination__link"
            href="#"
            onClick={() => onPageChange(total)}
          >
            {total}
          </a>
        </li>
        <li
          className="shortPagePagination__item"
        >
          <a
            className={classNames(
              'shortPagePagination__link', {
                'shortPagePagination__link--passive': (
                  page === total
                ),
              },
            )}
            href="#"
            onClick={() => onPageChange(page + 1)}
          >
            <span>&gt;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
