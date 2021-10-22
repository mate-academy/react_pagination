import React from 'react';
import classnames from 'classnames';
import { PageButton } from '../PageButton';
import { SelectPerPage } from '../SelectPerPage';
import { SPREAD_ONE, SPREAD_TWO } from '../../consts';

type Props = {
  total: number,
  selectValues: number[],
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>, firstItemOnPage: number) => void,
  onPageChange: (page: number) => void,
  withInfo?: boolean,
  perPage?: number,
  page?: number,
};
type Page = string | number;

const getPageButtons = (page: number, totalPages: number) => {
  // Если страниц меньше шести - нет смысла отрисовывать больше чем три страницы
  if (totalPages < 6) {
    let result: Page[];

    switch (page) {
      case 1:
        result = [1, 2, 3];
        break;
      case totalPages:
        result = [totalPages - 2, totalPages - 1, totalPages];
        break;
      default:
        result = [page - 1, page, page + 1];
        break;
    }

    result = ['Prev', ...result, 'Next'];

    return result;
  }

  const beginning = [];
  let middle: Page[] = [];
  const ending = [];

  if (page <= 3) {
    for (let i = 1; i <= page + 1; i += 1) {
      beginning.push(i);
    }
  } else {
    beginning.push(1);
  }

  beginning.push(SPREAD_ONE);

  if (page > 3 && page < totalPages - 2) {
    middle = [page - 1, page, page + 1, SPREAD_TWO];
  }

  if (page >= totalPages - 2) {
    for (let i = page - 1; i <= totalPages; i += 1) {
      ending.push(i);
    }
  } else {
    ending.push(totalPages);
  }

  return ['Prev', ...beginning, ...middle, ...ending, 'Next'];
};

const checkDisabled = (value: Page, selectedPage: number, totalPages: number) => {
  switch (value) {
    case SPREAD_ONE:
    case SPREAD_TWO:
      return true;
    case 'Prev':
      return selectedPage === 1;
    case 'Next':
      return selectedPage === totalPages;
    default:
      return false;
  }
};

export const Pagination: React.FC<Props> = ({
  total,
  selectValues,
  onPerPageChange,
  onPageChange,
  withInfo = false,
  perPage = 5,
  page = 1,
}) => {
  const totalPages = ((total - (total % perPage)) / perPage) + 1;
  const firstItemOnPage = 1 + (perPage * (page - 1));
  const lastItemOnPage = firstItemOnPage + (perPage - 1);
  const pagesArr = getPageButtons(page, totalPages);

  return (
    <nav aria-label="Page navigation example">
      <SelectPerPage
        perPage={perPage}
        firstItemOnPage={firstItemOnPage}
        selectValues={selectValues}
        onPerPageChange={onPerPageChange}
      />
      <br />
      {withInfo && (
        <span>
          {`${firstItemOnPage} - ${lastItemOnPage > total ? total : lastItemOnPage} of ${total}`}
        </span>
      )}
      <ul className="pagination">
        {pagesArr.map((value) => {
          const isDisabled = checkDisabled(value, page, totalPages);

          return (
            <li
              key={`page-${value}`}
              className={classnames(
                'page-item',
                { active: page === value },
                { disabled: isDisabled },
              )}
            >
              <PageButton
                value={value}
                selectedPage={page}
                onPageChange={onPageChange}
                isDisabled={isDisabled}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  withInfo: false,
  perPage: 5,
  page: 1,
};
