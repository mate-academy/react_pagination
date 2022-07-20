import classNames from 'classnames';
import { FC, useState } from 'react';

const perPageOptions = [3, 5, 10, 20];

interface Props {
  total: number,
  page: number,
  setPage: (page: number) => void,
  withInfo: true | undefined,
}

export const Pagination: FC<Props> = ({
  total,
  page,
  setPage,
  withInfo,
}) => {
  const [onPage, setOnPage] = useState(5);
  const mathPages = (totalPage: number) => Math.ceil(total / totalPage);
  const lastElemOnPage = page * onPage;
  const [pages, setPages] = useState(mathPages(onPage));

  const onPageChange = (value: string) => {
    const totalPages = mathPages(+value);

    setOnPage(() => +value);
    setPages(() => totalPages);
    if (page > totalPages) {
      setPage(totalPages);
    }
  };

  return (
    <nav className="
      content
      mx-auto
      "
    >
      {withInfo && (
        <h2>
          {`${lastElemOnPage - onPage + 1}-${lastElemOnPage > total ? total : lastElemOnPage} of ${total}`}
        </h2>
      )}
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: page === 1 })}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => setPage(page - 1)}
          >
            &laquo;
          </button>
        </li>
        {page > 1 && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(1)}
            >
              1
            </button>
          </li>
        )}
        {page > 3 && (
          <li className="page-item">
            <button type="button" className="page-link disabled">
              ...
            </button>
          </li>
        )}
        {page > 2 && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              {page - 1}
            </button>
          </li>
        )}
        <li className="page-item active">
          <button type="button" className="page-link">
            {page}
          </button>
        </li>
        {page < pages - 1 && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        )}
        {page < pages - 2 && (
          <li className="page-item">
            <button type="button" className="page-link disabled">
              ...
            </button>
          </li>
        )}
        {page < pages && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(pages)}
            >
              {pages}
            </button>
          </li>
        )}
        <li
          className={classNames('page-item', { disabled: page === pages })}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => setPage(page + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
      <select
        className="select mx-auto"
        value={onPage}
        onChange={({ target }) => onPageChange(target.value)}
      >
        {perPageOptions.map(option => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </nav>
  );
};
