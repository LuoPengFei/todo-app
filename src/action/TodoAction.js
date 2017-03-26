import TodoDispatcher form '../dispatcher/TodoDispatcher';
import TodoConstant from '../constants/TodoConstant';

let TodoAction = {
  toggleItemList(id) {
    TodoDispatcher.dispatch({
      id,
      type: TodoConstant.TOGGLEITEM
    });
  },

  deleteItem(id) {
    TodoDispatcher.dispatch({
      id,
      type: TodoConstant.DELETEITEM
    });

  },

  createItem(title) {
    TodoDispatcher.dispatch({
      title,
      type:TodoConstant.CREATEITEM
    });
  },

  editItem(id, title) {
    TodoDispatcher.dispatch({
      id,
      title,
      type: TodoConstant.EDITITEM
    });
  },

  loadData() {
    fetch("todo.json")
    .then((data)=>data.json())
    .then((todos)=>{
      TodoDispatcher.dispatch({
        todos,
        type: TodoConstant.LOADDATA
      });
    })
  }
}

module.exports = TodoAction;
