type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange:(number: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesLength = total / +perPage;

  const createPageList = () => {
    const result = [];

    for (let i = 0; i < pagesLength; i += 1) {
      result.push(
        <li
          key={`#${i + 1}`}
          className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            onClick={() => onPageChange(i + 1)}
            className="page-link"
            href={`#${i + 1}`}
          >
            {i + 1}
          </a>
        </li>,
      );
    }

    return result;
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {createPageList()}
        <li
          className={`page-item ${currentPage >= pagesLength ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= pagesLength}
            onClick={() => currentPage < pagesLength
              && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
