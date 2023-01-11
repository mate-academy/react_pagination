type Props = {
  itemsLoad: string[],
  itemsPerPage: number,
  total: number,
  paginate: (number:number) => void,
  currentPage: number,
  nextPage: () => void,
  prevPage: () => void
};

export const Pagination: React.FC<Props>
  = ({
    itemsLoad, itemsPerPage, total, paginate, currentPage, nextPage, prevPage,
  }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return (
      <>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled="true"
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
                href="!#"
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled="false"
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
