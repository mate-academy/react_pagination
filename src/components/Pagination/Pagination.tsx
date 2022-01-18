import { Component } from 'react';
import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  total: number,
  perPage?: number,
  page?: number,
  onPageChange: (page: number) => void,
};

export class Pagination extends Component<Props> {
  state = {};

  getCurrentValue = (
    el: number, first: number, last: number, currentPage: number, total: number,
  ) => {
    let value: string | number = el;
    const currentFirst = (first !== 1 && first !== currentPage) ? first : 0;
    const currentLast = (last && last !== total && last !== currentPage) ? last : 0;

    switch (value) {
      case currentFirst:
        value = '<';
        break;

      case currentLast:
        value = '>';
        break;

      default:
        value = el;
    }

    return value;
  };

  render() {
    const {
      total,
      onPageChange,
      perPage,
      page,
    } = this.props;

    const interval = perPage || 5;
    const currentPage = page || 1;

    const per = Math.floor(interval / 2);
    let first = currentPage - per;
    let last = currentPage + per;

    first = first < 1 ? 1 : first;
    first = currentPage > total - per ? total - interval + 1 : first;
    last = currentPage > total - per ? total : last;
    last = currentPage <= per ? interval : last;

    return (
      <>
        {`${first} - ${last} of ${total}`}
        <ul className="pagination">
          <li key="0">
            <button
              type="button"
              disabled={currentPage === 1}
              className="pagination__button"
              onClick={() => {
                const prevPage = currentPage - 1;

                onPageChange(prevPage);
              }}
            >
              prev
            </button>
          </li>
          {Array.from({ length: total }, (_, i) => i + 1).map((el: number) => (
            ((el >= first && el <= last) || el === 1 || el === total) && (
              <li key={el}>
                <a
                  className={classNames('pagination__link', { 'pagination__link--current': page === el })}
                  href={`/?page=${page}&perPage=${perPage}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(el);
                  }}
                >
                  {this.getCurrentValue(el, first, last, currentPage, total)}
                </a>
              </li>
            )
          ))}
          <li key={total + 1}>
            <button
              type="button"
              disabled={currentPage === total}
              className="pagination__button"
              onClick={() => {
                const prevPage = currentPage + 1;

                onPageChange(prevPage);
              }}
            >
              next
            </button>
          </li>
        </ul>
      </>
    );
  }
}
