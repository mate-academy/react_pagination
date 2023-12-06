import classNames from 'classnames';

export type PaginationProps = {
  total: string []
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination = ({
  total, perPage, currentPage, onPageChange,
}: PaginationProps) => {
  const numberOfPages = Math.ceil(total.length / Number(perPage));

  const chanePage = (i: number) => {
    if (i !== currentPage && i !== 0 && i !== numberOfPages + 1) {
      onPageChange(i);
    }
  };

  const pagesList = () => {
    const list = [];

    for (let i = 1; i <= numberOfPages; i += 1) {
      list.push(
        <li
          className={classNames('page-item',
            { active: currentPage === i })}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => chanePage(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return list;
  };

  const ariaPrevDisabled = () => {
    if (currentPage === 1) {
      return true;
    }

    return false;
  };

  const ariaNextDisabled = () => {
    if (currentPage === numberOfPages) {
      return true;
    }

    return false;
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={ariaPrevDisabled()}
          onClick={() => chanePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pagesList()}
      <li className={classNames('page-item',
        { disabled: currentPage === numberOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={ariaNextDisabled()}
          onClick={() => chanePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>

  );
};
