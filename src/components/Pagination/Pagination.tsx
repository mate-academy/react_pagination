import cn from 'classnames';
import { getNumbers } from '../../utils';
import { ItemsPerPage } from '../../types/ItemsPerPage';

type Item = string;

const getItemsPerPage = (
  items: Item[],
  countPerPage = 5,
): ItemsPerPage<Item> => {
  const itemsPerPage: ItemsPerPage<Item> = {};

  items.forEach((item, index) => {
    const currentPage = String(Math.floor(index / countPerPage) + 1);

    if (itemsPerPage[currentPage]) {
      itemsPerPage[currentPage].push(item);
    } else {
      itemsPerPage[currentPage] = [item];
    }
  });

  return itemsPerPage;
};

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const items: Item[] = getNumbers(1, total).map((n) => `Item ${n}`);
  const allPages = getItemsPerPage(items, perPage);
  const pageLinksArr = Object.keys(allPages);

  const changeActivePage = (changeValue: string) => {
    if (changeValue === 'front') {
      if (currentPage < Number(pageLinksArr[pageLinksArr.length - 1])) {
        onPageChange(currentPage + 1);
      }
    }

    if (changeValue === 'back') {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={
            `page-item ${
              cn({
                disabled: currentPage === 1,
              })}`
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => changeActivePage('back')}
          >
            «
          </a>
        </li>

        {pageLinksArr.map((link) => (
          <li
            key={link}
            className={cn({
              'page-item active': +link === +currentPage,
              'page-item': +link !== currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              href="#1"
              className="page-link"
              onClick={() => onPageChange(Number(link))}
            >
              {link}
            </a>
          </li>
        ))}

        <li
          className={
            `page-item ${
              cn({
                disabled:
                currentPage === Number(pageLinksArr[pageLinksArr.length - 1]),
              })}`
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === Number(pageLinksArr[pageLinksArr.length - 1])
            }
            onClick={() => changeActivePage('front')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {allPages[currentPage].map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
