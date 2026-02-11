import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPage = Math.ceil(total / perPage);

  const pagesList = Array.from(
    { length: numberOfPage },
    (_, index) => index + 1,
  );

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
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pagesList.map(i => (
        <li
          key={i}
          className={classNames('page-item', { active: i === currentPage })}
          onClick={() => onPageChange(i)}
        >
          <a data-cy="pageLink" className={classNames('page-link')} href="#{i}">
            {i}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === numberOfPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={currentPage === numberOfPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
