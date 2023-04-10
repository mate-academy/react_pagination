import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageItems = [];

  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber += 1) {
    pageItems.push(
      <li
        key={pageNumber}
        className={classNames('page-item', {
          active: currentPage === pageNumber,
        })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${pageNumber}`}
          onClick={event => {
            event.preventDefault();

            onPageChange(pageNumber);
          }}
        >
          {pageNumber}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();

            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pageItems}
      <li
        className={classNames('page-item', {
          disabled: currentPage === numberOfPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();

            if (currentPage !== numberOfPages) {
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
