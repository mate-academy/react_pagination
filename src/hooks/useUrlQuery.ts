import { useLocation } from 'react-router-dom';

export function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}
