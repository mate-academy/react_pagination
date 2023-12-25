import { useEffect, useState } from 'react';

interface Props {
  items: string[],
  itemsPerPage: number,
}

export const Pagination: React.FC<Props> = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const startItem = (currentPage - 1) * itemsPerPage;
  const lastItem = startItem + itemsPerPage;
  const visibleItems = [...items].slice(startItem, lastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Event handler for changing to a specific page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item: string) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
