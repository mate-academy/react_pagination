import React from 'react';

const Catalog = (props) => {
  const { pages, currPage } = props;

  return (
    <div className="catalog">
      {pages[currPage - 1].map(article => (
        <article key={article.id} className="article">
          <h4>{article.title}</h4>
          <img className="artImage" src={article.pic} alt="" />
          <div>
            <p>{article.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Catalog;
