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
  currentPage = 1,
  onPageChange,
}) => {
  const tabsCount = Math.ceil(total / perPage);
  const pageArrayItems = (perPage * currentPage) > total
    ? perPage - ((perPage * tabsCount) - total)
    : perPage;
  const currentItem = currentPage * perPage - perPage;

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: currentPage === 1 })}
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

        {new Array(tabsCount).fill(0).map((_, index) => {
          const currentIndex = index + 1;

          return (
            <li className={classNames(
              'page-item',
              { active: currentPage === currentIndex },
            )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${currentIndex}`}
                onClick={() => onPageChange(currentIndex)}
              >
                {currentIndex}
              </a>
            </li>
          );
        })}

        <li className={classNames('page-item',
          { disabled: currentPage === tabsCount })}
        >

          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === tabsCount}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {new Array(pageArrayItems).fill(0).map((_, i) => (
          <li data-cy="item">
            {`Item ${(i + 1) + currentItem}`}
          </li>
        ))}
      </ul>
    </>
  );
};
