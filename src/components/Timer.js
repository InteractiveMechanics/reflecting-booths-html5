import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-progress-circle';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: props.seconds, totalTime: props.seconds };
    this.timer = 0;
    this.secondTimer = false;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.stopRecording = props.stopRecording;
    this.time = this.time.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    seconds = ('0' + seconds).slice(-2);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  // componentWillMount(props) {
  //   this.setState({ time: {}, seconds: props.seconds });
  // }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }


  countDown(props) {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      if (!this.secondTimer){
        this.secondTimer = true;
        clearInterval(this.timer);
        this.setState({
          time: {},
          seconds: 120,
          totalTime: 120

        });
        this.timer= 0;
        this.startTimer();
      } else{
        clearInterval(this.timer);
        this.stopRecording();
      }

    }
  }


time() {
  let time = this.state.time.m+":"+this.state.time.s;
  return time
}


  render() {
    var percentage = (this.state.seconds/this.state.totalTime)*100;

    return(
      <div className="timer-progress">
        <CircularProgressbar
                {...this.props}
                percentage={percentage}
                textForPercentage={this.time}
                strokeWidth={18}

              />
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  stopRecording: PropTypes.func.isRequired
};
export default Timer;
