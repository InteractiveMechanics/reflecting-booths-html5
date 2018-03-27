import React, { Component } from 'react';
import './App.css';
import './Keyboard.css';
import Teleprompter from './components/Teleprompter';
import Touchscreen from './components/Touchscreen';
import data from './data';
import LanguageSelect from './components/LanguageSelect';
import Keyboard from 'react-virtual-keyboard';
import quizQuestions from './api/quizQuestions-re';
import Quiz from './components/Quiz';
import update from 'immutability-helper';
import Timer from './components/Timer';
import Progress from './components/Progress';
import axios from 'axios'
import Sound from 'react-sound';
import IdleTimer from 'react-idle-timer';
import ReflectingButton from './components/ReflectingButton';
import LanguageButton from './components/LanguageButton';
import InputSuggestion from './components/InputSuggestion';
import Fade from './components/Fade';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: 'attract',
      language: 'english',
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
      username:"",
      sessionId: "",
      sound: "",
      timeout: 180000,
      attractFade: 0
    };

    this.handleLanguageSelected = this.handleLanguageSelected.bind(this);
    this.setNewQuestion = this.setNewQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAgeSelected = this.handleAgeSelected.bind(this);
    this.handleRecordingStop = this.handleRecordingStop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEyesFreeHover = this.handleEyesFreeHover.bind(this);
    this.handleEyesFreeRelease = this.handleEyesFreeRelease.bind(this);
    this.attractFadeHandler = this.attractFadeHandler.bind(this);
    this.handleMainAudioFinish = this.handleMainAudioFinish.bind(this);
    //this.renderMainAudio = this.renderMainAudio.bind(this);
  }


  componentWillMount() {
    this.setState({
      touchscreen: data['steps']['attract']["touchscreen"],
      teleprompter: data['steps']['attract']["teleprompter"],
      buttonClass: "small",
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      sound: data['steps']['attract']["audio"]
    });
  }

  handleClick () {
  axios.get('http://localhost:4444/api/questions')
    .then(response =>
      this.setState({
      username: response.data.name,
    }))
  }

  getSessionId () {
    // should point to internal server address ** just for testing
    axios.get('https://www.uuidgenerator.net/api/version4')
      .then(response =>
        this.setState({
        sessionId: response.data
      })
    )
  }

  transition(action) {
    console.log('transition triggered');
    const currentGalleryState = this.state.currentState;
    const nextGalleryState = data['steps'][currentGalleryState][action.type];
    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action);

      this.setState({
        currentState: nextGalleryState,
        ...nextState // extended state
      });
    }
  }

  idleReset() {
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      location: '',
      age: '',
      currentState: 'attract',
      teleprompter: data['steps']['attract']["teleprompter"],
      touchscreen: data['steps']['attract']["touchscreen"],
      buttonClass: data['steps']['attract']["buttonclass"],
      sound: data['steps']['attract']["audio"]
    })
  }



  command(nextState, action) {
    switch (nextState) {
      case 'attract':
      return {
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        age: '',
        teleprompter: data['steps']['attract']["teleprompter"],
        touchscreen: data['steps']['attract']["touchscreen"],
        buttonClass: data['steps']['attract']["buttonclass"],
        sound: data['steps']['attract']["audio"]
      };

      case 'welcome':
      return {
        teleprompter: data['steps']['welcome']["teleprompter"],
        touchscreen: data['steps']['welcome']["touchscreen"],
        buttonClass: data['steps']['welcome']["buttonclass"],
        sound: data['steps']['welcome']["audio"]
      };

      case 'language':
      return {
        teleprompter: data['steps']['language']["teleprompter"],
        touchscreen: data['steps']['language']["touchscreen"],
        buttonClass: data['steps']['language']["buttonclass"],
        sound: data['steps']['language']["audio"]
      };

      case 'about-1':
      return {
        teleprompter: data['steps']['about-1']["teleprompter"],
        touchscreen: data['steps']['about-1']["touchscreen"],
        buttonClass: data['steps']['about-1']["buttonclass"],
        sound: data['steps']['about-1']["audio"]
      };

      case 'about-2':
      return {
        teleprompter: data['steps']['about-2']["teleprompter"],
        touchscreen: data['steps']['about-2']["touchscreen"],
        buttonClass: data['steps']['about-2']["buttonclass"],
        sound: data['steps']['about-2']["audio"]
      };

      case 'questions':
      return {
        teleprompter: {
          heading: quizQuestions[0].question.content,
        },
        touchscreen: data['steps']['questions']["touchscreen"],
        buttonClass: data['steps']['questions']["buttonclass"],
        question: quizQuestions[0].question,
        answerOptions: quizQuestions[0].answers,
        sound: data['steps']['questions']["audio"]

      };

      case 'record-intro-1':
      return {
        teleprompter: data['steps']['record-intro-1']["teleprompter"],
        touchscreen: data['steps']['record-intro-1']["touchscreen"],
        buttonClass: data['steps']['record-intro-1']["buttonclass"],
        sound: data['steps']['record-intro-1']["audio"]
      };

      case 'record-intro-2':
      return {
        teleprompter: data['steps']['record-intro-2']["teleprompter"],
        touchscreen: data['steps']['record-intro-2']["touchscreen"],
        buttonClass: data['steps']['record-intro-2']["buttonclass"],
        sound: data['steps']['record-intro-2']["audio"]
      };

      case 'recording':
      let id = this.getSessionId();
      return {
        teleprompter: {
          heading: data['steps']['recording']["teleprompter"]["heading"],
          prompt: this.state.prompt
        },
        touchscreen: data['steps']['recording']["touchscreen"],
        sound: data['steps']['recording']["audio"]
      };

      case 'review':
      return {
        teleprompter: data['steps']['review']["teleprompter"],
        touchscreen: data['steps']['review']["touchscreen"],
        buttonClass: data['steps']['review']["buttonclass"],
        sound: data['steps']['review']["audio"]
      };

      case 'user-agreement':
      return {
        teleprompter: data['steps']['user-agreement']["teleprompter"],
        touchscreen: data['steps']['user-agreement']["touchscreen"],
        buttonClass: data['steps']['user-agreement']["buttonclass"],
        sound: data['steps']['user-agreement']["audio"]
      };

      case 'user-agreement-warning':
      return {
        teleprompter: data['steps']['user-agreement-warning']["teleprompter"],
        touchscreen: data['steps']['user-agreement-warning']["touchscreen"],
        buttonClass: data['steps']['user-agreement-warning']["buttonclass"],
        sound: data['steps']['user-agreement-warning']["audio"]
      };

      case 'first-name':
      return {
        teleprompter: data['steps']['first-name']["teleprompter"],
        touchscreen: data['steps']['first-name']["touchscreen"],
        keyboard: data['steps']['first-name']["keyboard"],
        buttonClass: data['steps']['first-name']["buttonclass"],
        sound: data['steps']['first-name']["audio"]
      };

      case 'last-name':
      return {
        teleprompter: data['steps']['last-name']["teleprompter"],
        touchscreen: data['steps']['last-name']["touchscreen"],
        keyboard: data['steps']['last-name']["keyboard"],
        buttonClass: data['steps']['last-name']["buttonclass"],
        sound: data['steps']['last-name']["audio"]
      };

      case 'email':
      return {
        teleprompter: data['steps']['email']["teleprompter"],
        touchscreen: data['steps']['email']["touchscreen"],
        keyboard: data['steps']['email']["keyboard"],
        buttonClass: data['steps']['email']["buttonclass"],
        sound: data['steps']['email']["audio"]
      };

      case 'location':
      return {
        teleprompter: data['steps']['location']["teleprompter"],
        touchscreen: data['steps']['location']["touchscreen"],
        keyboard: data['steps']['location']["keyboard"],
        buttonClass: data['steps']['location']["buttonclass"],
        sound: data['steps']['location']["audio"]
      };

      case 'age':
      return {
        teleprompter: data['steps']['age']["teleprompter"],
        touchscreen: data['steps']['age']["touchscreen"],
        keyboard: data['steps']['age']["keyboard"],
        buttonClass: data['steps']['age']["buttonclass"],
        sound: data['steps']['age']["audio"]
      };

      case 'end':
      return {
        teleprompter: data['steps']['end']["teleprompter"],
        touchscreen: data['steps']['end']["touchscreen"],
        buttonClass: data['steps']['end']["buttonclass"],
        sound: data['steps']['end']["audio"]
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
      var languages = data['languages'];
      console.log(languages);
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
          heading: quizQuestions[questionId].question.content,
        },
        nextQuestionId: null
      });
    }

  }

  emailValidation() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  doNothing() {
    console.log('please choose an answer');
  }

  renderNextButton(state, buttonclass) {
    if (state === 'questions'){
    if (this.state.nextQuestionId === 'record-intro-1'){
      return(
        <ReflectingButton class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree} />
      )
    }else if(this.state.answer.length >0){
        return(
          <ReflectingButton  class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.setNextQuestion()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else{
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={data['buttons']['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }

    }

    if (state === 'review'){
      if (this.state.firstname.length > 0
        && this.state.lastname.length > 0
        && this.state.email.length > 0
        && this.state.location.length > 0
        && this.state.age === 'Yes'){
        return(
          <ReflectingButton class="next-button" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'skip' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }

    //dirty
    if (state === 'first-name'){
      if (this.state.firstname.length > 0){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={data['buttons']['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'last-name'){
      if (this.state.lastname.length > 0){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={data['buttons']['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'email'){
      if (this.emailValidation()){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={data['buttons']['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'location'){
      if (this.state.location.length > 0){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={data['buttons']['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    } else if (data['steps'][this.state.currentState]["next"]){

      var btnClass;
      if(buttonclass === "small"){
        btnClass = "next-button-small";
      } else if (buttonclass === "large"){
        btnClass = "next-button";
      } else{
        btnClass = "";
      }
      return (
        <ReflectingButton  class={btnClass} language={this.state.language} buttonData={data['buttons']['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree} />
      );
    }
  }

  renderBackButton(state, buttonclass) {
    if (data['steps'][this.state.currentState]["back"]){
      var btnClass;
    if(buttonclass === "small"){
      btnClass = "back-button-small";
    } else if (buttonclass === "large"){
      btnClass = "back-button";
    } else{
      btnClass = "";
    }
      return (
        <ReflectingButton class={btnClass} language={this.state.language} buttonData={data['buttons']['back']} onClicked={() => this.transition({ type: 'back' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderRecordButton(state) {
    if (this.state.currentState == 'record-intro-2'){
      return (
        <ReflectingButton class="record-button" language={this.state.language} buttonData={data['buttons']['record']} onClicked={() => this.transition({ type: 'recording' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderRecordStop(state) {
    if (this.state.currentState == 'recording'){
      return (
        <ReflectingButton class="record-stop" language={this.state.language} buttonData={data['buttons']['record-stop']} onClicked={() => this.transition({ type: 'stop' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderRecordAgain(state) {
    if (this.state.currentState == 'review'){
      return (
        <ReflectingButton class="back-button" language={this.state.language} buttonData={data['buttons']['retake-video']} onClicked={() => this.transition({ type: 'record-again' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
    if (this.state.currentState == 'end'){
      return (
        <ReflectingButton class="record-again" language={this.state.language} buttonData={data['buttons']['retake-video']} onClicked={() => this.transition({ type: 'record-again' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderDisagree(state) {
    if (this.state.currentState == 'user-agreement'){
      return (
        <ReflectingButton class="disagree-button-small" language={this.state.language} buttonData={data['buttons']['disagree']} onClicked={() => this.transition({ type: 'disagree' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }
  renderDelete(state) {
    if (this.state.currentState == 'user-agreement-warning'){
      return (
        <ReflectingButton class="delete-button" language={this.state.language} buttonData={data['buttons']['delete']} onClicked={() => this.transition({ type: 'delete' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderHomeButton(state) {
    if (this.state.currentState == 'end'){
      return (
        <ReflectingButton class="home-button" language={this.state.language} buttonData={data['buttons']['home']} onClicked={() => this.transition({ type: 'home' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }
  renderSave(state) {
    if (this.state.currentState == 'user-agreement-warning'){
      return (
        <ReflectingButton
          class="save-button"
          language={this.state.language}
          buttonData={data['buttons']['save']}
          onClicked={() => this.transition({ type: 'save' })}
          eyesFreeHover={this.handleEyesFreeHover}
          eyesFreeRelease={this.handleEyesFreeRelease}
          eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderAgree(state) {
    if (this.state.currentState == 'user-agreement'){
      return (
        <ReflectingButton
          class="agree-button-small"
          language={this.state.language}
          buttonData={data['buttons']['agree']}
          onClicked={() => this.transition({ type: 'agree' })}
          eyesFreeHover={this.handleEyesFreeHover}
          eyesFreeRelease={this.handleEyesFreeRelease}
          eyesFree={this.state.eyesFree}/>
      );
    }
  }

  toggleEyesFree() {
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
        <ReflectingButton class={eyesFreeClass} language={this.state.language} buttonData={data['buttons']['eyes-free']} onClicked={() => this.toggleEyesFree()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }

  }

  renderLanguageButton(state) {
    if(state === "welcome"){
      if (!this.state.eyesFree){
        return(
          <LanguageButton array={['Language',
          "(sp) Language",
          "(jp) Language",
        "(pt) Language",
        "(fr) Language",
        "(it) Language",
        "(mn) Language",
        "(dt) Language"]}
        class="language-button" language={this.state.language} buttonData={data['buttons']['language']} onClicked={() => this.transition({ type: 'language' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else if(this.state.eyesFree){
          return(
            <LanguageButton
              array={['Language',
              "(sp) Language",
              "(jp) Language",
            "(pt) Language",
            "(fr) Language",
            "(it) Language",
            "(mn) Language",
            "(dt) Language"]}
             class="language-button-inactive" language={this.state.language} buttonData={data['buttons']['language']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
          )
        }

      }
  }

  renderTeleprompter(state) {
    return (
      <Teleprompter content={state} language={this.state.language}/>
    );
  }

  attractFadeHandler(event) {
    this.setState({ attractFade: this.state.attractFade+1 })
    // setInterval(() => {
    //   this.setState({ attractFade: this.state.attractFade+1 })
    // }, 5000)
  }



  renderAttract(state) {
    if(this.state.currentState == 'attract'){
      return (
        <div className="attract" onClick={() => this.transition({ type: 'welcome' })}>
        <h3> WELCOME TO THE </h3>
        <h1> RECORDING BOOTH </h1>
        <Fade content={this.state.attractFade}
          array={['Tap anywhere to begin',
          "(sp) Tap anywhere to begin",
          "(jp) Tap anywhere to begin",
        "(pt) Tap anywhere to begin",
        "(fr) Tap anywhere to begin",
        "(it) Tap anywhere to begin",
        "(mn) Tap anywhere to begin",
        "(dt) Tap anywhere to begin"]} />
        </div>
      );
    }
  }



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

  setAudio(audio){
    this.setState({
      sound: audio,

    });
  }

  handleEyesFreeHover(event) {
    console.log(event.target);
    this.setAudio(event.target.value);
  }

  handleEyesFreeRelease(event) {
    console.log('press up');
    this.setAudio('');
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
          language={this.state.language}
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

  renderProgress(state) {

    if ((state === 'attract') || (state === 'record-intro-1')){

    }else{
      return (
        <Progress currentState={state}/>
      );
    }

  }

  renderInstructions(state) {
    if (state === 'record-intro-1'){
      return (
        <Fade loop={false}
          class='prompt'
          content={this.state.attractFade}
            array={['try to look straight ahead at this screen during the entire recording', '(script-2)','(script-3)'
          ]
        }/>
      )
    }
  }

  renderAgreement(state) {
    if(state === "user-agreement"){
      return (
        <div className="user-agreement">
        <h3>{this.state.touchscreen.heading[this.state.language]}</h3>
        <div className="agreement-scroll">
        <p>{this.state.touchscreen.agreement[this.state.language]}</p>
        </div>
        </div>
      );
    }
  }

  setNewQuestion() {
    this.setState({ teleprompter:  "new Question"});
  }

  handleMainAudioFinish() {
      setTimeout(function () {
        this.renderMainAudio();
      }, 3000);
    }

  renderMainAudio(sound) {
    if (this.state.currentState == 'attract' || (this.state.sound.length>0 && this.state.eyesFree)) {
      return (
        <Sound
      url={this.state.sound}
      playStatus={Sound.status.PLAYING}
      // playFromPosition={300 /* in milliseconds */}
      // onLoading={this.handleSongLoading}
      // onPlaying={this.handleSongPlaying}
      //onFinishedPlaying={this.handleMainAudioFinish}
    />
      )
    }
  }

  onFirstNameInputChanged = (data) => {
  this.setState({ firstname: data });
  }
  renderFirstNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'first-name'){
      console.log(data['keyboards'][this.state.language][0]);
      return (
        <div>
        <InputSuggestion content="Type to enter first name"  input={this.state.firstname}/>
        <Keyboard
          value={this.state.firstname}
          name='keyboard'
          options={{
            type:"input",
            layout : 'custom',
            customLayout: data['keyboards'][this.state.language],
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
      </div>
      );
    }
  }
  onLastNameInputChanged = (data) => {
  this.setState({ lastname: data });
  }
  renderLastNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'last-name'){
      return (
        <div>
        <InputSuggestion content="Type to enter last name"  input={this.state.lastname}/>
        <Keyboard
          value={this.state.lastname}
          name='keyboard'
          options={{
            type:"input",
            layout : 'custom',
            customLayout: data['keyboards'][this.state.language],
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
      </div>
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
      <div>
        <InputSuggestion content="Type to enter email"  input={this.state.email}/>
        <Keyboard
          value={this.state.email}
          name='keyboard'
          options={{
            type:"input",
            layout : 'custom',
            customLayout: data['keyboards'][this.state.language],
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
        </div>
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
        <div>
        <InputSuggestion content="Type to enter city, state, country"  input={this.state.location}/>
        <Keyboard
          value={this.state.location}
          name='keyboard'
          options={{
            type:"input",
            layout : 'custom',
            customLayout: data['keyboards'][this.state.language],
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
      </div>
      );
    }
  }

  render() {
    const currentState = this.state.currentState;
    const teleprompterContent = this.state.teleprompter;
    const keyboardInput = this.state.firstname;
    const buttonClass = this.state.buttonClass;


    return (
      <div className="ui-app" data-state={currentState}>
        <div id="touchscreen">
          {this.renderAttract(currentState)}
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
          {this.renderProgress(this.state.currentState)}
          {this.renderInstructions(this.state.currentState)}
        </div>
        {this.renderMainAudio(this.state.sound)}
        <IdleTimer
          ref="idleTimer"
          element={document}
          //activeAction={this._onActive}
          idleAction={() => this.idleReset()}
          timeout={this.state.timeout}
          format="MM-DD-YYYY HH:MM:ss.SSS">
        </IdleTimer>
      </div>
    );
  }

}

export default App;
