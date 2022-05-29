import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onTotal: (total: number) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onTotal,
  onPageChange,
  onPerPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);

  const until = () => {
    const amountOfPages = page * perPage;

    if (amountOfPages >= total) {
      return total;
    }

    return amountOfPages;
  };

  const from = () => page * perPage - (perPage - 1);

  const button2Handler = () => {
    if (page > 5 && numberOfPages > 7) {
      return '...';
    }

    return 2;
  };

  const button3Handler = () => {
    if (page > numberOfPages - 4 && numberOfPages > 7) {
      return numberOfPages - 4;
    }

    if (page > 5 && numberOfPages > 7) {
      return page - 1;
    }

    return 3;
  };

  const button4Handler = () => {
    if (page > numberOfPages - 4 && numberOfPages > 7) {
      return numberOfPages - 3;
    }

    if (page > 5 && numberOfPages > 7) {
      return page;
    }

    return 4;
  };

  const button5Handler = () => {
    if (page > numberOfPages - 4 && numberOfPages > 7) {
      return numberOfPages - 2;
    }

    if (page > 5 && numberOfPages > 7) {
      return page + 1;
    }

    return 5;
  };

  const button6Handler = () => {
    if (page > numberOfPages - 4 && numberOfPages > 7) {
      return numberOfPages - 1;
    }

    if (numberOfPages > 7) {
      return '...';
    }

    return 6;
  };

  return (
    <div>
      <h2 className="info">
        {`${from()} - ${until()} items of ${total}`}
      </h2>
      <label htmlFor="total" className="total">
        <h3>Items total:</h3>
        <input
          type="number"
          name="total"
          id="total"
          className="total__input"
          placeholder="Set total"
          value={total}
          onChange={(e) => {
            onTotal(+e.target.value);
            onPageChange(1);
          }}
        />
      </label>

      <div className="container">
        <button
          type="button"
          className="button button__nav-left"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            { button__active: page === 1 },
          )}
          onClick={(e) => {
            if (e.currentTarget.textContent) {
              onPageChange(+e.currentTarget.textContent);
            }
          }}
        >
          {1}
        </button>

        {numberOfPages > 1 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === 2 },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent
                && e.currentTarget.textContent !== '...') {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {button2Handler()}
          </button>
        )}

        {numberOfPages > 2 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === 3 },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent) {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {button3Handler()}
          </button>
        )}

        {numberOfPages > 3 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === button4Handler() },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent) {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {button4Handler()}
          </button>
        )}

        {numberOfPages > 4 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === button5Handler() },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent) {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {button5Handler()}
          </button>
        )}

        {numberOfPages > 5 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === button6Handler() },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent
                && e.currentTarget.textContent !== '...') {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {button6Handler()}
          </button>
        )}

        {numberOfPages > 6 && (
          <button
            type="button"
            className={classNames(
              'button',
              { button__active: page === numberOfPages },
            )}
            onClick={(e) => {
              if (e.currentTarget.textContent) {
                onPageChange(+e.currentTarget.textContent);
              }
            }}
          >
            {numberOfPages}
          </button>
        )}

        <button
          type="button"
          className="button button__nav-right"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= numberOfPages}
        >
          Next
        </button>
      </div>

      <div className="per-page">
        <h3>Items per page:</h3>

        <select
          name="perPage"
          value={perPage}
          className="per-page__select"
          onChange={(e) => {
            onPerPageChange(+e.target.value);
            onPageChange(1);
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};
