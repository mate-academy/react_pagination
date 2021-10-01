import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number,
  perPage: number,
  page: number,
  handleClick: any,
}

const defaultProps = {
  withInfo: false,
};

const Pagination: React.FC<Props & typeof defaultProps> = ({
  total,
  perPage,
  page,
  withInfo,
  handleClick,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const startItem = perPage * (page - 1) + 1;
  const maxEndItem = perPage * page;
  const endItem = maxEndItem > total
    ? total
    : maxEndItem;
  const arrPages = Array.from(Array(totalPages).keys());

  return (
    <section>

      {withInfo && <p className="info">{`${startItem} - ${endItem} of ${total}`}</p>}

      <nav
        aria-label="Page navigation example"
        className="nav"
      >
        <button
          type="button"
          className="button"
          disabled={page === 1}
          onClick={event => handleClick(event, page - 1)}
        >
          Previous
        </button>

        <ul className="pagination">
          {arrPages.map(key => (
            <li
              key={key}
              className={classNames('page-item', { active: page - 1 === key })}
            >
              <a
                className="page-link"
                href="/"
                onClick={event => handleClick(event, key + 1)}
              >
                {key + 1}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="button"
          disabled={page === totalPages}
          onClick={event => handleClick(event, page + 1)}
        >
          Next
        </button>
      </nav>
    </section>
  );
};

export default Pagination;
