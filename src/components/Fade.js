import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loop:props.loop,
      class:props.class,
      animate: 'fade fade-exit',
      duration: props.duration,
      delay: props.delay,
      stop: props.stop,
      endDelay: props.endDelay
    };
    this.array = props.array;
    this.animate = true;
  }


  componentDidMount(props) {
    setTimeout(function(){
      this.setState({ animate: 'fade fade-enter'});
      setTimeout(function(){
        this.setState({ animate: 'fade fade-exit'});
        setTimeout(function(){
          this.progressSlideshow(props);
        }.bind(this), 1000);
      }.bind(this), this.state.duration);
    }.bind(this), this.state.delay+1000);

  }

  progressSlideshow(props) {
    if (this.state.endDelay) {
      if (this.state.activeIndex < this.array.length-1){
        this.setState({ activeIndex: this.state.activeIndex+1, animate: 'fade fade-enter' });
        if(this.state.activeIndex === this.array.length-2){
          setTimeout(function (){
            this.setState({ animate: 'fade fade-exit'})
          }.bind(this), (this.state.duration-1000))

          setTimeout(function () {
            this.progressSlideshow();
          }.bind(this), this.state.duration+this.state.endDelay);

        } else {
          setTimeout(function (){
            this.setState({ animate: 'fade fade-exit'})
          }.bind(this), (this.state.duration-1000))

          setTimeout(function () {
            this.progressSlideshow();
          }.bind(this), this.state.duration);
        }

      } else if (this.state.loop === true) {
        this.setState({ activeIndex: 0, animate: 'fade fade-enter' });
        setTimeout(function (){
          this.setState({ animate: 'fade fade-exit'})
        }.bind(this), (this.state.duration-1000))

        setTimeout(function () {
          this.progressSlideshow();
        }.bind(this), this.state.duration);
      }
    } else {
      if (this.state.activeIndex < this.array.length-1){
        this.setState({ activeIndex: this.state.activeIndex+1, animate: 'fade fade-enter' });
        if(this.state.stop && (this.state.activeIndex === this.array.length-1)){

        } else {
          setTimeout(function (){
            this.setState({ animate: 'fade fade-exit'})
          }.bind(this), (this.state.duration-1000))

          setTimeout(function () {
            this.progressSlideshow();
          }.bind(this), this.state.duration);
        }

      } else if (this.state.loop === true) {
        this.setState({ activeIndex: 0, animate: 'fade fade-enter' });
        setTimeout(function (){
          this.setState({ animate: 'fade fade-exit'})
        }.bind(this), (this.state.duration-1000))

        setTimeout(function () {
          this.progressSlideshow();
        }.bind(this), this.state.duration);
      }
    }

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
  class: PropTypes.string,
  duration: PropTypes.number.isRequired,
  delay: PropTypes.number,
  stop: PropTypes.bool,
  endDelay: PropTypes.number
};

export default Fade;
