type Props = {
  currentPage: number,
  pagesArr: number[],
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>) => void,
  pages: number,
};

export const Pagination = (props: Props) => {
  const {
    pagesArr, onPageChange,
    currentPage, pages,
  } = props;

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              type="button"
              name="previous"
              className="page-link"
              disabled={currentPage === 1}
              onClick={onPageChange}
            >
              {'<<'}
            </button>
          </li>

          {pagesArr.map((page: number) => (
            <li
              key={page}
              className="page-item"
            >
              <button
                type="button"
                name={page.toString()}
                className="page-link"
                onClick={onPageChange}
              >
                {page}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              type="button"
              name="next"
              className="page-link"
              disabled={currentPage === pages}
              onClick={onPageChange}
            >
              {'>>'}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
