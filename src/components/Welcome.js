import React, { Component } from 'react';
import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz';
import QuestionCount from '../components/QuestionCount';
import Next from '../components/Next';
import Result from '../components/Result';
import update from 'immutability-helper';
import Teleprompter from '../components/Teleprompter';
import Touchscreen from '../components/Touchscreen';
import data from '../data';

import { states } from '../components/States.js';

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext(event) {
    console.log(data.settings);
    this.props.next(data.settings);
  }

  render() {
    return(
      <div>
      <div id='touchscreen' onClick={this.handleNext}>
      <h3>welcome to the</h3>
      <h2>Recording Booth</h2>
      <p>Tap anywhere to begin</p>
      </div>

      <div id='teleprompter'>
      <video src="../Assets/Video/AttractScreen_v01.mp4" type="video/mp4" ></video>
      </div>


      </div>
    );
  }
}
