import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({
  total,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page'));
  const perPage = Number(searchParams.get('perPage'));

  const totalPages = Math.ceil(total / perPage);
  const pageButtons = getNumbers(1, totalPages)
    .map(n => (
      <li
        key={n}
        className={cn(
          'page-item',
          // eslint-disable-next-line quote-props
          { 'active': n === currentPage },
        )}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${n}`}
          onClick={() => {
            if (n !== currentPage) {
              searchParams.set('page', String(n));
              setSearchParams(searchParams);
            }
          }}
        >
          {n}
        </a>
      </li>
    ));

  function onChangePage(current: string) {
    switch (current) {
      case 'prevLink':
        if (currentPage !== 1) {
          searchParams.set('page', String(currentPage - 1));
          setSearchParams(searchParams);
        }

        break;

      case 'nextLink':
        if (currentPage !== totalPages) {
          searchParams.set('page', String(currentPage + 1));
          setSearchParams(searchParams);
        }

        break;

      default:
        break;
    }
  }

  const onPrevNextHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const current = event.currentTarget.getAttribute('data-cy');

    if (current) {
      onChangePage(current);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className={cn('page-link')}
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(event) => onPrevNextHandler(event)}
          >
            «
          </a>
        </li>
        {pageButtons}
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === totalPages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={(event) => onPrevNextHandler(event)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
