import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
};
const itemList = (total: number, perPage: number, currentPage: number) => {
  // eslint-disable-next-line max-len
  return new Array(total).fill(0).map((_, i) => i + 1).splice(currentPage * perPage - perPage, perPage);
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfTabs = (() => {
    return new Array(Math.ceil(total / perPage)).fill(0).map((_, i) => i + 1);
  })();

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { 'page-item disabled': currentPage === numberOfTabs[0] })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => {
              onPageChange((currentPage - 1));
            }}
            aria-disabled={currentPage === numberOfTabs[0]}
          >
            «
          </a>
        </li>
        {numberOfTabs.map(tab => (
          <li
            className={classNames(
              'page-item',
              {
                'page-item active': tab === currentPage,
              },
            )}
            key={tab}

          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${tab}`}
              onClick={() => {
                if (tab !== currentPage) {
                  onPageChange(tab);
                }
              }}
            >
              {tab}
            </a>
          </li>
        ))}

        <li className={classNames('page-item',
          { 'page-item disabled': currentPage === numberOfTabs.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => {
              onPageChange((currentPage + 1));
            }}
            aria-disabled={currentPage === numberOfTabs.length}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemList(total, perPage, currentPage).map(item => (
          <li data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
