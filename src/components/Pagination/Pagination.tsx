import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxTabQuantity = Math.ceil(total / perPage);
  const tabNumbers = getNumbers(1, maxTabQuantity);
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const onPageClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    if (+id === currentPage) {
      return;
    }

    onPageChange(+id);
  };

  const onPrevClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (currentPage !== maxTabQuantity) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={onPrevClick}
        >
          «
        </a>
      </li>
      {tabNumbers.map(number => (
        <li
          className={classNames(
            'page-item',
            { active: number === activePage },
          )}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            id={`${number}`}
            onClick={onPageClick}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item', { disabled: currentPage === maxTabQuantity },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxTabQuantity ? 'true' : 'false'}
          onClick={onNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
