interface Props {
  totalPags: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalPags,
  currentPage,
  setCurrentPage,
}) => {
  const handleCurrPage = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentPage(index);
  };

  const goPrev = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < totalPags) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={goPrev}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPags }, (_, i) => i + 1).map(page => {
          return (
            <li
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={event => handleCurrPage(page, event)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={
            currentPage === totalPags ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPags ? 'true' : 'false'}
            onClick={goNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
