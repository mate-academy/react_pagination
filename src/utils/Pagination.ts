export default class GenericPagination<T> {
  pages: T[][];

  pageCount: number;

  constructor(
    items: T[],
    public itemsPerPage: number,
  ) {
    this.pageCount = Math.ceil(items.length / itemsPerPage);
    this.pages = items.reduce((acc: T[][], item) => {
      const collection = acc;

      if (collection[collection.length - 1].length === itemsPerPage) {
        collection.push([]);
      }

      collection[collection.length - 1].push(item);

      return collection;
    }, [[]]);
  }

  getPage(index: number) {
    return this.pages[index];
  }

  getPagesCount() {
    return this.pageCount;
  }
}
