import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  onPageChange: (value: number) => void,
  current: number,
  itemsPerPage: number,
  total: number,
};

export const Pagination: React.FC<Props> = ({
  onPageChange, itemsPerPage, total,
}) => {
  const [params, setParams] = useSearchParams();

  const currPage = Number(params.get('page')) || 1;

  const quantityOfPages = Math.ceil(total
    / (Number(params.get('perPage')) || 5));

  function handleClick(event:React.MouseEvent<HTMLElement>):void {
    console.log(itemsPerPage, total, `qty of P ${quantityOfPages}`);
    console.log(event.currentTarget.innerText);
    console.log(params);

    event.preventDefault();
    onPageChange(+event.currentTarget.innerText);

    const oldParams = new URLSearchParams(params);

    if (!Number.isNaN(event.currentTarget.innerText)) {
      oldParams.set('page', event.currentTarget.innerText);
      setParams(oldParams);
    }

    if (event.currentTarget.innerText === '«') {
      oldParams.set('page', `${currPage - 1}`);
      setParams(oldParams);
    }

    if (event.currentTarget.innerText === '»') {
      oldParams.set('page', `${currPage + 1}`);
      setParams(oldParams);
    }

    console.log(params.get('page') + ' - cur page');
    console.log(params.get('perPage') + ' - items per page');
  }

  function GeneratePages() {
    const pages = [];

    for (let i = 1; i <= quantityOfPages; i += 1) {
      pages.push(
        <li className={classNames('page-item',
          { active: (Number(params.get('page')) || 1) === i })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="/"
            onClick={handleClick}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  }

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: ((Number(params.get('page')) || 1) === 1) })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={((Number(params.get('page')) || 1) === 1)}
            onClick={handleClick}
          >
            «
          </a>
        </li>
        {GeneratePages()}
        <li className={classNames('page-item',
          {
            disabled: ((Number(params.get('page')) || 1) === quantityOfPages),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={((Number(params.get('page'))
              || 1) === quantityOfPages)}
            onClick={handleClick}
          >
            »
          </a>
        </li>
      </ul>
{/*       <ul>
        <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li>
      </ul> */}
    </>
  );
};
