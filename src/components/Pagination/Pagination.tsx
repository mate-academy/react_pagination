import './Pagination.css';

import { getNumbers } from '../../utils';

type Props = {
  total: string;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
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
  const totalPages: number[] = [];
  const currentItems: string[] = getCurrentItems(+currentPage, +perPage);

  for (let i = 1; i <= Math.ceil(+total / +perPage); i += 1) {
    totalPages.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={+currentPage === 1}
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {[...totalPages].map(el => (
          <li
            className={`page-item ${el === currentPage && 'active'}`}
            key={el}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${el}`}
              onClick={() => onPageChange(el)}
            >
              {el}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages.length && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages.length}
            onClick={() => onPageChange(currentPage + 1)}
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
