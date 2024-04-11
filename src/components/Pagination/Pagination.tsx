import cn from 'classnames';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const totalPage = (itemsPerPage: number): number[] => {
  if (itemsPerPage <= 0) {
    throw new Error('itemsPerPage must be a positive number');
  }

  const pages = Math.ceil(42 / itemsPerPage);
  const result = Array.from({ length: pages }, (_, i) => i + 1);

  return result;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const quantityPages = totalPage(perPage);

  const buttonDisabled = (button: string): boolean => {
    if (button === 'prev' && currentPage === 1) {
      return true;
    }

    if (
      button === 'next' &&
      currentPage === quantityPages[quantityPages.length - 1]
    ) {
      return true;
    }

    return false;
  };

  const handleClickButton = (button: string) => {
    if (button === 'prev' && currentPage !== 1) {
      return onPageChange(currentPage - 1);
    }

    if (
      button === 'next' &&
      currentPage !== quantityPages[quantityPages.length - 1]
    ) {
      return onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: buttonDisabled('prev') })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={buttonDisabled('prev')}
            onClick={() => handleClickButton('prev')}
          >
            «
          </a>
        </li>
        {quantityPages.map((page: number) => (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: buttonDisabled('next'),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={buttonDisabled('next')}
            onClick={() => handleClickButton('next')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {total.map((item: string) => (
          <li key={item.slice(-2)} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
