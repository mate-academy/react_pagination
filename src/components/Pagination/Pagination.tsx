import cn from 'classnames';
import { getNumbers } from '../../utils';
import { Page } from '../Page';

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  setPageIndex: (number: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageIndex,
  setPageIndex,
}) => {
  const noGoLeft = pageIndex === 1;
  const noGoRight = pageIndex === pageCount - 1;

  return (
    <ul className="pagination">
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <li
        className={cn('page-item', { disabled: noGoLeft })}
        onClick={() => pageIndex !== 1 && setPageIndex(pageIndex - 1)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {getNumbers(1, pageCount).map((num: number) => (
        <Page
          key={num}
          num={num}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      ))}
      <li
        className={cn('page-item', { disabled: noGoRight })}
        onClick={() => pageIndex < pageCount - 1 && setPageIndex(pageIndex + 1)}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
