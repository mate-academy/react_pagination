import React from 'react';
import { PaginationOption } from '../../types/PaginationOption';

type Props = {
  selectOptions: number[],
  paginationOption: PaginationOption,
  onSetPaginationOption: (value: string) => void,
};

export const PageSizeSelectList: React.FC<Props> = ({
  selectOptions,
  paginationOption,
  onSetPaginationOption,
}) => {
  return (
    <select
      value={paginationOption.perPage}
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={(event) => onSetPaginationOption(event.target.value)}
    >
      {selectOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};
