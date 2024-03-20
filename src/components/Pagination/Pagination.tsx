import React from 'react';
import cn from 'classnames';

type Props = {
    total: number;
    perPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
    currentPage,
    onPageChange,
    perPage,
    total
}) => {
    const numberOfPages = Math.ceil(total / perPage);

    const countPages = (): number[] => {
        const arr: number[] = [];

        for (let i = 1; i <= numberOfPages; i++) {
            arr.push(i);
        }
        return arr;
    }

    const pageList = countPages();

    return (
        <ul className="pagination">
            <li className={
                cn({
                    'page-item': true,
                    'disabled': currentPage === 1
                })
            }
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 1)
                    }
                }}
            >
                <a
                    data-cy="prevLink"
                    className="page-link"
                    href="#prev"
                    aria-disabled={currentPage === 1 ? "true" : "false"}
                >
                    «
                </a>
            </li>
            {
                pageList.map(page =>
                    <li className={cn('page-item', { active: page === currentPage })} key={page}>
                        <a
                            data-cy="pageLink"
                            className="page-link"
                            href={`#${page}`}
                            onClick={() => {
                                if (page !== currentPage) {
                                    onPageChange(page)
                                }
                            }}>
                            {page}
                        </a>
                    </li>
                )
            }
            <li className={
                cn({
                    'page-item': true,
                    'disabled': currentPage === numberOfPages
                })
            }
                onClick={() => {
                    if (currentPage < numberOfPages) {
                        onPageChange(currentPage + 1)
                    }
                }}>
                <a
                    data-cy="nextLink"
                    className="page-link"
                    href="#next"
                    aria-disabled={currentPage === numberOfPages ? "true" : "false"}>
                    »
                </a>
            </li>
        </ul>
    )
};
