import { strict } from "assert";

interface CurrentPageHandler {
  event: React.MouseEvent<HTMLAnchorElement>;
  currentPage: number;
  pageItemsCount: number;
  setCurrentPage: (pageNumber: number) => void;
  newParams: URLSearchParams;
  setSearchParams: (currentOptions: URLSearchParams) => void;
}

export default function handleCurrentPage(params: CurrentPageHandler): void {
  const {
    event,
    currentPage,
    pageItemsCount,
    setCurrentPage,
    newParams,
    setSearchParams,
  } = params;
  const value: string = (event.target as HTMLAnchorElement).text;

  if (value === '«' && currentPage > 1) {
    setCurrentPage(currentPage - 1);
    newParams.set('page', `${currentPage - 1}`);
  }

  if (value === '»' && currentPage < pageItemsCount) {
    setCurrentPage(currentPage + 1);
    newParams.set('page', `${currentPage + 1}`);
  }

  if (Number.isInteger(+value)) {
    setCurrentPage(+value);
    newParams.set('page', `${value}`);
  }

  setSearchParams(newParams);
}
