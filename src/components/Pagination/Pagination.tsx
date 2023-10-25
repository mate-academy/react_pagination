import classNames from 'classnames';

type Props = {
  total: number[],
  perPage: number,
  currentPage?: number,
  onPageChange: (arg0: number) => void,
  items: string[],
  onNext: () => void,
  onPrev: () => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  // perPage,
  currentPage = 1,
  onPageChange,
  items,
  onNext,
  onPrev,
}) => {
  const isFirstPage = currentPage === total[0];
  const isLastPage = currentPage === total[total.length - 1];

  const handlePaginationClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (!isFirstPage) {
                onPrev();
              }
            }}
          >
            «
          </a>
        </li>

        {total.map(page => (
          <li
            className={classNames('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePaginationClick(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={classNames('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (!isLastPage) {
                onNext();
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
