import cn from 'classnames';

import { getNumbers } from './../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Pagination: React.FC<PaginationProps> = props => {
  const { total, perPage, currentPage, onPageChange } = props;
  const pageItemsCount = Math.ceil(total / perPage);
  const fromWhatItem = (currentPage - 1) * perPage + 1;
  let toWhatItem = fromWhatItem + perPage - 1;

  if (toWhatItem > total) {
    toWhatItem = total;
  }

  const items = getNumbers(fromWhatItem, toWhatItem).map((n: number) => (
    <li data-cy="item" key={'item' + n}>
      Item {n}
    </li>
  ));
  const pageItems = getNumbers(1, pageItemsCount).map((n: number) => (
    <li
      className={cn('page-item', { active: currentPage === n })}
      key={'key' + n}
    >
      <a data-cy="pageLink" className="page-link" onClick={onPageChange}>
        {n}
      </a>
    </li>
  ));

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', currentPage > 1 || 'disabled')}>
          <a
            data-cy="prevLink"
            className="page-link"
            aria-disabled={currentPage === 1 && 'true'}
            key={'«'}
            onClick={onPageChange}
          >
            «
          </a>
        </li>

        {pageItems}

        <li
          className={cn(
            'page-item',
            currentPage < pageItemsCount || 'disabled',
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            aria-disabled={currentPage === pageItemsCount && 'true'}
            key={'»'}
            onClick={onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>{items}</ul>
    </>
  );
};

export default Pagination;
