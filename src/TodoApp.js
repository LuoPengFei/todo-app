import React, {Component} from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoNewList from './TodoNewList';

let _boxChange = (todos,id)=>{
  let target = todos.find((todo)=>{
    return (todo.id===id);
  });
  target.checked = !target.checked;
  return todos;
}

let _deleteItem = (todos, id)=>{
  let idx=todos.findIndex((todo)=>{
    return (todo.id===id);
  });
  todos.splice(idx, 1);
  return todos;
}

let _addItems = (todos, value)=>{
  let id = todos.length===0 ? 100 : (todos[todos.length-1].id + 1);
  let item ={
    title:value,
    id:id,
    checked:false
  }
  todos.push(item);
  return todos;
}

let _editItem=(todos, id, value)=>{
  let target = todos.find((todo)=>{
    return (todo.id===id);
  });
  console.log(value);
  console.log(target);
  target.title=value;
  return todos;
}


class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[]
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
                this.setState({todos:_addItems(todos, e.target.value)});
                e.target.value='';
              } else {
                 alert('请先进行输入');
              }
            }
          }}
          />
        <TodoNewList
          todos={ todos }
          boxChange={(id)=>{
            /// 一定要setState
            this.setState({todos:_boxChange(todos, id)});
          }}
          deleteItem={(id)=>{
            this.setState({todos:_deleteItem(todos, id)});
          }}
          editItem={(id, value)=>{
            this.setState({todos:_editItem(todos, id, value)});
          }}
          />
      </div>
    )
  }

  componentDidMount() {
    fetch("todo.json")
    .then((data)=>{
      console.log(data.json());
      return data.json();
    })
    .then((todos)=>{
      console.log(todos);
      this.setState({todos});
    })
  }

}
module.exports = TodoApp;
