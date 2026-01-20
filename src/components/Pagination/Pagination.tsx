// import { getNumbers } from '../../utils';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / +perPage);
  const arrNumber = [];

  for (let i = 0; i < totalPages; i++) {
    arrNumber.push(i + 1);
  }

  return (
    <ul className="pagination">
      <li className={currentPage !== 1 ? 'page-item' : 'page-item disabled'}>
        <Link
          data-cy="prevLink"
          className="page-link"
          to={`?page=${currentPage - 1}&perPage=${perPage}`}
          aria-disabled={currentPage === 1}
          onClick={e => {
            if (currentPage === 1) {
              e.preventDefault();
            } else {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </Link>
      </li>

      {arrNumber.map(page => (
        <li
          className={page === currentPage ? 'page-item active' : 'page-item'}
          key={page}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={`?page=${page}&perPage=${perPage}`}
            onClick={e => {
              if (currentPage === page) {
                e.preventDefault();
              } else {
                onPageChange(page);
              }
            }}
          >
            {page}
          </Link>
          {/*// <a*/}
          {/*//   data-cy="pageLink"*/}
          {/*//   className="page-link"*/}
          {/*//   href={`#${page}`}*/}
          {/*//   onClick={() => {*/}
          {/*//     if (currentPage !== page) {*/}
          {/*//       onPageChange(page);*/}
          {/*//     }*/}
          {/*//   }}*/}
          {/*// >*/}
          {/*//   {page}*/}
          {/*// </a>*/}
        </li>
      ))}

      <li
        className={
          currentPage !== totalPages ? 'page-item' : 'page-item disabled'
        }
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={`?page=${currentPage + 1}&perPage=${perPage}`}
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            if (currentPage === totalPages) {
              e.preventDefault();
            } else {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
