import classNames from 'classnames';
import { PAGES_START_INDEX, PAGES_STEP } from '../../constants';

interface Props {
  numbersOfPages: number[];
  selectedPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  numbersOfPages,
  selectedPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: selectedPage === PAGES_START_INDEX,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={selectedPage === PAGES_START_INDEX}
          onClick={() => {
            if (selectedPage > 1) {
              onPageChange(selectedPage - PAGES_STEP);
            }
          }}
        >
          «
        </a>
      </li>

      {numbersOfPages.map(page => (
        <li
          className={classNames('page-item', {
            active: selectedPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (selectedPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: selectedPage === numbersOfPages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={selectedPage === numbersOfPages.length}
          onClick={() => {
            if (selectedPage < numbersOfPages.length) {
              onPageChange(selectedPage + PAGES_STEP);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
