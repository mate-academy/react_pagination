interface Props {
  total: number;
  currentPage: number;
  perPage: number
  onPageChange: (page:number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  onPageChange
}) => {

  const handlePageClick = (page:number, event: React.MouseEvent) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  const totalPags = Math.ceil(total / perPage);

  const goPrev = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < totalPags) {
      onPageChange(currentPage + 1);
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
                onClick={event => handlePageClick(page, event)}
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
