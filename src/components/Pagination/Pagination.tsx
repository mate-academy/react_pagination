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
  const lastPage = Math.ceil(total / perPage);
  const isFirsPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const getPageCountList = () => {
    const content = [];

    for (let i = 1; i <= lastPage; i += 1) {
      content.push(
        <li
          key={i}
          className={
            classNames('page-item', {
              active: currentPage === i,
            })
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return content;
  };

  const lastPageList = isLastPage
    ? total
    : perPage * currentPage;

  const getItemListPerPage = () => {
    const content = [];

    for (let i = perPage * currentPage - perPage + 1;
      i <= lastPageList;
      i += 1) {
      content.push(<li data-cy="item" key={i}>{`Item ${i}`}</li>);
    }

    return content;
  };

  const HandlePrevClick = () => {
    let prevPage = 0;

    if (currentPage !== 1) {
      prevPage = currentPage - 1;
      onPageChange(prevPage);
    }
  };

  const HandleNextClick = () => {
    let nextPage = 0;

    if (currentPage !== lastPage) {
      nextPage = currentPage + 1;
      onPageChange(nextPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: isFirsPage })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirsPage}
            onClick={HandlePrevClick}
          >
            «
          </a>
        </li>
        {getPageCountList()}
        <li className={classNames('page-item',
          { disabled: isLastPage })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={HandleNextClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getItemListPerPage()}
      </ul>

    </>

  );
};
