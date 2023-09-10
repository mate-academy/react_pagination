import React from 'react';
import { PerPageOption } from '../PerPageOption';
import { PaginationOption } from '../../types/PaginationOption';

type Props = {
  selectOptions: number[],
  paginationOption: PaginationOption,
  onChangePaginationOption: (value: string) => void,
};

export const PerPageList: React.FC<Props> = ({
  selectOptions,
  paginationOption,
  onChangePaginationOption,
}) => {
  return (
    <select
      value={paginationOption.perPage}
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={(event) => onChangePaginationOption(event.target.value)}
    >
      {selectOptions.map(option => (
        <PerPageOption
          key={option}
          option={option}
        />
      ))}
    </select>
  );
};
