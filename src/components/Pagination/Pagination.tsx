import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPageItems = Math.ceil(total / perPage);
  const pagination: number[] = getNumbers(1, totalPageItems);

  const isCurrent = (item: number) => currentPage === item;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  const handleButtonChange = (direction: string) => {
    switch (direction) {
      case 'next':
        if (isLastPage) {
          return;
        }

        onPageChange(currentPage + 1);
        break;
      case 'prev':
        if (isFirstPage) {
          return;
        }

        onPageChange(currentPage - 1);
        break;
      default:
        break;
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => handleButtonChange('prev')}
        >
          «
        </a>
      </li>
      {pagination.map(page => (
        <li
          className={
            classNames(
              'page-item',
              { active: isCurrent(page) },
            )
          }
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => handleButtonChange('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
