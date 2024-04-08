type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange?.(page);
  };

  const goToPreviousPage = () => {
    const newPage = currentPage - 1;

    if (newPage >= 1) {
      setCurrentPage(newPage);
      handlePageChange(newPage);
    }
  };

  const goToNextPage = () => {
    const newPage = currentPage + 1;

    if (newPage <= totalPages) {
      setCurrentPage(newPage);
      handlePageChange(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={goToPreviousPage}
        >
          «
        </a>
      </li>

      {renderPagination()}

      {/* eslint-disable-next-line prettier/prettier */}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={goToNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );

  // return (
  //   <ul className="pagination">
  //     <li className="page-item disabled">
  //       <a
  //         data-cy="prevLink"
  //         className="page-link"
  //         href="#prev"
  //         aria-disabled="true"
  //       >
  //         «
  //       </a>
  //     </li>
  //     <li className="page-item active">
  //       <a data-cy="pageLink" className="page-link" href="#1">
  //         {currentPage}
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#2">
  //         2
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#3">
  //         3
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#4">
  //         4
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#5">
  //         5
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#6">
  //         6
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#7">
  //         7
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#8">
  //         8
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a data-cy="pageLink" className="page-link" href="#9">
  //         9
  //       </a>
  //     </li>
  //     <li className="page-item">
  //       <a
  //         data-cy="nextLink"
  //         className="page-link"
  //         href="#next"
  //         aria-disabled="false"
  //       >
  //         »
  //       </a>
  //     </li>
  //   </ul>
  // );
};
