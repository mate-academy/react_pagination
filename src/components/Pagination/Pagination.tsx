import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  itemsPerPage: number,
  totalItems: number,
  paginate: (arg:number) => void,
  nextPage: () => void,
  prevPage: () => void,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  totalItems,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const [activeItem, setActiveItem] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= (Math.ceil(totalItems / itemsPerPage)); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              prevPage();
              setActiveItem(activeItem - 1);
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(num => (
          <li
            className={classNames(
              'page-item',
              { active: num === activeItem },
            )}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => {
                paginate(num);
                setActiveItem(num);
              }}
            >
              {num}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === Math.ceil(totalItems / itemsPerPage) },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={Math.ceil(totalItems / itemsPerPage) === currentPage}
            onClick={() => {
              nextPage();
              setActiveItem(activeItem + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
