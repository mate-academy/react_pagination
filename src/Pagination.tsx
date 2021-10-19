import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number,
  perPage: number,
  page: number
  changePage: (value: number) => void
}

function countPage(total: number, perPage: number): number[] {
  const arr = [];
  const lastPage = Math.ceil(total / perPage);

  for (let i = 1; i <= lastPage; i += 1) {
    arr.push(i);
  }

  return arr;
}

export class Pagination extends React.Component<Props, {}> {
  state = {};

  render() {
    const { total, perPage, page } = this.props;
    const totalPage = countPage(total, perPage);

    return (
      <ul className="list">
        {totalPage.map(number => {
          return (
            <li key={number} className="item">
              <button
                type="button"
                className={classNames({ active: (page === number) })}
                onClick={() => {
                  this.props.changePage(number);
                }}
              >
                {number}

              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
