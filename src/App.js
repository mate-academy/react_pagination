import React from 'react';
import Catalog from './Catalog';
import Paginator from './Paginator';
import './App.css';
import articles from './article';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pagesQtty: null,
      perPage: 6,
      withInfo: true,
    };
  }

  componentWillMount = () => {
    const pagesQtty = Math.ceil(articles.length / this.state.perPage);
    const pages = [];

    for (let i = 0; i < pagesQtty; i++) {
      pages[i] = articles.slice(i * this.state.perPage, (i + 1) * this.state.perPage);
    }

    this.setState({
      pages: [...pages],
      pagesQtty,
    });
  }

  perPageChange = (newPerPage) => {
    const pagesQtty = Math.ceil(articles.length / newPerPage);
    const pages = [];

    for (let i = 0; i < pagesQtty; i++) {
      pages[i] = articles.slice(i * newPerPage, (i + 1) * newPerPage);
    }

    this.setState({
      perPage: newPerPage,
      pagesQtty,
      pages: [...pages],
    });
  }

  render() {
    const { pages, pagesQtty, perPage, withInfo } = this.state;

    let currPage = this.props.match.params.num ? +this.props.match.params.num : 1;
    currPage = currPage <= pagesQtty && currPage > 0 ? currPage : 1;

    return (
      <div className="App">
        <h1>Paginating with Smile :-)</h1>

        <Catalog
          pages={pages}
          currPage={currPage}
        />

        <Paginator
          currPage={currPage}
          pagesQtty={pagesQtty}
          perPage={perPage}
          withInfo={withInfo}
          articlesQtty={articles.length}
          perPageChange={this.perPageChange}
        />
      </div>
    );
  }
}

export default App;
