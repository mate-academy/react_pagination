import React from 'react';
import cn from 'classnames';

interface Props {
  value: string;
  column: number;
  setColumn: (index: number) => void;
  maxItems: number;
  getNumbers: (item1: number, item2: number) => number[];
}

export const Pagination: React.FC<Props> = ({
  value,
  column,
  setColumn,
  maxItems,
  getNumbers,
}) => {
  const columns = Math.ceil(maxItems / Number(value));

  const arrayColumn: number[] = [];

  getNumbers(1, columns).map(item => arrayColumn.push(item + 1));

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: column === 0 })}
        onClick={column !== 0 ? () => setColumn(column - 1) : undefined}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      {arrayColumn.map((_item, index) => (
        <li
          className={cn('page-item', { active: column === index })}
          key={index}
          onClick={() => setColumn(index)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${index + 1}`}>
            {index + 1}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: column + 1 === columns })}
        onClick={() => column !== columns - 1 && setColumn(column + 1)}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
