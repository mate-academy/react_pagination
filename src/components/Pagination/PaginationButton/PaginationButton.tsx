import classNames from 'classnames';
import React from 'react';

type Props = {
  dataCy: string;
  label: string;
  active: boolean;
  disabled: boolean;
  onClickedEvent: () => void;
  ariaDisabled?: boolean;
};

export const PaginationButton: React.FC<Props> = ({
  dataCy,
  label,
  active,
  disabled,
  onClickedEvent,
  ariaDisabled = true,
}) => {
  return (
    <li className={classNames('page-item', { disabled, active })}>
      <button
        type="button"
        data-cy={dataCy}
        className="page-link"
        onClick={onClickedEvent}
        aria-disabled={ariaDisabled ? 'true' : 'false'}
      >
        {label}
      </button>
    </li>
  );
};

PaginationButton.defaultProps = {
  ariaDisabled: true,
};
