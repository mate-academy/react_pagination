import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  perPage,
  totalItems,
  onPageChange,
  withInfo,
  onMoveToNextPage,
  onMoveToPrevPage,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const isActive = page => (
    currentPage === page ? 'btn btn-primary' : 'btn btn-outline-primary'
  );

  const generatedPages = [...Array(totalPages).keys()].map(i => i + 1);
  const lastPage = generatedPages.length;

  const isDisableNextButton = currentPage === generatedPages.length;
  const isDisablePreviousButton = currentPage === 1;

  return (
    <nav aria-label="Page navigation example">
      {withInfo && <p>{withInfo}</p>}
      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onMoveToPrevPage()}
            disabled={isDisablePreviousButton}
          >
            Previous
          </button>
        </li>

        <li className="page-item">
          <button
            type="button"
            className={isActive(1)}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        </li>

        {currentPage > 3 && (
          <li className="page-item">
            <button
              type="button"
              className="btn btn-outline-primary"
              disabled
            >
              ...
            </button>
          </li>
        )}

        {generatedPages.map((page) => {
          if (page === currentPage
            || page === currentPage + 1
            || page === currentPage - 1) {
            if (page === 1
              || page === lastPage) {
              return null;
            }

            return (
              <li key={page} className="page-item">
                <button
                  type="button"
                  className={isActive(page)}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          }

          return null;
        })
        }

        {currentPage < lastPage - 2 && (
          <li className="page-item">
            <button
              type="button"
              className="btn btn-outline-primary"
              disabled
            >
              ...
            </button>
          </li>
        )}

        {totalItems > perPage && (
          <li className="page-item">
            <button
              type="button"
              className={isActive(lastPage)}
              onClick={() => onPageChange(lastPage)}
            >
              {lastPage}
            </button>
          </li>
        )}

        <li className="page-item">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onMoveToNextPage()}
            disabled={isDisableNextButton}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onMoveToNextPage: PropTypes.func.isRequired,
  onMoveToPrevPage: PropTypes.func.isRequired,
  withInfo: PropTypes.string,
};

Pagination.defaultProps = {
  withInfo: '',
};

export default React.memo(Pagination);
