import React, { Component, PropTypes } from 'react';

class TodoInput extends Component {

  static get defaultProps() {
    return {
      style: {width: 300, height: 30},
      placeholder: "请输入内容",
      onKeyDown:()=>{},
      onBlur:()=>{},
      autoFocus:true
    }
  }

  static propType = {
    style: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
    onKeyDown:PropTypes.func.isRequired,
    onBlur:PropTypes.func.isRequired,
    autoFocus:PropTypes.bool.isRequired
  }



  render() {
    // const {
    //   style,
    //   placeholder
    // } = this.props;
    return (
      <div>
        <input { ...this.props }/>
      </div>
    )
  }
}

module.exports = TodoInput;
