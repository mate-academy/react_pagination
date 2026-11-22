interface Props {
  itemsLength: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination = ({
  currentPage,
  perPage,
  itemsLength,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(itemsLength / perPage);
  const items = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={(currentPage === 1? "true" : "false")}
          onClick={() => {
 if(currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
        >
          «
        </a>
      </li>

      {items.map((item: number) => (
        <li
          className={'page-item' + (currentPage === item ? ' active' : '')}
          value={item}
          onClick={() => {
            onPageChange(item);
          }}
          key={item}
          >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))
      }

      <li className={"page-item" + (currentPage === totalPages ? " disabled" : "")}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={(currentPage === totalPages? "true" : "false")}
          onClick={() => {
            if(currentPage !== totalPages) {
              onPageChange(currentPage + 1);
            }
}
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
