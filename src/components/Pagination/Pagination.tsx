import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { getNumbers } from "../../utils";

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [chosenPage, setChosenPage] = useState(currentPage);
  const totalTabs = Math.ceil(total / perPage);
  const isDisabled = chosenPage === totalTabs;

  useEffect(() => {
    setChosenPage(currentPage);
  }, [perPage]);

  useEffect(() => {
    onPageChange(chosenPage);
  }, [chosenPage]);

  const selectPrevPage = () => {
    if (currentPage !== chosenPage) {
      setChosenPage((prevPage) => prevPage - 1);
    }
  };

  const selectNextPage = () => {
    if (!isDisabled) {
      setChosenPage((nextPage) => nextPage + 1);
    }
  };

  const selectPageOnTab = (item: number) => {
    setChosenPage(item);
  };

  return (
    <ul className="pagination">
      <li
        className={cn("page-item", {
          disabled: chosenPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isDisabled}
          onClick={selectPrevPage}
        >
          «
        </a>
      </li>
      {getNumbers(currentPage, totalTabs).map((item) => (
        <li
          className={cn("page-item", {
            active: chosenPage === item,
          })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => selectPageOnTab(item)}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={cn("page-item", {
          disabled: isDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isDisabled}
          onClick={selectNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
