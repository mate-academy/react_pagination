import { FC } from 'react';

export interface IPagination {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<IPagination> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  let totalPages = Math.ceil(total / perPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => (
    Array.from({ length: totalPages }, (_, index) => (
      <li 
      key={index+1}
        className={`page-item ${currentPage===index+1?"active":''}`} 
        onClick={() => changePage(index + 1)}
        >
        <a data-cy="pageLink" className="page-link" href={`#${index+1}`}>
          {index+1}
        </a>
      </li>
    ))
);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage===1?"disabled":''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={()=>changePage(currentPage-1)}
        >
          «
        </a>
      </li>

      {renderPageButtons()}


      <li className={`page-item ${currentPage===totalPages?"disabled":''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={()=>changePage(currentPage+1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
