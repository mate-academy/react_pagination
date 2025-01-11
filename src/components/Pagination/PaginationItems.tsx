import { PaginationInterface } from './types';

export const PaginationItems = ({
  pagination,
}: {
  pagination: PaginationInterface;
}) => {
  const itemsValue = [];

  const startIndex =
    ((pagination.currentPage || 1) - 1) * pagination.perPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.perPage - 1,
    pagination.total,
  );

  for (let i = startIndex || 1; i <= endIndex; i++) {
    itemsValue.push(
      <div key={i} data-cy="item">
        Item {i}
      </div>,
    );
  }

  return <div>{itemsValue}</div>;
};
