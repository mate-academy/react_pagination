import React from 'react';
import { SPREAD_ONE, SPREAD_TWO } from '../../consts';

type Page = string | number;
type Props = {
  value: Page,
  isDisabled: boolean,
  selectedPage: number,
  onPageChange: (page: number) => void,
};

export const PageButton: React.FC<Props> = ({
  value,
  selectedPage,
  isDisabled,
  onPageChange,
}) => {
  let useValue: number;

  switch (value) {
    case SPREAD_ONE:
    case SPREAD_TWO:
      useValue = 0;
      break;
    case 'Prev':
      useValue = selectedPage - 1;
      break;
    case 'Next':
      useValue = selectedPage + 1;
      break;
    default:
      useValue = +value;
  }

  return (
    <button
      type="button"
      className="page-link"
      onClick={() => {
        onPageChange(useValue);
      }}
      disabled={isDisabled}
    >
      {value === SPREAD_ONE || value === SPREAD_TWO ? '...' : value}
    </button>
  );
};
