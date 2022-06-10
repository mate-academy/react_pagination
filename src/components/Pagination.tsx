import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  handleChange,
  paginate,
}) => {
  const [items, setItems] = useState(
    Array.from({ length: total }, (_, i) => i + 1),
  );

  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  function getVisiblePages() {
    const dots = '...';
    const totalPages = Array.from({
      length: Math.ceil(total / perPage),
    }, (_, i) => i + 1);

    if (totalPages.length < 5) {
      return totalPages;
    }

    const startIndex: (number | string)[] = totalPages.slice(0, page - 1);
    const endIndex: (number | string)[] = totalPages.slice(page);
    const result: (number | string)[] = [];

    if (startIndex.length > 2) {
      startIndex.splice(1, startIndex.length - 2, dots);
    }

    if (endIndex.length > 2) {
      endIndex.splice(1, endIndex.length - 2, dots);
    }

    return result.concat(startIndex, page, endIndex);
  }

  const visiblePages = getVisiblePages();

  useEffect(() => {
    setItems(Array.from({ length: total }, (_, i) => i + 1));
  }, [total]);

  return (
    <div>
      <label htmlFor="total">Total</label>
      <input
        type="text"
        onChange={handleChange}
        value={total}
        name="total"
      />
      <label htmlFor="perPage">Items per pege</label>
      <select
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={handleChange}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      {currentPosts.map(item => (
        <ul className="list-group">
          <li key={item} className="list-group-item">{item}</li>
        </ul>
      ))}
      <ul className="pagination mt-5">
        <li className={`page-item ${page - 1 < 1 ? 'disabled' : ''}`}>
          <a
            href="!#"
            className="page-link"
            onClick={() => paginate(page - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {visiblePages.map(number => (
          <li className="page-item" key={number}>
            <a
              href="!#"
              className={classNames(
                'page-link',
                {
                  active: page === number,
                  disabled: typeof number !== 'number',
                },
              )}
              onClick={() => paginate(+number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${page + 1 > visiblePages.length ? 'disabled' : ''}`}>
          <a
            href="!#"
            className="page-link"
            onClick={() => paginate(page + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

        <h2>
          {`${indexOfFirstPost + 1} - ${indexOfLastPost < total ? indexOfLastPost : total} of ${total}`}
        </h2>
      </ul>
    </div>
  );
};

export default Pagination;
