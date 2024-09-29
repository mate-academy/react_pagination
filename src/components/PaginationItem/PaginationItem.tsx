interface Props {
  page: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const PaginationItem: React.FC<Props> = ({
  page,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <li className={`page-item ${currentPage === page ? 'active' : ''}`}>
      <a
        data-cy="pageLink"
        className="page-link"
        onClick={() => setCurrentPage(page)}
        href={`#page-${page}`}
      >
        {page}
      </a>
    </li>
  );
};
