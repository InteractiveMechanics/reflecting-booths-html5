import React, { Component } from 'react';
import './App.css';
import './Keyboard.css';
import Teleprompter from './components/Teleprompter';
import data from './data';
import LanguageSelect from './components/LanguageSelect';
import Keyboard from 'react-virtual-keyboard';
import Quiz from './components/Quiz';
import Timer from './components/Timer';
import Progress from './components/Progress';
import axios from 'axios';
import Sound from 'react-sound';
import IdleTimer from 'react-idle-timer';
import ReflectingButton from './components/ReflectingButton';
import EyesFreeButton from './components/EyesFreeButton';
import LanguageButton from './components/LanguageButton';
import InputSuggestion from './components/InputSuggestion';
import Fade from './components/Fade';
import ReactKeyboard from './components/ReactKeyboard';
import Chime from './Assets/audio/chime.mp3';
import jsonData from './data.json';

const quizQuestions = data['questions'];







class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: jsonData,
      currentState: 'first-name',
      language: 'english',
      eyesFree: true,
      firstname: '',
      lastname: '',
      email: '',
      location: '',
      counter: 0,
      questionId: 0,
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
      attractFade: 0,
      locationSuggestions: [],
      touchscreenClass: "fade fade-enter",
      teleprompterClass: "fade fade-enter",
      remembrance: false,
      prevQuestionArray: []
    };

    this.handleLanguageSelected = this.handleLanguageSelected.bind(this);
    this.setNewQuestion = this.setNewQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAgeSelected = this.handleAgeSelected.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEyesFreeHover = this.handleEyesFreeHover.bind(this);
    this.handleEyesFreeRelease = this.handleEyesFreeRelease.bind(this);
    this.handleMainAudioFinish = this.handleMainAudioFinish.bind(this);
    this.handleLocationQuery = this.handleLocationQuery.bind(this);
    this.handleLocationEntry = this.handleLocationEntry.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.preRecordSteps = this.preRecordSteps.bind(this);
    this.inUseLightToggle = this.inUseLightToggle.bind(this);
    this.setAudio = this.setAudio.bind(this);
    //this.renderMainAudio = this.renderMainAudio.bind(this);
  }


  componentWillMount() {
    let startState = 'first-name'
    this.setState({
      touchscreen: data['steps'][startState]["touchscreen"],
      teleprompter: data['steps'][startState]["teleprompter"],
      buttonClass: "small",
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      sound: ""
    });
    console.log(this.state.data.steps.welcome.audio);
  }

  // handleClick () {
  // axios.put('http://10.10.0.53:3000/session')
  //   .then(response =>
  //     this.setState({
  //     sessionId: response.data,
  //   }))
  // }

  preRecordSteps () {
    this.transition({ type: 'record-intro-2' });
    axios.get('http://10.0.94.54:3000/activate-video')
    console.log('activated video');
  }

  startRecording () {
    this.transition({ type: 'recording' });
    axios.put('http://10.0.94.50:3000/video/'+ this.state.sessionId);
    console.log('start recording');
  }

  stopRecording(state){
    axios.get('http://10.0.94.53:3000/activate-video');
    this.transition({ type: 'stop' });
  }

  inUseLightToggle(value){
    switch(value){
      case 'ON':
        console.log('in-use light ON');
        axios.get('http://10.0.94.53:3000/lights/in-use-up');
        break
      case 'OFF':
        console.log('in-use light OFF');
        axios.get('http://10.0.94.53:3000/lights/in-use-down');
        break
      default:
      break
    }
  }

  videoLightToggle(value){
    switch(value){
      case 'ON':
        console.log('video light ON');
        axios.get('http://10.0.94.53:3000/lights/up');
        break
      case 'OFF':
        console.log('video light OFF');
        axios.get('http://10.0.94.53:3000/lights/down');
        break
      default:
      break
    }
  }

  resetAllLights(){
    axios.get('http://10.0.94.53:3000/lights/reset');
  }


  handleLocationEntry () {
    let location = this.state.locationSuggestion;
    if (location){
      this.setState({
        location: location.name+ ', ' + location.admin1_name + ', ' + location.country_name
      })
    }
    this.transition({ type: 'next' })
  }

  //get autocomplete suggestion
  handleLocationQuery (string) {
    if (string.length>0){
      axios.get('http://10.0.61.18/locate', { params: { name: string, limit: 1 }})
        .then(response =>
          this.setState({
          locationSuggestion: response.data.data[0],
        }))
    } else {
        this.setState({
      locationSuggestion: null
      })
    }

  }

  //get questions
  handleClick () {
  axios.get('http://10.0.61.35/api/questions')
    .then(response =>
      this.setState({
      questions: response.data,
    }))
  }

  getSessionId () {
    // should point to internal server address ** just for testing
    //axios.put('https://www.uuidgenerator.net/api/version1')
    axios.get('https://www.uuidgenerator.net/api/version1')
      .then(response =>
        this.setState({
        sessionId: response.data
      })
    )
  }

  fadeScreen () {
    this.setState({
      touchscreenClass: "fade fade-exit",
      teleprompterClass: "fade fade-exit"
    });
    setTimeout(function(){
      this.setState({ teleprompterClass: 'fade fade-enter'})
    }.bind(this), 1000);
    setTimeout(function(){
      this.setState({ touchscreenClass: 'fade fade-enter'})
    }.bind(this), 2000);
  }

  transition (action) {
    this.fadeScreen();
    setTimeout(function(){
      const currentGalleryState = this.state.currentState;
      const nextGalleryState = data['steps'][currentGalleryState][action.type];
      if (nextGalleryState) {
        const nextState = this.command(nextGalleryState, action);

        this.setState({
          currentState: nextGalleryState,
          ...nextState // extended state
        });
      }
    }.bind(this), 1000);
    console.log('transition triggered');
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
      sound: ""
    })
  }



  command(nextState, action) {
    switch (nextState) {
      case 'attract':
      this.inUseLightToggle('OFF');
      return {
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        age: '',
        teleprompter: data['steps']['attract']["teleprompter"],
        touchscreen: data['steps']['attract']["touchscreen"],
        buttonClass: data['steps']['attract']["buttonclass"],
        sound: "",
        inUseLight: false
      };

      case 'welcome':
      this.inUseLightToggle('ON');
      return {
        teleprompter: data['steps']['welcome']["teleprompter"],
        touchscreen: data['steps']['welcome']["touchscreen"],
        buttonClass: data['steps']['welcome']["buttonclass"],
        sound: this.state.data.steps.welcome.audio,
        inUseLight: true
      };

      case 'language':
      return {
        teleprompter: data['steps']['language']["teleprompter"],
        touchscreen: data['steps']['language']["touchscreen"],
        buttonClass: data['steps']['language']["buttonclass"],
        sound: this.state.data.steps['language']["audio"]
      };

      case 'about-1':
      return {
        teleprompter: data['steps']['about-1']["teleprompter"],
        touchscreen: data['steps']['about-1']["touchscreen"],
        buttonClass: data['steps']['about-1']["buttonclass"],
        sound: this.state.data.steps['about-1']["audio"]
      };

      case 'about-2':
      return {
        teleprompter: data['steps']['about-2']["teleprompter"],
        touchscreen: data['steps']['about-2']["touchscreen"],
        buttonClass: data['steps']['about-2']["buttonclass"],
        sound: this.state.data.steps['about-2']["audio"]
      };

      case 'questions':
      return {
        teleprompter: {
          heading: quizQuestions[0].question.content,
        },
        touchscreen: data['steps']['questions']["touchscreen"],
        buttonClass: data['steps']['questions']["buttonclass"],
        question: quizQuestions[0].question,
        answer: '',
        prompt: '',
        answerOptions: quizQuestions[0].answers,
        sound: this.state.data.steps['questions']["audio"],
        prevQuestionArray: [],
        nextQuestionId: 0,
        questionId: 0

      };

      case 'record-intro-1':
      return {
        teleprompter: data['steps']['record-intro-1']["teleprompter"],
        touchscreen: data['steps']['record-intro-1']["touchscreen"],
        buttonClass: data['steps']['record-intro-1']["buttonclass"],
        answer: '',
        sound: this.state.data.steps['record-intro-1']["audio"]
      };

      case 'record-intro-2':
      return {
        teleprompter: data['steps']['record-intro-2']["teleprompter"],
        touchscreen: data['steps']['record-intro-2']["touchscreen"],
        buttonClass: data['steps']['record-intro-2']["buttonclass"],
        sound: this.state.data.steps['record-intro-2']["audio"]
      };

      case 'recording':
      this.getSessionId();
      this.videoLightToggle('ON');
      return {
        teleprompter: {
        },
        touchscreen: data['steps']['recording']["touchscreen"],
        sound: this.state.data.steps['recording']["audio"],
        videoLight: true

      };

      case 'review':
      this.videoLightToggle('OFF');
      return {
        teleprompter: data['steps']['review']["teleprompter"],
        touchscreen: data['steps']['review']["touchscreen"],
        buttonClass: data['steps']['review']["buttonclass"],
        sound: this.state.data.steps['review']["audio"]
      };

      case 'user-agreement':
      return {
        teleprompter: data['steps']['user-agreement']["teleprompter"],
        touchscreen: data['steps']['user-agreement']["touchscreen"],
        buttonClass: data['steps']['user-agreement']["buttonclass"],
        sound: this.state.data.steps['user-agreement']["audio"]
      };

      case 'user-agreement-warning':
      return {
        teleprompter: data['steps']['user-agreement-warning']["teleprompter"],
        touchscreen: data['steps']['user-agreement-warning']["touchscreen"],
        buttonClass: data['steps']['user-agreement-warning']["buttonclass"],
        sound: this.state.data.steps['user-agreement-warning']["audio"]
      };

      case 'first-name':
      return {
        teleprompter: data['steps']['first-name']["teleprompter"],
        touchscreen: data['steps']['first-name']["touchscreen"],
        keyboard: data['steps']['first-name']["keyboard"],
        buttonClass: data['steps']['first-name']["buttonclass"],
        sound: this.state.data.steps['first-name']["audio"]
      };

      case 'last-name':
      return {
        teleprompter: data['steps']['last-name']["teleprompter"],
        touchscreen: data['steps']['last-name']["touchscreen"],
        keyboard: data['steps']['last-name']["keyboard"],
        buttonClass: data['steps']['last-name']["buttonclass"],
        sound: this.state.data.steps['last-name']["audio"]
      };

      case 'email':
      return {
        teleprompter: data['steps']['email']["teleprompter"],
        touchscreen: data['steps']['email']["touchscreen"],
        keyboard: data['steps']['email']["keyboard"],
        buttonClass: data['steps']['email']["buttonclass"],
        sound: this.state.data.steps['email']["audio"]
      };

      case 'location':
      return {
        teleprompter: data['steps']['location']["teleprompter"],
        touchscreen: data['steps']['location']["touchscreen"],
        keyboard: data['steps']['location']["keyboard"],
        buttonClass: data['steps']['location']["buttonclass"],
        sound: this.state.data.steps['location']["audio"]
      };

      case 'age':
      return {
        teleprompter: data['steps']['age']["teleprompter"],
        touchscreen: data['steps']['age']["touchscreen"],
        keyboard: data['steps']['age']["keyboard"],
        buttonClass: data['steps']['age']["buttonclass"],
        sound: this.state.data.steps['age']["audio"]
      };

      case 'end':
      return {
        teleprompter: data['steps']['end']["teleprompter"],
        touchscreen: data['steps']['end']["touchscreen"],
        buttonClass: data['steps']['end']["buttonclass"],
        sound: this.state.data.steps['end']["audio"]
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
    this.fadeScreen();
    setTimeout(function(){
      if (this.state.nextQuestionId === 'record-intro-1'){
        this.setState({
          currentState: 'record-intro-1'

        })
      } else{
        const counter = this.state.counter + 1;
        const questionId = this.state.nextQuestionId;
        var prevArray = this.state.prevQuestionArray.slice();
        prevArray.push(this.state.questionId);
        this.setState({
          prevQuestionArray: prevArray,
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
    }.bind(this), 1000);
  }

  prevQuestion() {
    this.fadeScreen();
    setTimeout(function(){
        var prevArray = this.state.prevQuestionArray.slice();
        const counter = this.state.counter - 1;
        const questionId = prevArray.pop();;
        this.setState({
          prevQuestionArray: prevArray,
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
    }.bind(this), 1000);


  }

  emailValidation() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  doNothing() {
    console.log('please choose an answer');
  }

  renderNextButton(state, buttonclass) {
    if (state === 'about-2'){
      return(
        <ReflectingButton class="next-button" language={this.state.language} buttonData={this.state.data.buttons['next-to-questions']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree} />
      )
    }
    if (state === 'questions'){
    if (this.state.nextQuestionId === 'record-intro-1'){
      return(
        <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree} />
      )
    } else if (this.state.answer.length > 0){
        return(
          <ReflectingButton  class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.setNextQuestion()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else{
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
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
         <ReflectingButton class="next-button" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'skip' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
       )
      }
    }

    if (state === 'record-intro-1') {
      return(
      <ReflectingButton class="next-button" language={this.state.language} buttonData={this.state.data.buttons['record']} onClicked={() => this.transition({ type: 'skip' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      )
    }

    //dirty
    if (state === 'first-name'){
      if (this.state.firstname.length > 0){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'last-name'){
      if (this.state.lastname.length > 0){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'email'){
      if (this.emailValidation()){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }
    }
    if (state === 'location'){
      //if (this.state.locationSuggestion){
      if (state){
        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.handleLocationEntry} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      } else {
        return(
          <ReflectingButton class="next-button-small-inactive" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
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
        <ReflectingButton  class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree} />
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
    if (state === 'questions'){
    if (this.state.prevQuestionArray.length === 0){
      return(
        <ReflectingButton class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['back']} onClicked={() => this.transition({ type: 'back' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      )
    } else {
      return(
        <ReflectingButton class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['back']} onClicked={this.prevQuestion} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      )
    }

    }
    if (state === "about-1"){
      return (
      <ReflectingButton class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['back-to-home']} onClicked={() => this.transition({ type: 'back' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    } else if ( state === "record-intro-1") {
      return(
        <ReflectingButton class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['back-to-questions']} onClicked={() => this.transition({ type: 'back' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>

      )
    } else {
      return (
        <ReflectingButton class={btnClass} language={this.state.language} buttonData={this.state.data.buttons['back']} onClicked={() => this.transition({ type: 'back' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }

    }
  }

  renderRecordButton(state) {
    if (this.state.currentState === 'record-intro-1'){
      return (
        <ReflectingButton class="record-button" language={this.state.language} buttonData={this.state.data.buttons['record']} onClicked={this.startRecording} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderRecordStop(state) {
    if (this.state.currentState === 'recording'){
      return (
        <ReflectingButton class="record-stop" language={this.state.language} buttonData={this.state.data.buttons['record-stop']} onClicked={this.stopRecording} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderRecordAgain(state) {
    if (this.state.currentState === 'review'){
      return (
        <ReflectingButton class="back-button" language={this.state.language} buttonData={this.state.data.buttons['retake-video']} onClicked={() => this.transition({ type: 'record-again' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
    if (this.state.currentState === 'end'){
      return (
        <ReflectingButton class="record-again" language={this.state.language} buttonData={this.state.data.buttons['record-another']} onClicked={() => this.transition({ type: 'record-again' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderDisagree(state) {
    if (this.state.currentState === 'user-agreement'){
      return (
        <ReflectingButton class="disagree-button-small" language={this.state.language} buttonData={this.state.data.buttons['disagree']} onClicked={() => this.transition({ type: 'disagree' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }
  renderDelete(state) {
    if (this.state.currentState === 'user-agreement-warning'){
      return (
        <ReflectingButton class="delete-button" language={this.state.language} buttonData={this.state.data.buttons['delete']} onClicked={() => this.transition({ type: 'delete' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderHomeButton(state) {
    if (this.state.currentState === 'end'){
      return (
        <ReflectingButton class="home-button" language={this.state.language} buttonData={this.state.data.buttons['back-to-home']} onClicked={() => this.transition({ type: 'home' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }
  }



  renderSave(state) {
    if (this.state.currentState === 'user-agreement-warning'){
      return (
        <ReflectingButton
          class="save-button"
          language={this.state.language}
          buttonData={this.state.data.buttons['save']}
          onClicked={() => this.transition({ type: 'save' })}
          eyesFreeHover={this.handleEyesFreeHover}
          eyesFreeRelease={this.handleEyesFreeRelease}
          eyesFree={this.state.eyesFree}/>
      );
    }
  }

  renderAgree(state) {
    if (this.state.currentState === 'user-agreement'){
      return (
        <ReflectingButton
          class="agree-button-small"
          language={this.state.language}
          buttonData={this.state.data.buttons['agree']}
          onClicked={() => this.transition({ type: 'agree' })}
          eyesFreeHover={this.handleEyesFreeHover}
          eyesFreeRelease={this.handleEyesFreeRelease}
          eyesFree={this.state.eyesFree}/>
      );
    }
  }

  toggleEyesFree() {
    if(this.state.eyesFree === false){
      this.setState({
        eyesFree: true,
        language: 'english'
      });
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
        <EyesFreeButton class={eyesFreeClass} language={this.state.language} buttonData={this.state.data.buttons['eyes-free']} onClicked={() => this.toggleEyesFree()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
      );
    }

  }

  renderLanguageButton(state) {
    if(state === "welcome"){
      let textObject = this.state.data.buttons.language.text;
      let textArray = Object.keys(textObject).map(i => textObject[i]);
      if (!this.state.eyesFree){
        return(
          <LanguageButton array={textArray} class="language-button" language={this.state.language} buttonData={this.state.data.buttons['language']} onClicked={() => this.transition({ type: 'language' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      }else if(this.state.eyesFree){
          return(
            <LanguageButton array={textArray} class="language-button-inactive" language={this.state.language} buttonData={this.state.data.buttons['language']} onClicked={this.doNothing()} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
          )
        }

      }
  }

  renderTeleprompter(state) {
    if (this.state.teleprompter){
      return (
        <Teleprompter content={state} language={this.state.language}/>
      );
    }

  }



  renderAttract(state) {
    if(this.state.currentState === 'attract'){
      return (
        <div className="attract" onClick={() => this.transition({ type: 'welcome' })}>
        <h3> WELCOME TO THE </h3>
        <h1> <span>RECORDING BOOTH</span> </h1>
        <Fade loop={true}
          duration={4000}
          array={data['steps']['attract']['touchscreen']['text']} />
        </div>
      );
    }
  }



  setUserAnswer(answer) {
    if (this.state.questionId === 3) {
      if (answer === "Yes, let’s start recording."){
        this.setState({
          answer: answer,
          remembrance: true
        });
      } else {
        this.setState({
          answer: answer,
          remembrance: false
        });
      }

    } else if (this.state.questionId === 4) {
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
    console.log(audio)
    this.setState({
      sound: audio,

    });
  }

  handleEyesFreeHover(event) {
    this.setAudio(event.target.value);
  }

  handleEyesFreeRelease(event) {
    console.log('press up');
    this.setAudio('');
  }

  renderAgeSelect(state){
    if(state === "age"){
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
            {data['steps']['age']['touchscreen']['age-select']['yes'][this.state.language]}
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
            {data['steps']['age']['touchscreen']['age-select']['no'][this.state.language]}
          </label>
        </li>
        </ul>

    );

    }

  }



  renderTimer(state) {
    if(state === "recording"){
      return (
        <Timer language={this.state.language} content={data['steps']['recording']["timer"]} seconds={10} stopRecording={this.stopRecording}/>
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
          onAnswerHover={this.onEyesFreeHover}
          eyesFree={this.state.eyesFree}
        />
      );
    }
  }

  renderPrompt() {
    if(this.state.prompt && (this.state.currentState === 'recording')){
      return (
        <h3 className="prompt">{this.state.prompt}</h3>
      );
    }
  }

  renderRemembrance() {
    if(this.state.remembrance && (this.state.currentState === 'recording')){
      return (
        <Fade delay={10000} loop={false}
        duration={5400} stop={true}
          class='prompt'
            array={data['steps']['recording']["remembranceText"][this.state.language]}
        />
      );
    }
  }

  renderProgress(state) {

    if ((state === 'attract') || (state === 'record-intro-1') || (state === 'recording')){

    }else{
      return (
        <Progress content={data['progress']} language={this.state.language} currentState={this.state.currentState}/>
      );
    }

  }

  renderInstructions(state) {
    if (state === 'record-intro-1'){
      return (
        <Fade delay={1000} loop={false}
        duration={5400}
          class='prompt'
            array={data['steps']['record-intro-1']["instructions"][this.state.language]}
        />
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

  //unneccessary?
  setNewQuestion() {
    this.setState({ teleprompter:  "new Question"});
  }

  handleMainAudioFinish() {
      setTimeout(function () {
        this.renderMainAudio();
      }, 3000);
    }

  renderMainAudio(sound) {
    if (this.state.currentState === 'attract' || this.state.currentState === 'welcome' || (this.state.sound && this.state.eyesFree)) {
      if(this.state.sound.length > 0){
      return (
        <Sound
      url={window.location.origin + this.state.sound}
      playStatus={Sound.status.PLAYING}
      // playFromPosition={300 /* in milliseconds */}
      // onLoading={this.handleSongLoading}
      // onPlaying={this.handleSongPlaying}
      //onFinishedPlaying={this.handleMainAudioFinish}
    />
      )
      }
    }
  }

  onFirstNameInputChanged = (data) => {
  this.setState({ firstname: data });
  }
  renderFirstNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'first-name'){
      return(
        <div>
        <InputSuggestion class='suggestion' content={data['steps']['first-name']['suggestion'][this.state.language]}  input={this.state.firstname}/>
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.firstname} layout={data['keyboards'][this.state.language]} onChange={this.onFirstNameInputChanged} audioData={this.state.data.keyboards.keys} onHover={this.setAudio}/>
        </div>
      )
    }
  }
  onLastNameInputChanged = (data) => {
  this.setState({ lastname: data });
  }
  renderLastNameKeyboard(keyboardInput) {
    if(this.state.currentState === 'last-name'){
      return (
        <div>
        <InputSuggestion class='suggestion' content={data['steps']['last-name']['suggestion'][this.state.language]}  input={this.state.lastname}/>
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.lastname} layout={data['keyboards'][this.state.language]} onChange={this.onLastNameInputChanged} audioData={this.state.data.keyboards.keys} onHover={this.setAudio}/>
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
      <InputSuggestion class='suggestion' content={data['steps']['email']['suggestion'][this.state.language]}  input={this.state.email}/>
      <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.email} layout={data['keyboards'][this.state.language]} onChange={this.onEmailInputChanged} audioData={this.state.data.keyboards.keys} onHover={this.setAudio}/>
        </div>
      );
    }
  }
  //location
  onLocationInputChanged = (data) => {
    this.handleLocationQuery(data);
  //this.setState({ location: data });
  }
  renderLocationKeyboard(keyboardInput) {
    let location = this.state.locationSuggestion;
    let suggestionClass = 'suggestion';
    if(this.state.currentState === 'location'){
      let locationSuggestion = data['steps']['location']['suggestion'][this.state.language];
      if ( location ) {
        suggestionClass = 'suggestion suggestion-normal';
        locationSuggestion = location.name+ ', ' + location.admin1_name + ', ' + location.country_name;
      } else {
        suggestionClass = 'suggestion';
        locationSuggestion = data['steps']['location']['suggestion'][this.state.language];
      }
      return (
        <div>
        <InputSuggestion class={suggestionClass} content={locationSuggestion}  input={this.state.location}/>
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.location} layout={data['keyboards'][this.state.language]} onChange={this.onLocationInputChanged} audioData={this.state.data.keyboards.keys} onHover={this.setAudio}/>
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


         <div id="touchscreen" className="">
         <div id="fadewrap" className={this.state.touchscreenClass}>
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
         </div>



        <div id="teleprompter" className="">
        <div id="fadewrap" className={this.state.teleprompterClass}>
          {this.renderTeleprompter(teleprompterContent)}
          {this.renderTimer(currentState)}
          {this.renderPrompt()}
          {this.renderRemembrance()}
          {this.renderProgress(this.state.currentState)}
          {this.renderInstructions(this.state.currentState)}
          </div>
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
