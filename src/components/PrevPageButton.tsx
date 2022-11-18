import React from 'react';
import classNames from 'classnames';

type Props = {
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>
};

export const PrevPageButton: React.FC<Props> = (props) => {
  const {
    onPageChange,
    currentPage,
  } = props;

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <li className={classNames(
      'page-item',
      { disabled: currentPage === 1 },
    )}
    >
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1}
        onClick={prevPage}
      >
        «
      </a>
    </li>
  );
};
