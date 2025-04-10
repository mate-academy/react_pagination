import classNames from 'classnames';
import { useMemo } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (v: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonsNav = useMemo(
    () => Array.from({ length: Math.ceil(total / perPage) }, (_, i) => i + 1),
    [perPage],
  );
  const end = currentPage * perPage;
  const start = end - perPage;

  const itemsToShow = Array.from({ length: total }, (_, i) => i + 1).slice(
    start,
    end,
  );

  const handleClickLiItem = (e: number) => {
    onPageChange(e);
  };

  const handlePrev = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === buttonsNav.length) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
          onClick={handlePrev}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {buttonsNav.map(e => (
          <li
            key={e}
            className={classNames('page-item', {
              active: currentPage === e,
            })}
            onClick={() => handleClickLiItem(e)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${e}`}>
              {e}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: buttonsNav.length === currentPage,
          })}
          onClick={handleNext}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={buttonsNav.length === currentPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToShow.map(e => (
          <li key={e} data-cy="item">
            Item {e}
          </li>
        ))}
      </ul>
    </>
  );
};
