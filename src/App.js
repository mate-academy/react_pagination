import React from 'react';
import './styles/App.css';
import listTodos from './api/todos';
import users from './api/users';

import NumberOfTodos from './NumberOfTodos';
import TodosList from './TodosList';
import Navigation from './Navigation';

class App extends React.Component {
  state = {
    todos: [],
    perPage: 5,
    activePage: 1,
    todosInPages: [],
  };

  async componentDidMount() {
    await this.getTodos();

    this.getTodosOnPage();
  }

  getTodos = async() => {
    const todos = await listTodos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    this.setState({
      todos,
    });
  };

  changePerPage = async(event) => {
    const newPerPage = +event.target.value;
    const { perPage } = this.state;

    if (newPerPage === perPage) {
      return;
    }

    await this.setState({
      perPage: newPerPage,
    });

    this.getTodosOnPage();
  };

  changeActivePage = (activePage) => {
    this.setState({
      activePage,
    });
  };

  getTodosOnPage = () => {
    const { todos, perPage } = this.state;

    if (todos.length === 0) {
      return;
    }

    const todosInPages = [];
    const numberTodos = Math.ceil(todos.length / perPage);
    let pageNumber = 1;

    for (let i = 0; i < numberTodos * perPage; i += perPage) {
      todosInPages.push({
        pageNumber,
        content: todos.slice(i, i + perPage),
      });

      pageNumber += 1;
    }

    this.setState({ todosInPages });
  };

  render() {
    const {
      todos, todosInPages, perPage, activePage,
    } = this.state;

    const todosOfVisiblePage = todosInPages.find(
      page => page.pageNumber === activePage
    );

    return (
      (!todosOfVisiblePage)
        ? <h2>Load data</h2>
        : (
          <div className="App">
            <NumberOfTodos
              todosOfVisiblePage={todosOfVisiblePage}
              numberTodos={todos.length}
              perPage={perPage}
              changePerPage={this.changePerPage}
            />
            <TodosList
              todosOfVisiblePage={todosOfVisiblePage}
            />
            <Navigation
              todosInPages={todosInPages}
              activePage={activePage}
              changeActivePage={this.changeActivePage}
            />

          </div>
        )
    );
  }
}

export default App;
