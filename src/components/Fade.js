import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';


class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, loop:props.loop, class:props.class, animate: 'fade'};
    this.array = props.array;
    this.animate = true;
  }


  componentDidMount(props) {
    this.progressSlideshow(props);
  }

  progressSlideshow(props) {
    setTimeout(function () {
      if (this.state.activeIndex < this.array.length-1 ){
        this.setState({ activeIndex: this.state.activeIndex+1, animate: 'fade fade-enter' });
        setTimeout(function (){
            this.setState({ animate: 'fade fade-exit'})
          }.bind(this), 3000)
      } else if (this.state.loop === true) {
        this.setState({ activeIndex: 0, animate: 'fade fade-enter' });
        setTimeout(function (){
            this.setState({ animate: 'fade fade-exit'})
          }.bind(this), 3000)
      }
      this.progressSlideshow();
    }.bind(this), 4000);
  }

render() {

  return (
      <div className={this.state.animate}>
                    <h4 className={this.state.class}>{this.array[this.state.activeIndex]}</h4>
            </div>
  );
}
}

Fade.propTypes = {
  content: PropTypes.string,
  array: PropTypes.array.isRequired,
  loop: PropTypes.bool,
  class: PropTypes.string
};

export default Fade;
