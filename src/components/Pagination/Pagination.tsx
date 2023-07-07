import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void,
  arrOfPages: number[],
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  arrOfPages,
}) => {
  const rightArrowHandler = () => {
    if (currentPage < arrOfPages[arrOfPages.length - 1]) {
      onPageChange(currentPage + 1);
    }
  };

  const leftArrowHandler = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item', { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 && 'true'}
          onClick={leftArrowHandler}
        >
          «
        </a>
      </li>
      {arrOfPages.map(num => (
        <li
          className={classNames(
            'page-item', { active: num === currentPage },
          )}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => {
              onPageChange(num);
            }}
          >
            {num}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item', { disabled: currentPage === arrOfPages.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === arrOfPages.length && 'true'}
          onClick={rightArrowHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
