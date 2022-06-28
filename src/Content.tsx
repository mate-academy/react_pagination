type Props = {
  content: string[];
};

export const Content: React.FC <Props> = ({ content }) => {
  return (
    <div>
      {content.map((item) => (
        <p>
          { item }
        </p>
      ))}
    </div>
  );
};
