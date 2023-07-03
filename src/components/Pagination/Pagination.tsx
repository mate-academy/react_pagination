import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type Button = 'prev' | 'next';

export const Pagination: FC<Props> = (props) => {
  const {
    total,
    currentPage = 1,
    perPage,
    onPageChange,
  } = props;

  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount });

  const setPageLinkClassNames = (pageNumber: number) => {
    return classNames('page-item', {
      active: currentPage === pageNumber,
    });
  };

  const setPageButtonsClassNames = (type: Button) => {
    const isPrevButtonDisabled = type === 'prev' && currentPage === 1;
    const isNextButtonDisabled = type === 'next' && currentPage === pageCount;

    return classNames('page-item', {
      disabled: isPrevButtonDisabled || isNextButtonDisabled,
    });
  };

  const handleSelectNewPage = (type: Button) => {
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    switch (type) {
      case 'prev':
        if (prevPage > 0) {
          onPageChange(prevPage);
        }

        break;

      case 'next':
        if (nextPage < pageCount + 1) {
          onPageChange(nextPage);
        }

        break;

      default:
        break;
    }
  };

  return (
    <ul className="pagination">
      <li className={setPageButtonsClassNames('prev')}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handleSelectNewPage('prev')}
        >
          «
        </a>
      </li>

      {pages.map((_, pageNumber) => {
        const currPageNumber = pageNumber + 1;

        return (
          <li
            key={currPageNumber}
            className={setPageLinkClassNames(currPageNumber)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currPageNumber}`}
              onClick={() => onPageChange(currPageNumber)}
            >
              {currPageNumber}
            </a>
          </li>
        );
      })}

      <li className={setPageButtonsClassNames('next')}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => handleSelectNewPage('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
