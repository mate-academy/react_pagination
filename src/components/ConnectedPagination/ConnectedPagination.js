import withQueryParams from 'react-router-query-params';
import { PaginationWrapper } from '../PaginationWrapper';

export const ConnectedPagination = withQueryParams({
  stripUnknownKeys: false,
  keys: {
    page: {
      default: '1',
      validate: value => !!value && /\d/.test(value),
    },
    perPage: {
      default: '5',
      validate: value => !!value && /\d/.test(value),
    },
  },
})(PaginationWrapper);
