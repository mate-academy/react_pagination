import classNames from 'classnames';

interface Props {
  total: number[];
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const nextPage = () => {
    if (currentPage < total.length) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

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
            aria-disabled="true"
            onClick={prevPage}
          >
            «
          </a>
        </li>
        {total.map((item) => (
          <li
            className={classNames('page-item', {
              active: currentPage === item,
            })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === total.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
