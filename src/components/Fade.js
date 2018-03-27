import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, loop:props.loop, class:props.class};
    this.array = props.array;
  }


  componentDidMount() {
    this.progressSlideshow();
  }

  progressSlideshow(props) {
    setTimeout(function () {
      if (this.state.activeIndex < this.array.length-1){
        this.setState({ activeIndex: this.state.activeIndex+1 })
      } else if (this.state.loop) {
        this.setState({ activeIndex: 0 })
      } else{
        this.setState({ activeIndex: this.state.activeIndex+1 })
      }
      this.progressSlideshow();
    }.bind(this), 3000);
  }

render() {
  return (
      <CSSTransition
               in={true}
               classNames="fade"
               appear={true}
               timeout={5000}>
                    <h4 className={this.state.class}>{this.array[this.state.activeIndex]}</h4>
            </CSSTransition>
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
