import classNames from 'classnames';
import { getMaxOfArray } from '../../utils';

type Props = {
  currentPage: number,
  paginate: (page: number) => void,
  pageNumber: number[],
  direction: string,
};

export const Step: React.FC<Props> = ({
  currentPage, paginate, pageNumber, direction,
}) => {
  const makeStep = (directionStep: string) => {
    if (directionStep === 'back' && currentPage > 1) {
      paginate(currentPage - 1);
    }

    if (directionStep === 'forward' && currentPage < pageNumber.length) {
      paginate(currentPage + 1);
    }
  };

  if (direction === 'back') {
    return (
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
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
    );
  }

  return (
    <li
      className={classNames('page-item', {
        disabled: currentPage === getMaxOfArray(pageNumber),
      })}
    >
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        onClick={() => makeStep('forward')}
        aria-disabled="true"
      >
        »
      </a>
    </li>
  );
};
