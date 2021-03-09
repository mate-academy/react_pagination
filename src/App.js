import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pagination } from './components/Pagination';

const postFromServer = Array(42).fill(1).map((el, index) => el + index);

class App extends React.Component {
  state = {
    selectedPage: 1,
    perPages: 5,
    totalPosts: [...postFromServer],
    post: 1,
  }

  onPageChange = (event) => {
    const { textContent } = event.target;
    let p;

    if (textContent > +this.state.selectedPage) {
      p = this.state.post + this.state.perPages;
    } else {
      p = this.state.post - this.state.perPages;
    }

    this.setState({
      selectedPage: textContent,
      post: p,
    });
  }

  onPerPageChange = (event) => {
    const { value } = event.target;

    this.setState({
      perPages: +value,
      selectedPage: 1,
      post: 1,
    });
  }

  onNext = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage + 1,
      post: state.post + state.perPages,
    }));
  }

  onPrev = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage - 1,
      post: state.post - state.perPages,
    }));
  }

  render() {
    const { selectedPage, totalPosts, perPages, post } = this.state;

    return (
      <div className="text-center">
        <h1>
          Page
          {' '}
          {selectedPage}
          {'/'}
          {Math.ceil(totalPosts.length / perPages)}
        </h1>
        <Pagination
          {...this.state}
          onPageChange={this.onPageChange}
          onPerPageChange={this.onPerPageChange}
          onNext={this.onNext}
          onPrev={this.onPrev}
        />
        <p>
          {`Post ${post}-${post + (perPages - 1) < totalPosts.length
            ? post + (perPages - 1)
            : (totalPosts.length - post) + post} of ${totalPosts.length}`}
        </p>
      </div>
    );
  }
}

export default App;
