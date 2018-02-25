import React, { Component } from 'react';
import './App.css';
import { states }  from './components/States.js';
import { UiSettings, Questions, Record, Submit, Confirm, About } from './components/Steps.js';
import quizQuestions from './api/quizQuestions';
import Teleprompter from './components/Teleprompter';
import Touchscreen from './components/Touchscreen';
import { Welcome } from './components/Welcome.js'
import data from './data';
import Next from './components/Next';
import Back from './components/Back';
import Keyboard from 'react-virtual-keyboard';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 'attract',
      language: 'english',
      eyesFree: false,
      name: '',
      email: '',
      location: '',
      counter: 0,
      questionId: 1,
      nextQuestionId: 0,
      question: '',
      answerOptions: [],
      answer: '',
      teleprompter: {},
      touchscreen: {},
      keyboard: {},
      input: "",
      buttonClass: "small",
    };

  }


  componentWillMount() {
    this.setState({
      touchscreen: data['attract']["touchscreen"],
      teleprompter: data['attract']["teleprompter"],
      buttonClass: "small"
    });
  }

  transition(action) {
    const currentGalleryState = this.state.currentState;
    const nextGalleryState = data[currentGalleryState][action.type];
    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action);

      this.setState({
        currentState: nextGalleryState,
        ...nextState // extended state
      });
    }
  }

  command(nextState, action) {
    switch (nextState) {
      case 'attract':
      return {
        teleprompter: data['attract']["teleprompter"],
        touchscreen: data['attract']["touchscreen"]
      };
      break;

      case 'welcome':
      return {
        teleprompter: data['welcome']["teleprompter"],
        touchscreen: data['welcome']["touchscreen"]
      };
      break;

      case 'language':
      return {
        teleprompter: data['language']["teleprompter"],
        touchscreen: data['language']["touchscreen"]
      };
      break;

      case 'about-1':
      return {
        teleprompter: data['about-1']["teleprompter"],
        touchscreen: data['about-1']["touchscreen"]
      };
      break;

      case 'about-2':
      return {
        teleprompter: data['about-2']["teleprompter"],
        touchscreen: data['about-2']["touchscreen"]
      };
      break;

      case 'questions':
      return {
        teleprompter: data['questions']["teleprompter"],
        touchscreen: data['questions']["touchscreen"]
      };
      break;

      case 'record-intro-1':
      return {
        teleprompter: data['record-intro-1']["teleprompter"],
        touchscreen: data['record-intro-1']["touchscreen"]
      };
      break;

      case 'record-intro-2':
      return {
        teleprompter: data['record-intro-2']["teleprompter"],
        touchscreen: data['record-intro-2']["touchscreen"]
      };
      break;

      case 'recording':
      return {
        teleprompter: data['recording']["teleprompter"],
        touchscreen: data['recording']["touchscreen"]
      };
      break;

      case 'review':
      return {
        teleprompter: data['review']["teleprompter"],
        touchscreen: data['review']["touchscreen"]
      };
      break;

      case 'user-agreement':
      return {
        teleprompter: data['user-agreement']["teleprompter"],
        touchscreen: data['user-agreement']["touchscreen"]
      };
      break;

      case 'user-agreement-warning':
      return {
        teleprompter: data['user-agreement-warning']["teleprompter"],
        touchscreen: data['user-agreement-warning']["touchscreen"]
      };
      break;

      case 'first-name':
      return {
        teleprompter: data['first-name']["teleprompter"],
        touchscreen: data['first-name']["touchscreen"],
        keyboard: data['first-name']["keyboard"]
      };
      break;

      case 'last-name':
      return {
        teleprompter: data['last-name']["teleprompter"],
        touchscreen: data['last-name']["touchscreen"]
      };
      break;

      case 'email':
      return {
        teleprompter: data['email']["teleprompter"],
        touchscreen: data['email']["touchscreen"]
      };
      break;

      case 'location':
      return {
        teleprompter: data['location']["teleprompter"],
        touchscreen: data['location']["touchscreen"]
      };
      break;

      case 'age':
      return {
        teleprompter: data['age']["teleprompter"],
        touchscreen: data['age']["touchscreen"]
      };
      break;

      case 'end':
      return {
        teleprompter: data['end']["teleprompter"],
        touchscreen: data['end']["touchscreen"]
      };
      break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.persist();
    e.preventDefault();

    this.transition({ type: 'NEXT', query: this.state.query });
  }

  handleChangeQuery(value) {
    this.setState({ query: value })
  }

  renderNextButton(state) {
    var btnClass = "next-button-" + this.state.buttonClass;
    return (
      <Next class={btnClass} onClicked={() => this.transition({ type: 'next' })}/>
    );
  }

  renderBackButton(state) {
    var btnClass = "back-button-" + this.state.buttonClass;

      return (
        <Back class={btnClass} onClicked={() => this.transition({ type: 'back' })}/>
      );
  }

  renderTeleprompter(state) {

    return (
      <Teleprompter content={state}/>
    );
  }
  renderTouchscreen(state) {

    return (
      <Touchscreen content={state}/>
    );
  }

  onInputChanged = (data) => {
  this.setState({ input: data });
}

onInputSubmitted = (data) => {
  console.log("Input submitted:", data);
}
  renderKeyboard(settings) {
    if(settings.language){
      return (
        <Keyboard
          value={this.state.input}
          name='keyboard'
          options={{
            type:"input",
            layout: "qwerty",
            alwaysOpen: true,
            usePreview: false,
            useWheel: false,
            stickyShift: false,
            appendLocally: true,
            color: "light",
            updateOnChange: true,
            initialFocus: true,
            display: {
              "accept" : "Submit"
            }
          }}
          onChange={this.onInputChanged}
          onAccepted={this.onInputSubmitted}
          ref={k => this.keyboard = k}
        />
      );
    }



  }

  render() {
    const currentState = this.state.currentState;
    const teleprompterContent = this.state.teleprompter;
    const touchscreenContent = this.state.touchscreen;
    const keyboardSettings = this.state.keyboard;


    return (
      <div className="ui-app" data-state={currentState}>
        <div id="touchscreen">
          {this.renderTouchscreen(touchscreenContent)}
          {this.renderKeyboard(keyboardSettings)}
          {this.renderBackButton(currentState)}
          {this.renderNextButton(currentState)}
        </div>
        <div id="teleprompter">
          {this.renderTeleprompter(teleprompterContent)}
        </div>
      </div>
    );
  }

}

export default App;
