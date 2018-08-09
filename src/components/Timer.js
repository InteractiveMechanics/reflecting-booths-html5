import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: props.seconds, totalTime: props.seconds, secondTimer: false, delay:props.delay };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.stopRecording = props.stopRecording;
    this.time1 = this.time1.bind(this);
    this.time2 = this.time2.bind(this);
    console.log(props.content);
    this.startText = props.content.timerStart[props.language];
    this.timerText = props.content.timerText[props.language];
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
    if(this.state.delay){
      setTimeout(()=> {
        this.startTimer();
      }, this.state.delay);
    } else {
      this.startTimer();
    }

  }

  startTimer() {
    if (this.timer === 0) {
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
    if (seconds < 0) {
      if (!this.state.secondTimer){
        clearInterval(this.timer);
        this.setState({
          time: this.secondsToTime(120),
          seconds: 120,
          totalTime: 120,
          secondTimer: true

        });
        this.timer= 0;
        this.startTimer();
      } else{
        clearInterval(this.timer);
        this.stopRecording();
      }

    }
  }


time1() {
  let time = this.state.time.m+":"+this.state.time.s;
  return time
}

time2() {
  let time = this.state.time.s;
  return time
}


  render() {
    let time = null;
    let content = null;
    let percentage = ((this.state.totalTime-this.state.seconds)/this.state.totalTime)*100;

    if(!this.state.secondTimer){
      time = this.time2;
      content = this.startText;
    } else {
      time = this.time1;
      content = this.timerText;
    }




    return(
      <div className="timer">
        <h1>{content}</h1>
        <div className="timer-progress">
          <CircularProgressbar
                  {...this.props}
                  percentage={percentage}
                  textForPercentage={time}
                  strokeWidth={14}
                  background={true}
                  backgroundPadding={-7}
                  counterClockwise={false}
                />
        </div>
      </div>

    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  stopRecording: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  delay: PropTypes.number
};
export default Timer;
