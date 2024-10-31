export const getTotalPage = (length: number, perPage: number) =>
  Math.ceil(length / perPage);
