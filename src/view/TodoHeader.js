import React, { Component, PropTypes } from 'react';

class TodoHeader extends Component {
  static get defaultProps() {
    return {
      name: "--",
      count: 0
    };
  }

  static propsTypes = {
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }

  render() {

    const {
      name,
      count
    } = this.props;
    return (
      <div>
        <h1>我的待办清单</h1>
        <p>
          Hello, {name},您有{count}项未办事项。
        </p>
      </div>
    );
  }
}

module.exports = TodoHeader;
