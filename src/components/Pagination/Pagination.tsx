import React from 'react';
import cn from 'classnames';

type Props = {
  PrepearedItems: string[];
  Pages: number;
  CurrentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  PrepearedItems,
  Pages,
  CurrentPage,
  setCurrentPage,
}: Props) => {
  const pages = Array.from({ length: Pages }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: CurrentPage === pages[0] })}
          onClick={() =>
            CurrentPage > pages[0] && setCurrentPage(CurrentPage - 1)
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={CurrentPage === pages[0]}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${cn({ active: CurrentPage === page })}`}
            onClick={() => setCurrentPage(page)}
          >
            <a data-cy="pageLink" className="page-link" href="#1">
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: CurrentPage === pages[pages.length - 1],
          })}
          onClick={() =>
            CurrentPage < pages[pages.length - 1] &&
            setCurrentPage(CurrentPage + 1)
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={CurrentPage === pages[pages.length - 1]}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {PrepearedItems.map((item: string) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
