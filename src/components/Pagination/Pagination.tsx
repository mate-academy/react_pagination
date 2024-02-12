import classNames from 'classnames';

type Props = {
  pages: number[],
  currentPage: number,
  onPageChange: (page: number) => void,
  onPrevPage: () => void,
  onNextPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={onPrevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item',
            { active: currentPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item',
          { disabled: currentPage === pages.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={onNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
