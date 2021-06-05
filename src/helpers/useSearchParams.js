import { useLocation, useHistory } from 'react-router-dom';

export function useSearchParams() {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const updateSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  };

  return [searchParams, updateSearchParams];
}
