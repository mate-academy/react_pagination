type Props = {
  page: number;
  onClick: () => void;
};

export const PageLink: React.FC<Props> = ({
  page,
  onClick,
}) => (
  <a
    data-cy="pageLink"
    className="page-link"
    href={`#${page}`}
    onClick={onClick}
  >
    {page}
  </a>
);
