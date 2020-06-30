/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React from 'react';
import './App.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import Posts from './api/posts';
import { Pages } from './Pages';
import { PostsList } from './PostsList';

let direction = 'right';
const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('perPage') || 50;
  const page = searchParams.get('page') || 1;
  const lastIndex = +perPage * page;
  const startIndex = +perPage * (page - 1);
  const posts = Posts.slice(startIndex, lastIndex);
  const links = makeLinks(+page, Math.ceil(Posts.length / perPage), direction);

  if (links[2] !== links[1] + 1 && links.length === 3) {
    links.splice(2, 0, '...');
  }

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
        onChange={(ev) => {
          if (+page > Posts.length / ev.target.value) {
            searchParams.set('page', Posts.length / ev.target.value);
            searchParams.set('perPage', ev.target.value);
          } else {
            searchParams.set('perPage', ev.target.value);
          }

          history.push({
            search: searchParams.toString(),
          });
        }}
      >
        <option>100</option>
        <option>50</option>
        <option>15</option>
        <option>10</option>
      </select>
      <h3>{`Total number of posts per this page ${posts.length}`}</h3>
      <PostsList posts={posts} perPage={perPage} page={page} />
      <Pages links={links} changePage={changePage} />

    </div>
  );
};

function makeLinks(current, last, way) {
  if (last < 4) {
    const links = [];

    for (let i = 1; i <= last; i++) {
      links.push(i);
    }

    return links;
  }

  if (+current >= last - 1) {
    return [last - 2, last - 1, last];
  }

  if (way === 'right') {
    return [+current, +current + 1, last];
  }

  return (current <= 2)
    ? [1, 2, last]
    : [current - 1, current, last];
}

export default App;
