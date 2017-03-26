import TodoConstant from '../constants/TodoConstant';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import {ReduceStore} from 'flux/utils';


let _boxChange = (todos,id)=>{
  let newTodos = [...todos];
  let target = newTodos.find((todo)=>{
    return (todo.id===id);
  });
  target.checked = !target.checked;
  return newTodos;
}

let _deleteItem = (todos, id)=>{
  let newTodos = [...todos];

  let idx=newTodos.findIndex((todo)=>{
    return (todo.id===id);
  });
  newTodos.splice(idx, 1);
  return newTodos;
}

let _addItems = (todos, value)=>{
  let newTodos = [...todos];
  let id = newTodos.length===0 ? 100 : (newTodos[newTodos.length-1].id + 1);
  let item ={
    title:value,
    id:id,
    checked:false
  }
  newTodos.push(item);
  return newTodos;
}

let _editItem=(todos, id, value)=>{
  let newTodos = [...todos];
  let target = newTodos.find((todo)=>{
    return (todo.id===id);
  });
  console.log(value);
  console.log(target);
  target.title=value;
  return newTodos;
}

// 1.存储数据
// 2.View 获取数据必须来TodoStore

class TodoStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(todos, action) {
    switch (action.type) {
      case TodoConstant.TOGGLEITEM:
          return _boxChange( todos,action.id);
      case TodoConstant.EDITITEM:
          return _editItem( todos,action.id, action.title);
      case TodoConstant.DELETEITEM:
         return _deleteItem( todos,action.id);
      case TodoConstant.LOADDATA:
         return todos = action.todos;
      case  TodoConstant.CREATEITEM:
         return _addItems( todos, action.title);
      default:
         return todos;
        break;
    }
  }
}

module.exports = new TodoStore(TodoDispatcher);
