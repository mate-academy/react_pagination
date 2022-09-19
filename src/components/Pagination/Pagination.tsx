import classNames from 'classnames';

type Props = {
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  pageNumbers: number[];
  currentPage: number;
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    onPageChange,
    pageNumbers,
    currentPage,
  } = props;

  const handleDecrementPageNumber = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleIncrementPageNumber = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleDecrementPageNumber}
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === number },
          )}
          key={number}
        >
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
      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === pageNumbers.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={handleIncrementPageNumber}
        >
          »
        </a>
      </li>
    </ul>
  );
};
