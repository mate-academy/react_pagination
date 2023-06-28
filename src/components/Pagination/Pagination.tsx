import classNames from 'classnames';
import { getMaxOfArray } from '../../utils';
import { GetPages } from './Pages';

type Props = {
  items: string[],
  pageNumber: number[],
  paginate: (page: number) => void,
  makeStep: (direction: string) => void,
  pageNumberBack: number,
};

export const Pagination: React.FC<Props> = ({
  items,
  pageNumber,
  pageNumberBack,
  makeStep,
  paginate,
}) => {
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

        <GetPages
          paginate={paginate}
          pageNumber={pageNumber}
          pageNumberBack={pageNumberBack}
        />

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
