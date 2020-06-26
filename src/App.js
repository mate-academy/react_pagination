/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { GenerateLink } from './GenerateLink/GenerateLInk';
import { GeneratePage } from './GeneratePage/GeneratePage';
import Posts from './api/posts';

class App extends React.Component {
  state = {
    postList: [[...Posts]],
    numberOfPosts: 100,
    urls: rebuildAllPages(100).urls,
    links: rebuildAllPages(100).buttons,

  }

  numberProcessing = (ev) => {
    ev.persist();
    const lists = rebuildAllPages(+ev.target.value);

    return (this.setState(prevState => ({
      numberOfPosts: +ev.target.value,
      postList: lists.list,
      urls: lists.urls,
      links: lists.buttons,
    })));
  }

  render() {
    return (
      <section>
        <select
          defaultValue={this.state.numberOfPosts}
          onChange={ev => this.numberProcessing(ev)}
        >
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>100</option>
        </select>
        <Router>
          <div>
            <Switch>
              {
                this.state.urls.map((url, i) => {
                  return (
                    <Route key={url} exact path={url}>
                      <GeneratePage path={url} posts={this.state.postList[i]} />
                    </Route>
                  );
                })
              }
            </Switch>
            <ul className="links_list">
              {
                this.state.links.map(
                  (option, i) => {

                    return (
                      <GenerateLink
                        key={option}
                        url={this.state.urls[i]}
                        name={this.state.links[i]}
                        posts={this.state.postList[i]}
                      />
                    );
                  },
                )
              }
            </ul>
          </div>
        </Router>
      </section>
    );
  }
}

function rebuildAllPages(value) {
  const rebuildedList = [];
  let tempList = [];
  const urlsList = [];
  let tempValue = 1;
  let counter = value;
  const buttons = [];
  let buttonNumber = 1;

  for (let i = 0; i < Posts.length; i++) {
    tempList.push(Posts[i]);
    if (counter <= 1) {
      counter = value;
      rebuildedList.push(tempList);
      tempList = [];
      urlsList.push(`/items${tempValue}-${i + 1}`);
      tempValue = i + 2;
      buttons.push(buttonNumber);
      buttonNumber++;
    } else {
      counter--;
    }

    if (i === Posts.length - 1 && tempList.length !== 0) {
      rebuildedList.push(tempList);
      urlsList.push(`/items${tempValue}-${i + 1}`);
    }
  }

  return {
    list: rebuildedList,
    urls: urlsList,
    buttons,
  };
}

export default App;
