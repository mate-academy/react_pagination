import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationButtonProps = {
  dataCy: string;
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  ariaDisabled?: boolean;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  active,
  dataCy,
  label,
  disabled,
  onClick,
  ariaDisabled = true, // Set the default value to true
}) => {
  return (
    <li className={cn('page-item', { disabled, active })}>
      <button
        type="button"
        data-cy={dataCy}
        className="page-link"
        onClick={onClick}
        aria-disabled={ariaDisabled ? 'true' : 'false'}
      >
        {label}
      </button>
    </li>
  );
};

PaginationButton.defaultProps = {
  ariaDisabled: true,
};

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const countPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, countPage);

  const prevOnClick = () => {
    if (currentPage && currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextOnClick = () => {
    if (currentPage && currentPage !== countPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <PaginationButton
        label="«"
        active={false}
        disabled={currentPage === 1}
        ariaDisabled={currentPage === 1}
        onClick={prevOnClick}
        dataCy="prevLink"
      />

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          label={String(page)}
          disabled={false}
          onClick={() => onPageChange(page)}
          dataCy="pageLink"
        />
      ))}

      <PaginationButton
        label="»"
        active={false}
        disabled={currentPage === countPage}
        ariaDisabled={currentPage === countPage}
        onClick={nextOnClick}
        dataCy="nextLink"
      />
    </ul>
  );
};
