/* eslint-disable */

type Props = {
  pages: number[],
  chosenPage: number,
  onPageChange: (x: number) => void,
  amountOfPages: number,
};

export const Pagination: React.FC<Props> = ({ pages, chosenPage, onPageChange, amountOfPages }) => {
  return (
    <ul className="pagination">
      <li 
        className={chosenPage === 1 ? "page-item disabled" : "page-item"}
      >
        <button
          data-cy="prevLink"
          className="page-link"
          aria-disabled={chosenPage === 1}
          onClick={() => {
            if (chosenPage !== 1) {
              onPageChange(chosenPage - 1);
            }
          }}
        >
          «
        </button>
      </li>

      {pages.map(page => (
        <li
          className={chosenPage === page ? "page-item active" : "page-item"}
          key={page}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li
        className={chosenPage === amountOfPages ? "page-item disabled" : "page-item"}
      >
        <button
          data-cy="nextLink"
          className="page-link"
          aria-disabled={chosenPage === amountOfPages}
          onClick={() => {
            if (chosenPage !== amountOfPages) {
              onPageChange(chosenPage + 1);
            }
          }}
        >
          »
        </button>
      </li>
    </ul>
  );
};
