import './Pagination.css';

type Props = {
  total: string;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages: number[] = [];

  for (let i = 1; i <= Math.ceil(+total / +perPage); i += 1) {
    totalPages.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={+currentPage === 1}
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {[...totalPages].map(el => (
          <li
            className={`page-item ${el === currentPage && 'active'}`}
            key={el}
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
        ))}

        <li className={`page-item ${currentPage === totalPages.length && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages.length}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
