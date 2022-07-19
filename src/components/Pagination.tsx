import classNames from 'classnames';
import React from 'react';

interface Props {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (value: number, atrName: string) => void;
}

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
}) => {
  const handleSumbit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const totalLength = Math.ceil(total / perPage);
  const toPage = page * perPage < total
    ? page * perPage
    : total;

  const fromPage = toPage - perPage + 1 > 0
    ? toPage - perPage + 1
    : 1;
  const withInfo = `${fromPage}-${toPage} of ${total}`;

  return (
    <>
      <h1>{withInfo}</h1>
      <ul
        className="pagination App__list"
      >
        <li>
          <button
            type="button"
            className={classNames('submit page-link', {
              disabled: page === 1,
            })}
            onClick={() => onPageChange((page - 1), 'page')}
            disabled={page <= 1}
          >
            « Prev
          </button>
        </li>

        {[...new Array(totalLength)].map((_, i) => (
          <li
            className={classNames('page-item App__item', {
              active: page === i + 1,
            })}
            key={Math.random()}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => {
                onPageChange(i + 1, 'page');
              }}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <button
          type="button"
          className={classNames('page-link submit', {
            disabled: page === totalLength,
          })}
          onClick={() => onPageChange((page + 1), 'page')}
          disabled={page === totalLength}
        >
          Next »
        </button>
      </ul>

      <form
        action="post"
        className="form-group pagination__form"
        onSubmit={handleSumbit}
      >
        <input
          type="number"
          name="total"
          className="form-control"
          min="1"
          value={total}
          onChange={({ target }) => {
            onPageChange(+target.value, 'total');
          }}
        />
        <p>Select the number of pages</p>

        <select
          name="perPage"
          value={perPage}
          className="form-control"
          onChange={({ target }) => (
            onPageChange(Number(target.value), 'perPage')
          )}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <p>Select a scroll step</p>
      </form>

    </>
  );
};

export default React.memo(Pagination);
