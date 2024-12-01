import React from 'react';
import cn from 'classnames';

interface ArrowProps {
  icon: string;
  test: string;
  href: string;
  condition: boolean;
  onPageChange: () => void;
}

export const Arrow: React.FC<ArrowProps> = ({
  icon,
  test,
  href,
  condition,
  onPageChange,
}) => {
  return (
    <li
      className={cn('page-item', { disabled: condition })}
      onClick={onPageChange}
    >
      <a
        data-cy={test}
        className="page-link"
        href={href}
        aria-disabled={condition}
        onClick={onPageChange}
      >
        {icon}
      </a>
    </li>
  );
};
