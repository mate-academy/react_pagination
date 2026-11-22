interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages?: number;
}

export const Pagination = ({
  currentPage = 1,
  perPage,
  total,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const items = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={'page-item' + (currentPage === 1 ? ' disabled' : '')}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
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
            if (item !== currentPage){
            onPageChange(item);
            }
          }}
          key={item}
        >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))}

      <li
        className={
          'page-item' + (currentPage === totalPages ? ' disabled' : '')
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
