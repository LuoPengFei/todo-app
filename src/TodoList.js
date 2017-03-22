import React, { Component, PropTypes } from 'react';

import TodoItem from './TodoItem';

class TodoList extends Component {
  static get defaultProps() {
    return {
      todos: []
    }
  }

  static propsTypes = {
    todos: PropTypes.object.isRequired
  }

  render() {
    const {
      todos
    } = this.props;
    return (
    <ul>
      {
        todos.map((todo)=>{
          return (
            <li key={todo.id}>
              <TodoItem checked={todo.checked} title={todo.title} />
            </li>
          )
        })
      }
    </ul>
    )
  }
}

module.exports = TodoList;
