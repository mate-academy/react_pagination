import classNames from 'classnames';
import React from 'react';
import { getItems } from '../../additionalFunctions/getItems';
import { getPages } from '../../additionalFunctions/getPages';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (newPage: number) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const pages: number[] = getPages(Math.ceil(total / perPage));
  const items: string[] = getItems(currentPage, perPage, total);
  const isBackButtonDisabled = currentPage === 1;
  const isForwardButtonDisabled = currentPage === pages[pages.length - 1];

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames({
            'page-item': true,
            disabled: isBackButtonDisabled,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isBackButtonDisabled}
            onClick={() => {
              if (!isBackButtonDisabled) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {
          pages.map(page => (
            <li
              key={page}
              className={classNames({
                'page-item': true,
                active: page === currentPage,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href="#2"
                onClick={(event) => {
                  const newPage = event.currentTarget.textContent;

                  if (newPage && currentPage !== +newPage) {
                    onPageChange(+newPage);
                  }
                }}
              >
                {page}
              </a>
            </li>
          ))
        }

        <li
          className={classNames({
            'page-item': true,
            disabled: isForwardButtonDisabled,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isForwardButtonDisabled}
            onClick={() => {
              if (!isForwardButtonDisabled) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {
          items.map(item => <li key={item} data-cy="item">{item}</li>)
        }
      </ul>
    </>
  );
};
