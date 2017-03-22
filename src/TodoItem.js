import React, { Component, PropTypes } from 'react';
import TodoInput from './TodoInput';


class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit:false
    }
  }
  static get defaultProps(){
    return {
      title: "--",
      checked: false,
      id: 100,
      boxChange:()=>{},
      deleteItem:()=>{},
      editItem: ()=>{}
    }
  }

  static propsType = {
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    boxChange: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired
  }

  changeEditMode=()=>{
    this.setState({
      edit: !this.state.edit
    })
  }

  readDefault=()=>{
    const {
      title,
      checked,
      id,
      boxChange,
      deleteItem,
      editItem
    } = this.props;
    return (
      <div>
        <input
         type='checkbox'
         checked={checked}
         onChange={
           ()=>{
             boxChange(id);
           }
         }
         />
        <span
          onDoubleClick={
            ()=>{
              this.changeEditMode();
            }
          }
          > { title } </span>
        <button
          onClick={
            ()=>{
            deleteItem(id);
          }
        }
          >x</button>
      </div>
    )
  }

  editMode=()=>{
    const {
      title,
      checked,
      id,
      boxChange,
      deleteItem,
      editItem
    } = this.props;
    return (
      <div>
        <TodoInput
          defaultValue={ title }
          style={{width:300, height:30}}
          onKeyDown={
            (e)=>{
              if (e.keyCode === 13) {
                this.changeEditMode();
                if (e.target.value.length) {
                  editItem(id, e.target.value);
                }
              }
            }
          }/>
      </div>
    )
  }



  render() {
    return (this.state.edit ? this.editMode() : this.readDefault())
  }
}

module.exports = TodoItem;
