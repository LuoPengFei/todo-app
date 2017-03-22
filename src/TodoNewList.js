import React, { Component, PropTypes } from 'react';

import TodoItem from './TodoItem';

class TodoNewList extends Component {
  static get defaultProps() {
    return {
      todos: [],
      boxChange:()=>{},
      deleteItem:()=>{},
      editItem:()=>{}
    }
  }

  static propsTypes = {
    todos: PropTypes.object.isRequired,
    boxChange: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired
  }

  render() {
    const {
      todos,
      boxChange,
      deleteItem,
      editItem
    } = this.props;
    return (
    <ul>
      {
        todos.map((todo)=>{
          return (
            <li key={todo.id}>
              <TodoItem
                id={todo.id}
                 checked={todo.checked}
                 title={todo.title}
                 boxChange={(id)=>{boxChange(id)}}
                 deleteItem={(id)=>{deleteItem(id)}}
                 editItem={(id, value)=>{editItem(id, value)}}
                 />
            </li>
          )
        })
      }
    </ul>
    )
  }
}

module.exports = TodoNewList;
