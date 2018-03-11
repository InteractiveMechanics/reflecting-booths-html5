import React, { Component } from 'react';
import './App.css';
import './Keyboard.css';
import { Questions } from './components/Questions.js';
import Teleprompter from './components/Teleprompter';
import Touchscreen from './components/Touchscreen';
import data from './data';
import Next from './components/Next';
import QuestionNext from './components/Next';
import Back from './components/Back';
import Agree from './components/Agree';
import Disagree from './components/Disagree';
import Delete from './components/Delete';
import Save from './components/Save';
import RecordButton from './components/RecordButton';
import RecordStop from './components/RecordStop';
import RecordAgain from './components/RecordAgain';
import Language from './components/Language';
import LanguageSelect from './components/LanguageSelect';
import EyesFree from './components/EyesFree';
import Keyboard from 'react-virtual-keyboard';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import QuestionCount from './components/QuestionCount';
import Result from './components/Result';
import update from 'immutability-helper';
import Timer from './components/Timer';
import Home from './components/Home';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 'attract',
      language: 'English',
      eyesFree: false,
      firstname: '',
      lastname: '',
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
      age: "",
      prompt: "",
      customLayout : {
        'normal': [
                          '1 2 3 4 5 6 7 8 9 0 {b}',
                          'Q W E R T Y U I O P',
                          'A S D F G H J K L {accept:Accept}',
                          'Z X C V B N M , . \'',
                          '{accept:Accept} {space} {left} {right} {undo:Undo} {redo:Redo} -'
                      ]
      	}
    };

    this.handleLanguageSelected = this.handleLanguageSelected.bind(this);
    this.setNewQuestion = this.setNewQuestion.bind(this);
    this.handleQuestionNext = this.handleQuestionNext.bind(this);
    //this.handleInputNext = this.handleInputNext.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAgeSelected = this.handleAgeSelected.bind(this);
    this.handleRecordingStop = this.handleRecordingStop.bind(this);

  }


  componentWillMount() {
    this.setState({
      touchscreen: data['attract']["touchscreen"],
      teleprompter: data['attract']["teleprompter"],
      buttonClass: "small",
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers
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
        teleprompter: data[nextState]["teleprompter"],
        touchscreen: data[nextState]["touchscreen"],
        buttonClass: data[nextState]["buttonclass"]
      };

      case 'welcome':
      return {
        teleprompter: data[nextState]["teleprompter"],
        touchscreen: data[nextState]["touchscreen"],
        buttonClass: data[nextState]["buttonclass"],

      };

      case 'language':
      return {
        teleprompter: data['language']["teleprompter"],
        touchscreen: data['language']["touchscreen"],
        buttonClass: data['language']["buttonclass"]
      };

      case 'about-1':
      return {
        teleprompter: data['about-1']["teleprompter"],
        touchscreen: data['about-1']["touchscreen"],
        buttonClass: data['about-1']["buttonclass"]
      };

      case 'about-2':
      return {
        teleprompter: data['about-2']["teleprompter"],
        touchscreen: data['about-2']["touchscreen"],
        buttonClass: data['about-2']["buttonclass"]
      };

      case 'questions':
      return {
        teleprompter: {
        heading: quizQuestions[0].question
      },
        touchscreen: data['questions']["touchscreen"],
        buttonClass: data['questions']["buttonclass"],
        question: quizQuestions[0].question,
        answerOptions: quizQuestions[0].answers

      };

      case 'record-intro-1':
      return {
        teleprompter: data['record-intro-1']["teleprompter"],
        touchscreen: data['record-intro-1']["touchscreen"],
        buttonClass: data['record-intro-1']["buttonclass"]
      };

      case 'record-intro-2':
      return {
        teleprompter: data['record-intro-2']["teleprompter"],
        touchscreen: data['record-intro-2']["touchscreen"],
        buttonClass: data['record-intro-2']["buttonclass"]
      };

      case 'recording':
      return {
        teleprompter: {
          heading: data['recording']["teleprompter"]["heading"],
          prompt:this.state.prompt
        },
        touchscreen: data['recording']["touchscreen"]
      };

      case 'review':
      return {
        teleprompter: data['review']["teleprompter"],
        touchscreen: data['review']["touchscreen"],
        buttonClass: data['review']["buttonclass"]
      };

      case 'user-agreement':
      return {
        teleprompter: data['user-agreement']["teleprompter"],
        touchscreen: data['user-agreement']["touchscreen"],
        buttonClass: data['user-agreement']["buttonclass"]
      };

      case 'user-agreement-warning':
      return {
        teleprompter: data['user-agreement-warning']["teleprompter"],
        touchscreen: data['user-agreement-warning']["touchscreen"],
        buttonClass: data['user-agreement-warning']["buttonclass"]
      };

      case 'first-name':
      return {
        teleprompter: data['first-name']["teleprompter"],
        touchscreen: data['first-name']["touchscreen"],
        keyboard: data['first-name']["keyboard"],
        buttonClass: data['first-name']["buttonclass"]
      };

      case 'last-name':
      return {
        teleprompter: data['last-name']["teleprompter"],
        touchscreen: data['last-name']["touchscreen"],
        keyboard: data['last-name']["keyboard"],
        buttonClass: data['last-name']["buttonclass"]
      };

      case 'email':
      return {
        teleprompter: data['email']["teleprompter"],
        touchscreen: data['email']["touchscreen"],
        keyboard: data['email']["keyboard"],
        buttonClass: data['email']["buttonclass"]
      };

      case 'location':
      return {
        teleprompter: data['location']["teleprompter"],
        touchscreen: data['location']["touchscreen"],
        keyboard: data['location']["keyboard"],
        buttonClass: data['location']["buttonclass"]
      };

      case 'age':
      return {
        teleprompter: data['age']["teleprompter"],
        touchscreen: data['age']["touchscreen"],
        keyboard: data['age']["keyboard"],
        buttonClass: data['age']["buttonclass"]
      };

      case 'end':
      return {
        teleprompter: data['end']["teleprompter"],
        touchscreen: data['end']["touchscreen"],
        buttonClass: data['end']["buttonclass"]
      };
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.persist();
    e.preventDefault();

    this.transition({ type: 'NEXT', query: this.state.query });
  }

  handleLanguageSelected(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  renderLanguageSelect(state) {
    if(state === "language"){
      var languages = data['language']["languages"];
      return (
        <LanguageSelect
        language={this.state.language}
        languageOptions={languages}
        onLanguageSelected={this.handleLanguageSelected}/>
      );
    }
  }

  setNextQuestion() {
    if (this.state.nextQuestionId === 'record-intro-1'){
      this.setState({
        currentState: 'record-intro-1'

      })
    } else{
      const counter = this.state.counter + 1;
      const questionId = this.state.nextQuestionId;
      this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[questionId].question,
        answerOptions: quizQuestions[questionId].answers,
        answer: '',
        teleprompter: {
          heading: quizQuestions[questionId].question,
        },
        nextQuestionId: null
      });
    }

  }

  doNothing() {
    console.log('please choose an answer');
  }

  renderNextButton(state, buttonclass) {
    if (state === 'questions'){
    if (this.state.nextQuestionId === 'record-intro-1'){
      return(
        <Next class="next-button-small" onClicked={() => this.transition({ type: 'next' })}/>
      )
    }else if(this.state.answer.length >0){
        return(
          <Next class="next-button-small" onClicked={() => this.setNextQuestion()}/>
        )
      }else{
        return(
          <Next class="next-button-small-inactive" onClicked={this.doNothing()}/>
        )
      }

    }

    //dirty
    if (state === 'first-name'){
      if (this.state.firstname.length > 0){
        return(
          <Next class="next-button-small" onClicked={() => this.transition({ type: 'next' })}/>
        )
      }else {
        return(
          <Next class="next-button-small-inactive" onClicked={this.doNothing()}/>
        )
      }
    }
    if (state === 'last-name'){
      if (this.state.lastname.length > 0){
        return(
          <Next class="next-button-small" onClicked={() => this.transition({ type: 'next' })}/>
        )
      }else {
        return(
          <Next class="next-button-small-inactive" onClicked={this.doNothing()}/>
        )
      }
    }
    if (state === 'email'){
      if (this.state.email.length > 0){
        return(
          <Next class="next-button-small" onClicked={() => this.transition({ type: 'next' })}/>
        )
      }else {
        return(
          <Next class="next-button-small-inactive" onClicked={this.doNothing()}/>
        )
      }
    }
    if (state === 'location'){
      if (this.state.location.length > 0){
        return(
          <Next class="next-button-small" onClicked={() => this.transition({ type: 'next' })}/>
        )
      }else {
        return(
          <Next class="next-button-small-inactive" onClicked={this.doNothing()}/>
        )
      }
    }
     else if (data[this.state.currentState]["next"]){

    var btnClass;
    if(buttonclass === "small"){
      btnClass = "next-button-small";
    } else if (buttonclass === "large"){
      btnClass = "next-button";
    } else{
      btnClass = "";
    }
    return (
      <Next class={btnClass} onClicked={() => this.transition({ type: 'next' })}/>
    );
  }
  }

  renderBackButton(state, buttonclass) {
    if (data[this.state.currentState]["back"]){
      var btnClass;
    if(buttonclass === "small"){
      btnClass = "back-button-small";
    } else if (buttonclass === "large"){
      btnClass = "back-button";
    } else{
      btnClass = "";
    }
      return (
        <Back class={btnClass} onClicked={() => this.transition({ type: 'back' })}/>
      );
    }
  }

  renderRecordButton(state) {
    if (this.state.currentState == 'record-intro-2'){
      return (
        <RecordButton class="record-button" onClicked={() => this.transition({ type: 'recording' })}/>
      );
    }
  }

  renderRecordStop(state) {
    if (this.state.currentState == 'recording'){
      return (
        <RecordStop class="record-stop" onClicked={() => this.transition({ type: 'stop' })}/>
      );
    }
  }

  renderRecordAgain(state) {
    if (this.state.currentState == 'review'){
      return (
        <RecordAgain class="back-button" textContent="Retake Video" onClicked={() => this.transition({ type: 'record-again' })}/>
      );
    }
    if (this.state.currentState == 'end'){
      return (
        <RecordAgain class="record-again" textContent="Make Another Recording" onClicked={() => this.transition({ type: 'record-again' })}/>
      );
    }
  }

  renderDisagree(state) {
    if (this.state.currentState == 'user-agreement'){
      return (
        <Disagree class="disagree-button-small" onClicked={() => this.transition({ type: 'disagree' })}/>
      );
    }
  }
  renderDelete(state) {
    if (this.state.currentState == 'user-agreement-warning'){
      return (
        <Delete class="delete-button" onClicked={() => this.transition({ type: 'delete' })}/>
      );
    }
  }

  renderHomeButton(state) {
    if (this.state.currentState == 'end'){
      return (
        <Home class="home-button" onClicked={() => this.transition({ type: 'home' })}/>
      );
    }
  }
  renderSave(state) {
    if (this.state.currentState == 'user-agreement-warning'){
      return (
        <Save class="save-button" onClicked={() => this.transition({ type: 'save' })}/>
      );
    }
  }

  renderAgree(state) {
    if (this.state.currentState == 'user-agreement'){
      return (
        <Agree class="agree-button-small" onClicked={() => this.transition({ type: 'agree' })}/>
      );
    }
  }

  toggleEyesFree(value) {
    if(this.state.eyesFree === false){
      this.setState({ eyesFree: true });
    }else{
      this.setState({ eyesFree: false });
    }

  }

  renderEyesFree(state) {
    if(state === "welcome"){
      var eyesFreeClass;
      if(this.state.eyesFree === true) {
        eyesFreeClass = 'eyes-free-on';
      } else {
        eyesFreeClass = 'eyes-free-off';
      }

      return (
        <EyesFree class={eyesFreeClass} onClicked={() => this.toggleEyesFree({ type: 'language' })}/>
      );
    }

  }

  renderLanguageButton(state) {
    if(state === "welcome"){
      if (!this.state.eyesFree){
        return(
          <Language class="language-button" onClicked={() => this.transition({ type: 'language' })}/>
        )
      }else if(this.state.eyesFree){
          return(
            <Language class="language-button-inactive" onClicked={this.doNothing()}/>
          )
        }

      }
  }


  renderTeleprompter(state) {

    return (
      <Teleprompter content={state}/>
    );
  }
  renderTouchscreen(state) {
    if(state.touchscreen){
      return (
      <Touchscreen content={state}/>
    );
  }

  }

  renderAttract(state) {
    if(this.state.currentState == 'attract'){
      return (
        <div className="attract" onClick={() => this.transition({ type: 'welcome' })}>
        <h3> WELCOME TO THE </h3>
        <h1> RECORDING BOOTH </h1>
        <h4> Tap anywhere to begin </h4>
        </div>
      );
    }
  }

  // renderQuestionNext() {
  //   return(
  //     <Next onClicked={this.handleQuestionNext}/>
  //   )
  // }

  setUserAnswer(answer) {
    if(this.state.questionId > 5) {
      this.setState({
        answer: answer,
        prompt: answer
      });
    } else{
      this.setState({
        answer: answer,
      });
    }

  }


  setNext(nextStep) {
    console.log(nextStep);
    if (nextStep === 'record'){

      this.setState({
      nextQuestionId: 'record-intro-1'
      });
    } else {
      var nextId = parseInt(nextStep, 10);


      this.setState({
        nextQuestionId: nextId
      });
    }
  }

  setUserAge(answer) {

    this.setState({
      age: answer,

    });
  }

  handleAgeSelected(event) {
    this.setUserAge(event.currentTarget.value);
  }

  handleAnswerSelected(event) {
    console.log(event.target);
    this.setUserAnswer(event.currentTarget.value);
    this.setNext(event.currentTarget.getAttribute('nextquestionid'));
  }

  handleQuestionNext(event) {
    if (this.state.questionId < quizQuestions.length) {
      } else {
        //just timed to show the selection has been made before moving to results
        //this.setResults(this.getResults());
      }
  }

  renderAgeSelect(state){
    if(state == "age"){
      return (
        <ul className="answerOptions">
        <li className="answerOption">
          <input
            type="radio"
            className="radioCustomButton"
            name="language"
            checked={"Yes" === this.state.age}
            id="yes"
            value="Yes"

            onChange={this.handleAgeSelected}
          />
          <label className="radioCustomLabel" htmlFor="yes">
            Yes
          </label>
        </li>
        <li className="answerOption">
          <input
            type="radio"
            className="radioCustomButton"
            name="language"
            checked={"No" === this.state.age}
            id="no"
            value="No"

            onChange={this.handleAgeSelected}
          />
          <label className="radioCustomLabel" htmlFor="no">
            No
          </label>
        </li>
        </ul>

    );

    }

  }

  handleRecordingStop(state){
    this.transition({ type: 'stop' })
  }

  renderTimer(state) {
    if(state === "recording"){
      return (
        <Timer seconds={10} stopRecording={this.handleRecordingStop}/>
      );
    }
  }

  renderQuiz(state) {
    if(state === "questions"){
      return (
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      );
    }
  }

  renderPrompt(teleprompter) {
    if(teleprompter.prompt){
      return (
        <h3>{teleprompter.prompt}</h3>
      );
    }
  }

  renderAgreement(state) {
    if(state === "user-agreement"){
      return (
        <div className="user-agreement">
        <h3>{this.state.touchscreen.heading}</h3>
        <div className="agreement-scroll">
        <p>{this.state.touchscreen.agreement}</p>
        </div>
        </div>
      );
    }
  }

  setNewQuestion() {
    this.setState({ teleprompter:  "new Question"});
  }


  // renderQuestions(state) {
  //   if(state === "questions"){
  //     return (
  //       <Questions content={state} onNewQuestion={this.setNewQuestion}/>
  //     );
  //   }
  // }




  onFirstNameInputChanged = (data) => {
  this.setState({ firstname: data });
  }
  renderFirstNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'first-name'){
      return (
        <Keyboard
          value={this.state.firstname}
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
          onChange={this.onFirstNameInputChanged}
          ref={k => this.keyboard = k}
        />
      );
    }
  }
  onLastNameInputChanged = (data) => {
  this.setState({ lastname: data });
  }
  renderLastNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'last-name'){
      return (
        <Keyboard
          value={this.state.lastname}
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
          onChange={this.onLastNameInputChanged}
          ref={k => this.keyboard = k}
        />
      );
    }
  }
  //email
  onEmailInputChanged = (data) => {
  this.setState({ email: data });
  }
  renderEmailKeyboard(keyboardInput) {
    if(this.state.currentState === 'email'){
      return (
        <Keyboard
          value={this.state.email}
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
          onChange={this.onEmailInputChanged}
          ref={k => this.keyboard = k}
        />
      );
    }
  }
  //location
  onLocationInputChanged = (data) => {
  this.setState({ location: data });
  }
  renderLocationKeyboard(keyboardInput) {
    if(this.state.currentState === 'location'){
      return (
        <Keyboard
          value={this.state.location}
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
          onChange={this.onLocationInputChanged}
          ref={k => this.keyboard = k}
        />
      );
    }
  }

  render() {
    const currentState = this.state.currentState;
    const teleprompterContent = this.state.teleprompter;
    const touchscreenContent = this.state.touchscreen;
    const keyboardInput = this.state.firstname;
    const buttonClass = this.state.buttonClass;


    return (
      <div className="ui-app" data-state={currentState}>
        <div id="touchscreen">
          {this.renderAttract(currentState)}
          {this.renderTouchscreen(touchscreenContent)}
          {this.renderFirstNameKeyboard(keyboardInput)}
          {this.renderLastNameKeyboard(keyboardInput)}
          {this.renderEmailKeyboard(keyboardInput)}
          {this.renderLocationKeyboard(keyboardInput)}
          {this.renderEyesFree(currentState)}
          {this.renderLanguageButton(currentState)}
          {this.renderLanguageSelect(currentState)}
          {this.renderQuiz(currentState)}
          {this.renderAgreement(currentState)}
          {this.renderAgeSelect(currentState)}
          {this.renderRecordAgain(currentState)}
          {this.renderDelete(currentState)}
          {this.renderSave(currentState)}
          {this.renderDisagree(currentState)}
          {this.renderAgree(currentState)}
          {this.renderHomeButton(currentState)}
          {this.renderBackButton(currentState, buttonClass)}
          {this.renderNextButton(currentState, buttonClass)}
          {this.renderRecordButton(currentState)}
          {this.renderRecordStop(currentState)}

        </div>
        <div id="teleprompter">
          {this.renderTeleprompter(teleprompterContent)}
          {this.renderTimer(currentState)}
          {this.renderPrompt(teleprompterContent)}
        </div>
      </div>
    );
  }

}

export default App;
