import classNames from 'classnames';

interface Props {
  items: string[],
  pageNumber: number[],
  paginate: (page: number) => void,
  makeStep: (direction: string) => void,
  pageNumberBack: number,
}

export const Pagination: React.FC<Props> = ({
  items,
  pageNumber,
  paginate,
  pageNumberBack,
  makeStep,
}) => {
  function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
  }

  function getPages(pageNumberRender: number[]) {
    return (
      pageNumberRender.map(page => {
        return (
          <li
            className={classNames('page-item', {
              active: page === pageNumberBack,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              key={page}
              onClick={() => paginate(page)}
            >
              {page}
            </a>
          </li>
        );
      })
    );
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: pageNumberBack === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => makeStep('back')}
            aria-disabled="true"
          >
            «
          </a>
        </li>

        {getPages(pageNumber)}

        <li
          className={classNames('page-item', {
            disabled: pageNumberBack === getMaxOfArray(pageNumber),
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => makeStep('forward')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </>
  );
};
