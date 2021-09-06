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
  const endItem = perPage * page > total ? total : perPage * page;

  return (
    <section>

      {withInfo && <p className="info">{`${startItem} - ${endItem} of ${total}`}</p>}

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={classNames('page-item', { disabled: page === 1 })}>
            <a
              className="page-link"
              href="/"
              onClick={event => handleClick(event, page - 1)}
            >
              Previous
            </a>
          </li>

          {Array.from(Array(totalPages).keys()).map(key => (
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

          <li className={classNames('page-item', { disabled: page === totalPages })}>
            <a
              className="page-link"
              href="/"
              onClick={event => handleClick(event, page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Pagination;
