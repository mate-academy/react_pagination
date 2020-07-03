export function showPosts(perPage, page, list) {
  const lastIndex = perPage * page;
  const startIndex = perPage * (page - 1);

  return list.slice(startIndex, lastIndex);
}
