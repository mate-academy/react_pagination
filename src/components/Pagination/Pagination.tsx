export const Pagination = ({ numPages, currentPage, onPageChange }) => {
  const numPagesArray = [];

  for (let varAux = 1; varAux < numPages + 1; varAux++) {
    numPagesArray.push(varAux);
  }

  return (
    <>
      <ul key={numPages} className="pagination">
        <li
          key={0}
          className={`page-item${currentPage === 1 ? ' disabled' : ''}`}
        >
          <a
            key={0.1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className="page-link"
            href="#prev"
            data-cy="prevLink"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {numPagesArray.map(numPage => {
          return (
            <>
              <li
                key={numPage}
                onClick={() => {
                  onPageChange(numPage);
                }}
                className={`page-item${numPage === currentPage ? ' active' : ''}`}
              >
                <a
                  key={numPage / 10}
                  data-cy="page-link"
                  className="page-link"
                  href={`#${numPage}`}
                >
                  {numPage}
                </a>
              </li>
            </>
          );
        })}
        <li
          className={`page-item${currentPage === numPagesArray.length ? ' disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === numPagesArray.length ? 'true' : 'false'
            }
            onClick={() => {
              if (currentPage !== numPagesArray.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
