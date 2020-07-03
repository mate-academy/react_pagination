import React from 'react';
import './App.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import Posts from './api/posts';
import { Pages } from './Pages';
import { PostsList } from './PostsList';
import { handleChanges } from './HandleChanges';
import { showPosts } from './showPosts';

let direction = 'right';

const App = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const perPage = searchParams.get('perPage') || 50;
  const page = searchParams.get('page') || 1;
  const visiblePosts = showPosts(+perPage, page, Posts);

  const changePage = (link) => {
    if (direction === 'left' && link === +page - 1) {
      direction = 'left';
    } else {
      direction = (link <= +page && direction !== 'left')
        ? 'left'
        : 'right';
    }

    searchParams.set('perPage', perPage);
    searchParams.set('page', link);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <div className="container">
      <select
        value={perPage}
        onChange={ev => handleChanges(
          page, Posts.length, ev.target.value, searchParams, history,
        )}
      >
        <option>50</option>
        <option>15</option>
        <option>10</option>
      </select>
      <h3>{`Total number of posts per this page ${visiblePosts.length}`}</h3>
      <PostsList posts={visiblePosts} perPage={+perPage} page={+page} />
      <Pages
        changePage={changePage}
        page={page}
        length={Posts.length}
        perPage={perPage}
        direction={direction}
      />
    </div>
  );
};

export default App;
