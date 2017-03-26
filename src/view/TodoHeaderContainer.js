import React, { Component } from 'react';
import TodoHeader from './TodoHeader';
import TodoStore from '../store/TodoStore';


class TodoHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:TodoStore.getState()
    }
  }
  render()
  {
    const {todos} = this.state;

    let todoCount = todos.filter((todo)=>{
      return !todo.checked;
    }).length;

    return (
      <TodoHeader name="老虎" count={todoCount} />
    )
  }

  componentDidMount() {
    this.addObserve = TodoStore.addListener(()=>{
      this.setState({
        todos: TodoStore.getState()
      });
    });
  }

  componentWillUnmount() {
    this.addObserve();
  }

}

module.exports = TodoHeaderContainer;
