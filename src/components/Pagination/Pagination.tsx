import { getNumbers } from '../../utils';

type Props = {
  total: string[],
  perPage: number,
  currentPage: number,
  onPageChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageItems = total.slice(
    (currentPage - 1) * perPage, currentPage * perPage,
  );

  const pagesTotal = getNumbers(1, Math.ceil(total.length / perPage));

  const disablePrevPage = currentPage === 1;
  const disableNextPage = currentPage === pagesTotal[pagesTotal.length - 1];

  return (
    <>
      <ul className="pagination">
        <li
          className={
            disablePrevPage
              ? 'page-item disabled'
              : 'page-item'
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={disablePrevPage}
            onClick={(event) => {
              onPageChange(event);
            }}
          >
            «
          </a>
        </li>

        {pagesTotal.map(page => (
          <li
            className={
              currentPage === page
                ? 'page-item active'
                : 'page-item'
            }
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={(event) => {
                onPageChange(event);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={
            disableNextPage
              ? 'page-item disabled'
              : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={disableNextPage}
            onClick={(event) => {
              onPageChange(event);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pageItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
