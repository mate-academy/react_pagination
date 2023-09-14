import React from 'react';
import { PaginationOption } from '../../types/PaginationOption';
import { defaultPaginVal } from '../../utils';

type Props = {
  selectOptions: number[],
  paginationOption: PaginationOption,
  onSetPaginationOption: (value: PaginationOption) => void,
};

export const PageSizeSelectList: React.FC<Props> = ({
  selectOptions,
  paginationOption,
  onSetPaginationOption,
}) => {
  const handleItemPerPage
  = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onSetPaginationOption({
      ...paginationOption,
      perPage: +event.target.value,
      currentPage: defaultPaginVal.currentPage,
    });
  };

  return (
    <select
      value={paginationOption.perPage}
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={handleItemPerPage}
    >
      {selectOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};
