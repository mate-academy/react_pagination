type PageInfoProps = {
  currentPage:number,
  firstItem: number,
  lastItem: number,
  total: number,
};

export const PageInfo: React.FC<PageInfoProps> = ({
  currentPage,
  firstItem,
  lastItem,
  total,
}) => {
  return (
    <p className="lead" data-cy="info">
      {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
    </p>
  );
};
