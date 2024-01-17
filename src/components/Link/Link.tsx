import React from 'react';
import cn from 'classnames';

type Props = {
  href: number,
  isActive: boolean,
  onClickCallBack: (href: number) => void,
};

export const Link: React.FC<Props> = ({
  href,
  isActive,
  onClickCallBack,
}) => (
  <li className={cn('page-item', {
    active: isActive,
  })}
  >
    <a
      onClick={() => onClickCallBack(href)}
      data-cy="pageLink"
      className="page-link"
      href={`#${href}`}
    >
      {href}
    </a>
  </li>
);
