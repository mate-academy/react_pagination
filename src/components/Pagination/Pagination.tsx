import cn from 'classnames';

type Props = {
  total: number,
  perPage : number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumbers = Math.ceil(total / perPage);

  const mappedPagesNumbers = new Array(pagesNumbers)
    .fill(0).map((_, index) => ({ _, id: index + 1 }));

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {mappedPagesNumbers.map((item) => (
          <li
            className={cn(
              'page-item',
              { active: currentPage === item.id },
            )}
            key={item.id}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item.id}`}
              onClick={() => onPageChange(item.id)}
            >
              {item.id}
            </a>
          </li>
        ))}

        <li
          className={
            cn(
              'page-item',
              { disabled: currentPage === pagesNumbers },
            )
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesNumbers ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < pagesNumbers) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
