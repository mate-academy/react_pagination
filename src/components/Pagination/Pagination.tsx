import React, { useMemo } from 'react';
import cn from 'classnames';

import { PageItem } from './PageItem';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = useMemo(() => {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }, [totalPages]);

  return (
    <ul className="pagination">
      <PageItem
        title="«"
        dataCy="prevLink"
        ariaDisabled={currentPage === 1}
        className={cn({ disabled: currentPage === 1 })}
        onPageChange={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
      />

      {pages.map(page => {
        return (
          <PageItem
            title={page.toString()}
            dataCy="pageLink"
            key={page}
            className={cn({ active: currentPage === page })}
            onPageChange={() => onPageChange(page)}
          />
        );
      })}

      <PageItem
        title="»"
        dataCy="nextLink"
        ariaDisabled={currentPage === totalPages}
        className={cn({ disabled: currentPage === totalPages })}
        onPageChange={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      />
    </ul>
  );
};
