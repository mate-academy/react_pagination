/* eslint-disable no-plusplus */
import React from 'react';
import cn from 'classnames';

type Props = {
  items: string[],
  itemPerPage: number;
  pagiPage: number;
  setPagiPage: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination: React.FC<Props> = (
  {
    items, itemPerPage, pagiPage, setPagiPage,
  },
) => {
  const pageLength = items.length / itemPerPage;
  const pagAr = [];

  for (let i = 0; i < pageLength; i++) {
    const tempAr = [];

    // eslint-disable-next-line max-len
    for (let y = i * itemPerPage; y < (i + 1) * itemPerPage && y < items.length; y++) {
      tempAr.push(items[y]);
    }

    pagAr[i] = tempAr;
  }

  const pages = pagAr.map((_pag, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: pagiPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={pagiPage === 1}
            onClick={() => (pagiPage !== 1) && setPagiPage(pagiPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map((pag) => (
          <li
            className={cn('page-item', { active: pagiPage === pag })}
            key={pag}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => pagiPage !== pag && setPagiPage(pag)}
            >
              {pag}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: pagiPage === pages.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={pagiPage === pages.length}
            onClick={() => (pagiPage !== pages.length)
              && setPagiPage(pagiPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pagAr[pagiPage - 1].map(pag => (
          <li data-cy="item" key={pag}>{pag}</li>
        ))}
      </ul>
    </>
  );
};
