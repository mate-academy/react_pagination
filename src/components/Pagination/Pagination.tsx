import React from 'react';
import classnames from 'classnames';

import './Pagination.css';

type Props = {
  total: number,
  perPage: number,
  page: number,
  pageChange: (num: number) => void,
};

type State = {};

export class Pagination extends React.Component<Props, State> {
  state = {};

  render() {
    const {
      total,
      perPage,
      page,
      pageChange,
    } = this.props;

    const coutPage = Math.ceil(total / perPage);

    const btn = Array.from({ length: coutPage }, (_, k: number) => k + 1);

    return (
      <>
        <h2> Pagination </h2>

        <p>
          {page * perPage - perPage + 1}
          {' '}
          -
          {' '}
          {page * perPage}
          {' '}
          of
          {' '}
          {total}
        </p>

        <div className="Pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => pageChange(page - 1)}
          >
            Pre
          </button>
          <button
            type="button"
            hidden={page < 3}
            onClick={() => pageChange(1)}
          >
            ...
          </button>

          {btn.map((elem) => (
            <button
              type="button"
              key={elem}
              className={classnames('Pagination__btn', { 'Pagination__btn--active': page === elem })}
              hidden={
                elem !== page
                && elem !== page + 1
                && elem !== page - 1
              }
              onClick={() => pageChange(elem)}
            >
              {elem}
            </button>
          ))}
          <button
            type="button"
            hidden={page >= coutPage - 1}
            onClick={() => pageChange(coutPage)}
          >
            ...
          </button>
          <button
            type="button"
            disabled={page === coutPage}
            onClick={() => pageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
