import { useEffect } from 'react';
import { getNumbers, getList } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemChange: (el1: number[]) => void
}

export const Pagination = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
    onItemChange,
  }: Props,
) => {
  const amountPages = total % perPage === 0
    ? Math.floor(total / perPage)
    : Math.floor(total / perPage) + 1;

  function pageHendler(event: React.MouseEvent<HTMLAnchorElement>) {
    const selectPage = +event.currentTarget.innerText;

    onPageChange(selectPage);
  }

  function arrowHendlerLeft(event: React.MouseEvent<HTMLElement>) {
    if (event) {
      onPageChange(currentPage - 1);
    }
  }

  function arrowHendlerRight(event: React.MouseEvent<HTMLElement>) {
    if (event) {
      onPageChange(currentPage + 1);
    }
  }

  const pages = getNumbers(1, amountPages);

  const amountOfli = getList(currentPage, total, perPage);

  const [start, end] = amountOfli;

  const items = getNumbers(start, end).map(n => `Item ${n}`);

  useEffect(() => {
    onItemChange(amountOfli);
  }, [currentPage, perPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 && 'disabled'} `}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 && true}
            onClick={arrowHendlerLeft}
          >
            «
          </a>
        </li>
        { pages.map(el => (
          <li
            className={`page-item ${el === currentPage && 'active'}`}
            key={el}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${el}`}
              onClick={pageHendler}
            >
              {el}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage > pages.length - 1 && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage > pages.length - 1 && true}
            onClick={arrowHendlerRight}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
