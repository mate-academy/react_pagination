import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number[],
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>
};

export const NextPageButton: React.FC<Props> = (props) => {
  const {
    total,
    onPageChange,
    currentPage,
  } = props;

  const nextPage = () => {
    if (currentPage < total.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <li
      className={classNames(
        'page-item',
        { disabled: currentPage === total.length },
      )}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === total.length}
        onClick={nextPage}
      >
        »
      </a>
    </li>
  );
};
