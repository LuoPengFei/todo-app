import React, {Component} from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoNewList from './TodoNewList';
import TodoAction from '../action/TodoAction';
import TodoStore from '../store/TodoStore';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:TodoStore.getTodos()
    }
  }

  render() {
    const {todos} = this.state;
    let todoCount = todos.filter((todo)=>{
      return !todo.checked;
    }).length;

    return (
      <div>
        <TodoHeader name="老虎" count={todoCount} />
        <TodoInput
          onKeyDown={(e)=>{
            if (e.keyCode===13) {
              // 回车键
              if (e.target.value.length) {
                this.setState({todos:TodoAction.createItem(e.target.value)});
                e.target.value='';
              } else {
                 alert('请先进行输入');
              }
            }
          }}
          />
        <TodoNewList
          todos={ todos }
          boxChange={TodoAction.toggleItemList}
          deleteItem={TodoAction.deleteItem}
          editItem={TodoAction.editItem}
          />
      </div>
    )
  }

  componentDidMount() {
    this.addObserve = TodoStore.addObserve(()=>{
      this.setState({
        todos: TodoStore.getTodos()
      });
    });
    TodoAction.loadData();
  }

  componentWillUnmount() {
    this.addObserve();
  }

}
module.exports = TodoApp;
