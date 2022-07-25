import classNames from 'classnames';
import { items } from '../../utils';

export interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number, placeEvent: string)=> void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const startItem = perPage * (currentPage - 1);
  const endItem = perPage * (currentPage);
  const itemsToShow = items.slice(startItem, endItem);
  const pagesList = (new Array(Math
    .ceil(total / (endItem - startItem))))
    .fill(1).map((a, i) => i + a);

  const handleClickSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(event.target.value), 'select');
    onPageChange(1, 'numberPage');
  };

  const handleArrowPrev = () => {
    let togglePage = 0;

    if (currentPage === 1) {
      togglePage = currentPage;
    } else {
      togglePage = currentPage - 1;
    }

    onPageChange(togglePage, 'numberPage');
  };

  const handleArrowNext = () => {
    let togglePage = 0;

    if (currentPage === (pagesList.length)) {
      togglePage = currentPage;
    } else {
      togglePage = currentPage + 1;
      onPageChange(togglePage, 'numberPage');
    }
  };

  return (
    <div className="container">
    <h1>Items with Pagination </h1>

    <p className="lead" data-cy="info">
      Page
      {' '}
      {currentPage}
      {' '}
      (items
      {' '}
      {startItem + 1}
      {' '}
      -
      {' '}
      {endItem}
      {' '}
      of
      {' '}
      {total}
      )
    </p>

    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={(event) => handleClickSelect(event)}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>

    {/* Move this markup to Pagination */}
    <ul className="pagination">
      <li className={
        classNames('page-item', {
          disabled: currentPage === pagesList[0],
        })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="false"
          onClick={handleArrowPrev}
        >
          «
        </a>
      </li>
      {pagesList.map(page => (
        <li
          key={page}
          className={
            classNames('page-item', {
              active: page === currentPage,
            })
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#{page}"
            onClick={() => onPageChange(page, 'numberPage')}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: currentPage === pagesList[pagesList.length - 1],
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={handleArrowNext}
        >
          »
        </a>
      </li>
    </ul>
    <ul>
      {itemsToShow.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  </div>
  )
};
