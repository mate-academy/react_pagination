import React from 'react';
import './Pagination.css';

interface Props {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (pageFromComponent: number) => void;
  withInfo: string,
  onPerPageChange: (perPageFromComponent: number) => void
}

const Pagination: React.FC<Props> = ({
  total, perPage, page, onPageChange, withInfo, onPerPageChange,
}) => {
  function goToNextPage() {
    onPageChange(page + 1);
  }

  function goToPreviousPage() {
    onPageChange((page - 1));
  }

  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);

    onPageChange(pageNumber);
  }

  const isRenderButton = (item: number) => {
    const indexPage = Math.floor(total / perPage);

    if (perPage === 3) {
      return item > indexPage;
    }

    return item > Math.floor(indexPage + 1);
  };

  const isDisabled = () => {
    if (perPage !== 3) {
      return total / perPage;
    }

    return total / perPage - 1;
  };

  function changePerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    const pageNumber = Number(event.currentTarget.value);

    onPerPageChange(pageNumber);
  }

  const getPaginationGroup = () => {
    return new Array(total).fill(0).map((_, idx) => {
      return idx + 1;
    });
  };

  return (
    <div className="pagination is-center">
      <select
        name="selectAmountPerPage"
        value={perPage}
        onChange={changePerPage}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <p>{withInfo}</p>

      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={page === 1}
        className="pagination-previous"
      >
        prev
      </button>

      <div className="pagination-list">
        {getPaginationGroup().map((item) => {
          if (isRenderButton(item)) {
            return null;
          }

          return (
            <button
              className={`pagination-link${item === page ? ' is-current' : ''}`}
              type="button"
              key={item}
              onClick={changePage}
            >
              <span>{item}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goToNextPage}
        disabled={page > isDisabled()}
        className="pagination-next"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
