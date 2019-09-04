import React from 'react';
import propTypes from 'prop-types';

const TodosList = ({ todosOfVisiblePage }) => (
  <div className="todos-list">
    {
      todosOfVisiblePage.content.map(todo => (
        <div className="todos-list__item">
          <div className="todos-item__info">
            <label htmlFor={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.completed ? 'checked' : false}
                className="todo-item__completed"
              />
            </label>
            <h3>{todo.title}</h3>
          </div>
          <ul className="todos-item__user">
            <li>
              Name:
              {todo.user.name}
            </li>
            <li>
              Username:
              {todo.user.username}
            </li>
            <li>
              Email:
              {todo.user.email}
            </li>
          </ul>
        </div>
      ))
    }
  </div>
);

TodosList.propTypes = {
  todosOfVisiblePage: propTypes.shape().isRequired,
};

export default TodosList;
