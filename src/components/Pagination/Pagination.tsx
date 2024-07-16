import { PaginationPage } from './PaginationPage';
import { Page } from '../../types/page';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (callback: (prev: Page) => Page) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const maxPages = Math.ceil(total / perPage);

  const handleClickPastPage = () => {
    onPageChange(prev => {
      if (prev.currentPage !== 1) {
        return { ...prev, currentPage: prev.currentPage - 1 };
      }

      return prev;
    });
  };

  const handleClickNextPage = () => {
    onPageChange(prev => {
      if (prev.currentPage !== maxPages) {
        return { ...prev, currentPage: prev.currentPage + 1 };
      }

      return prev;
    });
  };

  const handleClickPage = (page: number) => {
    onPageChange(prev => ({ ...prev, currentPage: page }));
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let page = 1; page <= maxPages; page++) {
      pages.push(
        <PaginationPage
          key={page}
          page={page}
          currentPage={currentPage}
          onClick={handleClickPage}
        />,
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleClickPastPage}
        >
          «
        </a>
      </li>

      {renderPageNumbers()}

      <li
        className={classNames('page-item', {
          disabled: currentPage === maxPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPages}
          onClick={handleClickNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
