import './Pagination.css';

import { getNumbers } from '../../utils';

type Props = {
  total: string;
  perPage: string;
  currentPage: string;
  onPageChange: (page: string) => void;
};

const items = getNumbers(1, 42)
  .map((n: number) => `Item ${n}`);

function getCurrentItems(currentPage:number, perPage: number): string[] {
  if (currentPage === 1) {
    return [...items].splice(0, perPage);
  }

  return [...items].splice((currentPage - 1) * perPage, perPage);
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages: number[] = [];
  const page: number[] = [];
  const currentItems: string[] = getCurrentItems(+currentPage, +perPage);

  function getNumbersOfItem():number {
    if (+total % +perPage === 0) {
      return +perPage;
    }

    if (+currentPage === pages.length) {
      return +total % +perPage;
    }

    return +perPage;
  }

  for (let i = 1; i <= Math.ceil(+total / +perPage); i += 1) {
    pages.push(i);
  }

  for (let n = 1; n <= getNumbersOfItem(); n += 1) {
    page.push(n);
  }

  return (
    <>
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {[...pages].map(el => (
          <li
            className={`page-item ${el === +currentPage && 'active'}`}
            key={el}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${el}`}
              onClick={() => onPageChange(String(el))}
            >
              {el}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {[...currentItems].map(el => (
          <li data-cy="item" key={el}>{el}</li>
        ))}
      </ul>
    </>
  );
};
