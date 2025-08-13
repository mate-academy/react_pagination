type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const Pagination = ({
  total,
  currentPage,
  perPage,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      return onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      return onPageChange(currentPage + 1);
    }
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
            onClick={e => {
              e.preventDefault();
              handlePrev();
            }}
          >
            «
          </a>
        </li>
        {pages.map(el => {
          return (
            <li
              key={el}
              className={`page-item ${el === currentPage ? 'active' : ''}`}
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
          );
        })}
        <li
          className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={pageCount === currentPage}
            onClick={e => {
              e.preventDefault();
              handleNext();
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
