import React from 'react';

const CreateControls = (props) => {
  const controls = [];
  const { pageCount, page, setCurrentPage } = props;

  for (let i = 1; i <= pageCount; i += 1) {
    const baseClassName = 'pagination-controls__button';
    const activeClassName = i === page
      ? `${baseClassName}--active`
      : '';

    if (i === 1) {
      controls.push(
        <button
          key="lowerPage"
          type="button"
          disabled={i === page}
          onClick={() => setCurrentPage(page - 1)}
        >
          {`<`}
        </button>
      );
    }

    if (i === 1 && page > 2) {
      controls.push(
        <button
          key="first"
          type="button"
          disabled={i === page}
          onClick={() => setCurrentPage(1)}
        >
          {i}
        </button>
      );
    }

    if (i === 1 && page > 2) {
      controls.push(`...`);
    }

    if (i === page || i === page - 1 || i === page + 1) {
      controls.push(
        <button
          key={i}
          type="button"
          className={`${baseClassName} ${activeClassName}`}
          disabled={i === page}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    if (i === pageCount && page < pageCount - 1) {
      controls.push(`...`);
    }

    if (i === pageCount && page < pageCount - 1) {
      controls.push(
        <button
          key="last"
          type="button"
          disabled={i === page}
          onClick={() => setCurrentPage(pageCount)}
        >
          {i}
        </button>
      );
    }

    if (i === pageCount) {
      controls.push(
        <button
          key="upperPage"
          type="button"
          disabled={i === page}
          onClick={() => setCurrentPage(page + 1)}
        >
          {`>`}
        </button>
      );
    }
  }

  return controls;
};

export default CreateControls;
