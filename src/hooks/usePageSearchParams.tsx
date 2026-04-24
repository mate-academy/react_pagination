import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { ItemsPerPage } from '../types/ItemsPerPage';

type Return = {
  searchParamPage: number | null;
  searchParamPerPage: ItemsPerPage | null;
  setSearchParams: SetURLSearchParams;
};

export const usePageSearchParams = (
  optionsItemsPerPage: ItemsPerPage[],
): Return => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamPage = Number(searchParams.get('page'));

  const perPageFromUrl = Number(searchParams.get('perPage'));
  const searchParamPerPage = optionsItemsPerPage.includes(
    perPageFromUrl as ItemsPerPage,
  )
    ? (perPageFromUrl as ItemsPerPage)
    : null;

  return {
    searchParamPage,
    searchParamPerPage: searchParamPerPage,
    setSearchParams: setSearchParams,
  };
};
