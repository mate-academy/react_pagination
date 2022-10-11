import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = Math.ceil(total / perPage);
  const getItems = getNumbers(1, items);

  const itemPrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const itemLast = () => {
    if (currentPage < items) {
      onPageChange(currentPage + 1);
    }
  };

  return (

    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${getItems[currentPage - 1]}`}
          aria-disabled={currentPage === 1}
          onClick={itemPrev}
        >
          «
        </a>
      </li>
      {getItems.map(getItem => (
        <li
          key={getItem}
          className={classNames(
            'page-item',
            { active: getItem === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${getItems[currentPage - 1]}`}
            onClick={() => onPageChange(getItem)}
          >
            {getItem}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item', { disabled: currentPage === items },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${getItems[currentPage - 1]}`}
          aria-disabled={currentPage === items}
          onClick={itemLast}

        >
          »
        </a>
      </li>
    </ul>
  );
};
