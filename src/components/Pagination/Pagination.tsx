import React from 'react';
type Props = {
	total: number;
	perPage: number;
	currentPage: number;
	onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
	total,
	perPage,
	currentPage,
	onPageChange,
}) => {
	const countPage = Math.ceil(total / perPage);
	const pages: number[] = [];

	for (let i = 1; i < countPage + 1; i++) {
		pages.push(i);
	}

	return (
		<ul className="pagination">
			<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
				<a
					data-cy="prevLink"
					className="page-link"
					href="#prev"
					aria-disabled={currentPage === 1}
					onClick={
						currentPage !== 1 ? () => onPageChange(currentPage - 1) : undefined
					}
				>
					«
				</a>
			</li>
			{pages.map((el: number) => {
				return (
					<li
						key={el}
						className={`page-item ${currentPage === el && 'active'}`}
					>
						<a
							data-cy="pageLink"
							className="page-link"
							href={`#${el}`}
							onClick={() => onPageChange(el)}
						>
							{el}
						</a>
					</li>
				);
			})}

			<li
				className={`page-item ${currentPage === countPage ? 'disabled' : ''}`}
			>
				<a
					data-cy="nextLink"
					className="page-link"
					href="#next"
					aria-disabled={currentPage === countPage}
					onClick={
						currentPage !== countPage
							? () => onPageChange(currentPage + 1)
							: undefined
					}
				>
					»
				</a>
			</li>
		</ul>
	);
};
