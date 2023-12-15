import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number;
  onPageChange: (pageNum: number) => void;
};

export const Pagination = ({
  total, perPage, currentPage, onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (pageNum: number) => {
    onPageChange(pageNum);
  };

  const generatePages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      const page = (
        <li
          key={i}
          className={i === currentPage ? 'page-item active' : 'page-item'}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );

      pages.push(page);
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => handlePageChange(currentPage + -1)}
        >
          «
        </a>
      </li>
      {generatePages().map(page => page)}
      <li className={classNames('page-item', {
        disabled: currentPage === totalPages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
