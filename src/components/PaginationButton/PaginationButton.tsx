import cn from 'classnames';

type Props = {
  dataCy: string;
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  ariaDisabled?: boolean;
};

export const PaginationButton: React.FC<Props> = ({
  active,
  dataCy,
  label,
  disabled,
  onClick,
  ariaDisabled = true,
}) => {
  return (
    <li className={cn('page-item', { disabled, active })}>
      <button
        type="button"
        data-cy={dataCy}
        className="page-link"
        onClick={onClick}
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
