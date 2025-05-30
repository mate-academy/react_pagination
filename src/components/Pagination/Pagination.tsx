import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
  items: string[];
};

export const Pagination = ({
  total,
  perPage = 5,
  currentPage,
  onPageChange,
  items,
}: Props) => {
  const amountOfPages = Math.ceil(total / perPage);
  const arrayWithPages = Array.from({ length: amountOfPages }, (_, i) => i + 1);

  return (
    <>
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
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {arrayWithPages.map(num => (
          <li
            className={classNames('page-item', {
              active: currentPage === num,
            })}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={'#' + num}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === amountOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
