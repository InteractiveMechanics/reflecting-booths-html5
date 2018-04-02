import React, { Component } from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({active: !this.state.active});
  }

  render() {
    let style = "eyesfree-toggle"
    if (this.state.active){
      style = "eyesfree-toggle active"
    }
    return (
      <div className={style} onClick={this.handleClick}>
          <div className="logo"/> <div>
      </div>
    );
  }
}
