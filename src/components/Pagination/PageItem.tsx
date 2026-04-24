import React from 'react';
import cn from 'classnames';

type Props = {
  title: string;
  onPageChange: () => void;
  className?: string;
  dataCy: string;
  ariaDisabled?: React.AriaAttributes['aria-disabled'];
};

export const PageItem: React.FC<Props> = ({
  title,
  onPageChange,
  className,
  dataCy,
  ariaDisabled,
}) => {
  return (
    <li className={cn('page-item', className)}>
      <button
        data-cy={dataCy}
        className="page-link"
        onClick={onPageChange}
        aria-disabled={ariaDisabled}
      >
        {title}
      </button>
    </li>
  );
};
