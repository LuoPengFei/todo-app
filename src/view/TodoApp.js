import React, {Component} from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoNewList from './TodoNewList';
import TodoAction from '../action/TodoAction';
import TodoStore from '../store/TodoStore';
import TodoHeaderContainer from './TodoHeaderContainer';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:TodoStore.getState()
    }
  }

  render() {
    const {todos} = this.state;
    return (
      <div>
        <TodoHeaderContainer />
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
    this.addObserve = TodoStore.addListener(()=>{
      this.setState({
        todos: TodoStore.getState()
      });
    });
    TodoAction.loadData();
  }

  componentWillUnmount() {
    this.addObserve();
  }

}
module.exports = TodoApp;
