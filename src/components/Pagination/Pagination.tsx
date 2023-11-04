import classNames from 'classnames';

type Pagination1 = {
  total: string[],
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Pagination1) => {
  const numberOfPages = Math.ceil(total.length / perPage);
  const numberPagesOnArr = Array.from({ length: numberOfPages })
    .map((_, i) => i + 1);

  const needChangPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === numberPagesOnArr[0],
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === numberPagesOnArr[0] ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== numberPagesOnArr[0]) {
              needChangPage(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {numberPagesOnArr.map((number) => (
        <li
          className={classNames('page-item', {
            active: currentPage === number,
          })}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => needChangPage(number)}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', {
        disabled: currentPage === numberPagesOnArr.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === numberPagesOnArr.length ? 'true' : 'false'
          }
          onClick={() => {
            if (currentPage !== numberPagesOnArr.length) {
              needChangPage(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
