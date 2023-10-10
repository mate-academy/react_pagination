import cn from 'classnames';

type PaginationType = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const listItems: JSX.Element[] = [];
  const totalPages = Math.ceil(total / perPage);

  const getClassName = (isActive: boolean, className: string) => (
    cn({ 'page-item': true, [className]: isActive })
  );

  const handleOnClickPrev = () => {
    if (currentPage !== 1) {
      onPageChange((prev) => prev - 1);
    }
  };

  const handleOnClickNext = () => {
    if (currentPage !== totalPages) {
      onPageChange((prev) => prev + 1);
    }
  };

  for (let i = 0; i < totalPages; i += 1) {
    const index = i + 1;

    const item = (
      <li className={getClassName(currentPage === index, 'active')} key={index}>
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${index}`}
          onClick={() => onPageChange(index)}
        >
          {index}
        </a>
      </li>
    );

    listItems.push(item);
  }

  return (
    <ul className="pagination">
      <li className={getClassName(currentPage === 1, 'disabled')}>
        <a
          data-cy="prevLink"
          className={cn({
            'page-link': true,
            disabled: currentPage === 1,
          })}
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleOnClickPrev}
        >
          «
        </a>
      </li>

      {listItems}

      <li className={getClassName(currentPage === totalPages, 'disabled')}>
        <a
          data-cy="nextLink"
          className={cn({
            'page-link': true,
            disabled: currentPage === totalPages,
          })}
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleOnClickNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export { Pagination };
