export const handleChanges = (page, length, value, searchParams, history) => {
  if (+page > length / value) {
    searchParams.set('page', length / value);
  }

  searchParams.set('perPage', value);
  history.push({
    search: searchParams.toString(),
  });
};
