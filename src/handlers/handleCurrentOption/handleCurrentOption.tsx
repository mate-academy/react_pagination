interface CurrentOptionHandler {
  event: React.ChangeEvent<HTMLSelectElement>;
  setPerPage: (pageNumber: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  newParams: URLSearchParams;
  setSearchParams: (currentOptions: URLSearchParams) => void;
}

export default function handleCurrentOption(params: CurrentOptionHandler): void {
  const { event, setPerPage, setCurrentPage, newParams, setSearchParams } =
    params;
  const startPage = import.meta.env.VITE_START_PAGE;

  setPerPage(+event.target.value);
  setCurrentPage(+startPage);

  newParams.set('perPage', `${event.target.value}`);
  newParams.set('page', `${startPage}`);
  setSearchParams(newParams);
}
