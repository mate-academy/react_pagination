type Props = {
  itemsLoad: string[],
  itemsPerPage: number,
  total: number,
  onPageChange: (number:number) => void,
  currentPage: number,
  setCurrentPage: (cb: (currentPage: number) => number) => void
};

export const Pagination: React.FC<Props>
  = ({
    itemsLoad,
    itemsPerPage,
    total,
    onPageChange,
    currentPage,
    setCurrentPage,
  }) => {
    const pageNumbers = [];
    const numberOfPages = Math.ceil(total / itemsPerPage);

    for (let i = 1; i <= Math.ceil(total / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const nextPage = () => {
      if (currentPage !== numberOfPages) {
        setCurrentPage((prev: number) => prev + 1);
      }
    };

    const prevPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(prev => prev - 1);
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
              aria-disabled={currentPage === 1 ? 'true' : 'false'}
              onClick={prevPage}
            >
              «
            </a>
          </li>
          {pageNumbers.map(number => (
            <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </a>
            </li>
          ))}

          <li className={`page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
              onClick={nextPage}
            >
              »
            </a>
          </li>
        </ul>
        <ul>
          {itemsLoad.map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </>
    );
  };
