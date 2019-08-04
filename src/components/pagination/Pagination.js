/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './pagination.css';

const Pagination = ({
  total, perPage, page, url, history, withInfo, shortcut,
}) => {
  const countOfPages = Math.ceil(total / perPage);
  const urlWithPerPage = `${url + perPage}/`;

  const getPages = () => {
    const pages = [];

    if (shortcut) {
      for (let i = 1; i <= countOfPages; i += 1) {
        if (i === 1 || i === countOfPages || (i >= page - 1 && i <= page + 1)) {
          pages.push(
            <li
              key={`page${i}`}
              className="pagination__list--item"
            >
              <NavLink
                className="pagination__list--link"
                activeClassName={i === 1 ? 'active' : undefined}
                to={urlWithPerPage + i}
              >
                {i}
              </NavLink>
            </li>
          );
        } else if (i === page - 2 || i === page + 2) {
          pages.push(<span key={`page${i}`}>...</span>);
        }
      }
    } else {
      for (let i = 1; i <= countOfPages; i += 1) {
        pages.push(
          <li
            key={`page${i}`}
            className="pagination__list--item"
          >
            <NavLink
              className="pagination__list--link"
              activeClassName={i === 1 ? 'active' : undefined}
              to={urlWithPerPage + i}
            >
              {i}
            </NavLink>
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <nav aria-label="Page pagination" className="pagination">
      {
        withInfo && (
          <Pagination.Info page={page} perPage={perPage} total={total} />
        )
      }

      <Pagination.ChoosePerPage
        perPage={perPage}
        url={url}
        history={history}
      />

      <Pagination.PrevNextButton
        page={page}
        urlWithPerPage={urlWithPerPage}
        countOfPages={countOfPages}
      >
        <ul className="pagination__list">

          {getPages()}

        </ul>
      </Pagination.PrevNextButton>
    </nav>
  );
};

Pagination.Info = ({ page, perPage, total }) => {
  const count = page * perPage;
  const start = count - perPage + 1;
  const end = count < total ? count : total;

  return (
    <p className="pagination__info">
      {start !== end && `${start} - `}
      {`${end} of ${total}`}
    </p>
  );
};

Pagination.ChoosePerPage = ({ perPage, url, history }) => (
  <select
    className="pagination__per-page"
    value={perPage}
    onChange={e => history.push(`${url + e.target.value}/1`)}
  >
    <option value="3">3</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
  </select>
);

Pagination.PrevNextButton = ({
  page, urlWithPerPage, countOfPages, children,
}) => (
  <>
    <li className="pagination__list--item">
      <Link
        className={`pagination__list--link ${page > 1 ? 'active' : undefined}`}
        to={page > 1
          ? `${urlWithPerPage + (page - 1)}`
          : `${urlWithPerPage + page}`}
      >
        Previous
      </Link>
    </li>

    {children}

    <li className="pagination__list--item">
      <Link
        className={
          `pagination__list--link ${page < countOfPages ? 'active' : undefined}`
        }
        to={page < countOfPages
          ? `${urlWithPerPage + (page + 1)}`
          : `${urlWithPerPage + page}`}
      >
        Next
      </Link>
    </li>
  </>
);

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  withInfo: PropTypes.bool,
  shortcut: PropTypes.bool,
};

Pagination.defaultProps = {
  withInfo: false,
  shortcut: false,
};

Pagination.Info.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

Pagination.ChoosePerPage.propTypes = {
  perPage: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Pagination.PrevNextButton.propTypes = {
  page: PropTypes.number.isRequired,
  urlWithPerPage: PropTypes.string.isRequired,
  countOfPages: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

export default Pagination;
