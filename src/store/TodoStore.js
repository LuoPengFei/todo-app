import TodoConstant from '../constants/TodoConstant';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import EventEmitter from 'events';

const TODOS_CHANGE='todo_changes';
const _emitter = new EventEmitter();

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

let todos = [];
// 1.存储数据
// 2.View 获取数据必须来TodoStore

let TodoStore = {
  getTodos() {
    return todos;
  },
  addObserer(callBack) {
    _emitter.on(TODOS_CHANGE, callBack);
    return ()=>_emitter.removeListener(TODOS_CHANGE, callBack);
  },
  _dispatchToken: TodoDispatcher.register((action)=>{
    console.log(action);
    switch (action.type) {
      case TodoConstant.TOGGLEITEM:
          _boxChange( todos,action.id);
          break;
      case TodoConstant.EDITITEM:
          _editItem( todos,action.id, action.title);
          break;
      case TodoConstant.DELETEITEM:
         _deleteItem( todos,action.id);
         break;
      case TodoConstant.LOADDATA:
         todos = action.todos;
         break;
      case  TodoConstant.CREATEITEM:
         _addItems( todos, title);
         break;
      default:
        break;
    }
    _emitter.emit(TODOS_CHANGE);
  })
}

module.exports = TodoStore;
