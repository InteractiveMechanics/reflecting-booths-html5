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
import Chime from './Assets/audio/chime-re.mp3';
import jsonData from './data.json';

const quizQuestions = jsonData.questions;

//const quizQuestions = Array.from(jsonData.questions);

console.log(quizQuestions);






class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: jsonData,
      currentState: 'first-name', //change this to skip around
      language: 'spanish',
      eyesFree: true,
      firstname: '',
      eyesfreefirstname: '',
      lastname: '',
      email: '',
      location: '',
      geonameid: null,
      counter: 0,
      questionId: 0,
      nextQuestionId: 0,
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      answer: {},
      teleprompter: {},
      touchscreen: {},
      keyboard: {},
      input: "",
      buttonClass: "small",
      age: "",
      prompt: {},
      username:"",
      sessionId: "",
      sound: "",
      mainSound: "",
      timeout: 180000,
      attractFade: 0,
      locationSuggestions: [],
      touchscreenClass: "fade fade-enter",
      teleprompterClass: "fade fade-enter",
      remembrance: false,
      prevQuestionArray: []
    };

    this.handleLanguageSelected = this.handleLanguageSelected.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAnswerHover = this.handleAnswerHover.bind(this);
    this.handleAgeSelected = this.handleAgeSelected.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.handleEyesFreeHover = this.handleEyesFreeHover.bind(this);
    this.handleEyesFreeRelease = this.handleEyesFreeRelease.bind(this);
    this.handleSelectEyesFreeHover = this.handleSelectEyesFreeHover.bind(this);
    this.handleSelectEyesFreeRelease = this.handleSelectEyesFreeRelease.bind(this);
    this.handleMainAudioFinish = this.handleMainAudioFinish.bind(this);
    this.handleMainAudioStop = this.handleMainAudioStop.bind(this)
    this.handleLocationQuery = this.handleLocationQuery.bind(this);
    this.handleLocationEntry = this.handleLocationEntry.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.deleteRecording = this.deleteRecording.bind(this);
    this.recordAgain = this.recordAgain.bind(this);
    this.submitData = this.submitData.bind(this);
    this.userDisagree = this.userDisagree.bind(this);
    this.cameraOn = this.cameraOn.bind(this);
    this.inUseLightToggle = this.inUseLightToggle.bind(this);
    this.setAudio = this.setAudio.bind(this);
    this.changeKeyboardInput = this.changeKeyboardInput.bind(this);
    //this.renderMainAudio = this.renderMainAudio.bind(this);

    this.captureIP = "10.0.94.50";
    this.interactiveIP = "10.0.94.49";
  }


  componentWillMount() {
    let startState = this.state.currentState;
    this.getSessionId();
    this.setState({
      touchscreen: data['steps'][startState]["touchscreen"],
      teleprompter: data['steps'][startState]["teleprompter"]
    });
    console.log(this.state.data.steps.welcome.audio);
  }

  cameraOn () {
    axios.get("http://"+this.captureIP+":3000/activate-video");
    console.log('activated video');
  }

  startRecording () {
    axios.put("http://"+this.captureIP+":3000/video/"+ this.state.sessionId);
    this.transition({ type: 'recording' });
    console.log('start recording');
  }

  stopRecording(){
    axios.get("http://"+this.captureIP+":3000/activate-video");
    this.transition({ type: 'stop' });
    console.log('stop recording');
  }

  recordAgain(){
    this.deleteRecording();
    this.transition({ type: 'record-again' });
    console.log('record again');
  }

  userDisagree(){
    this.deleteRecording();
    this.transition({ type: 'disagree' });
    console.log('disagree');
  }

  deleteRecording(){
    axios.delete("http://"+this.captureIP+":3000/video"+ this.state.sessionId);
    console.log('delete recording');
  }

  inUseLightToggle(value){
    switch(value){
      case 'ON':
        console.log('in-use light ON');
        axios.get("http://"+this.interactiveIP+":3000/lights/in-use-up");
        break
      case 'OFF':
        console.log('in-use light OFF');
        axios.get("http://"+this.interactiveIP+":3000/lights/in-use-down");
        break
      default:
      break
    }
  }

  videoLightToggle(value){
    switch(value){
      case 'ON':
        console.log('video light ON');
        axios.get("http://"+this.interactiveIP+":3000/lights/up");
        break
      case 'OFF':
        console.log('video light OFF');
        axios.get("http://"+this.interactiveIP+":3000/lights/down");
        break
      default:
      break
    }
  }

  resetAllLights(){
    axios.get("http://"+this.interactiveIP+":3000/lights/reset");
  }


  handleLocationEntry () {
    let location = this.state.locationSuggestion;
    if (location){
      this.setState({
        location: location.name+ ', ' + location.admin1_name + ', ' + location.country_name,
        geonameid: location.geonameid
      })
    }
    this.transition({ type: 'next' });
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

  getSessionId () {
    // should point to internal server address ** just for testing
    //axios.put('https://www.uuidgenerator.net/api/version1')
    axios.get("http://"+this.interactiveIP+":3000/session")
      .then(response =>
        this.setState({
        sessionId: response.data
      })
    )
  }

  submitData () {
    console.log('submitting data');
    let memoriam = null;
    let remembrance = null;
    if (this.state.remembrance){
      memoriam = "In Memoriam",
      remembrance = "Remembrance"
    }
    const data = {
      uuid: this.state.sessionId,
      params: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        geonameid: this.state.geonameid,
        place: this.state.location,
        legal_selected: this.state.age,
        legal: this.state.age,
        uuid: this.state.sessionId,
        exhibition: memoriam,
        remembrance: remembrance
      }};
    axios.post("http://"+this.interactiveIP+":8080/", { data })
      .then(response => {
        console.log(response)
      }

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
    this.resetAll();
  }

  resetAll() {
    this.setState({
      data: jsonData,
      currentState: 'attract',
      language: 'english',
      eyesFree: false,
      firstname: '',
      eyesfreefirstname: '',
      lastname: '',
      email: '',
      location: '',
      geonameid: null,
      counter: 0,
      questionId: 0,
      nextQuestionId: 0,
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
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
      mainSound: "",
      timeout: 180000,
      attractFade: 0,
      locationSuggestions: [],
      touchscreenClass: "fade fade-enter",
      teleprompterClass: "fade fade-enter",
      remembrance: false,
      prevQuestionArray: []
    })
  }



  command(nextState, action) {
    switch (nextState) {
      case 'attract':
      if (this.state.currentState === 'end') {
          //trackEvent('End', 'Back-to-home', this.state.sessionId, 0)
      }
      this.getSessionId();
      this.inUseLightToggle('OFF');
      ////trackEvent(category, action, [name], [value])
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

      console.log(this.state.sessionId);
      this.inUseLightToggle('ON');
      if (this.state.currentState === 'attract'){
        //trackEvent('Session', 'Start', this.state.sessionId, 0)
      }
      if (this.state.currentState === 'about-1'){
        //trackEvent('Session', 'Back-to-welcome', this.state.sessionId, 0)
      }


      return {
        teleprompter: data['steps']['welcome']["teleprompter"],
        touchscreen: data['steps']['welcome']["touchscreen"],
        buttonClass: data['steps']['welcome']["buttonclass"],
        sound: this.state.data.steps.welcome.audio,
        mainSound: this.state.data.steps.welcome.audio,
        inUseLight: true
      };

      case 'language':
      //trackEvent('Language', 'Language', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['language']["teleprompter"],
        touchscreen: data['steps']['language']["touchscreen"],
        buttonClass: data['steps']['language']["buttonclass"],
        sound: this.state.data.steps['language']["audio"],
        mainSound: this.state.data.steps['language']["audio"]
      };

      case 'about-1':
      //trackEvent('About', 'About-1', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['about-1']["teleprompter"],
        touchscreen: data['steps']['about-1']["touchscreen"],
        buttonClass: data['steps']['about-1']["buttonclass"],
        sound: this.state.data.steps['about-1']["audio"],
        mainSound: this.state.data.steps['about-1']["audio"]
      };

      case 'about-2':
      //trackEvent('About', 'About-2', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['about-2']["teleprompter"],
        touchscreen: data['steps']['about-2']["touchscreen"],
        buttonClass: data['steps']['about-2']["buttonclass"],
        sound: this.state.data.steps['about-2']["audio"],
        mainSound: this.state.data.steps['about-2']["audio"]
      };

      case 'questions':
      if (this.state.currentState === 'about-1'){
        //trackEvent('About', 'Continue-to-questions', this.state.sessionId, 0)
      }
      if (this.state.currentState === 'end'){
        this.getSessionId()
        //trackEvent('End', 'Record-another', 0, 0)
      }
      this.clearAudioTimeouts();
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
        mainSound:  quizQuestions[0].question.audio,
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
        sound: this.state.data.steps['record-intro-1']["audio"],
        mainSound: this.state.data.steps['record-intro-1']["audio"]
      };

      case 'record-intro-2':
      if (this.state.currentState === 'record-intro-1'){
        //trackEvent('Recording', 'Continue-to-Record-intro-2', this.state.sessionId, 0)
      }
      if (this.state.currentState === 'review'){
        //trackEvent('Recording', 'Retake video', this.state.sessionId, 0)
      }
      return {
        teleprompter: data['steps']['record-intro-2']["teleprompter"],
        touchscreen: data['steps']['record-intro-2']["touchscreen"],
        buttonClass: data['steps']['record-intro-2']["buttonclass"],
        sound: this.state.data.steps['record-intro-2']["audio"],
        mainSound: this.state.data.steps['record-intro-1']["audio"]
      };

      case 'recording':
      //trackEvent('Recording', 'Recording-started', this.state.sessionId, 0)
      this.startRecording();
      this.videoLightToggle('ON');
      let audio = this.state.data.steps['recording']["audio"];
      if (this.state.remembrance){
        audio = this.state.data.steps['recording'].remembranceAudio;
      }
      return {
        teleprompter: {
        },
        touchscreen: data['steps']['recording']["touchscreen"],
        sound: audio,
        mainSound: audio,
        videoLight: true

      };

      case 'review':
      //trackEvent('Recording', 'Recording-complete', this.state.sessionId, 0)
      this.stopRecording()
      this.videoLightToggle('OFF');
      return {
        teleprompter: data['steps']['review']["teleprompter"],
        touchscreen: data['steps']['review']["touchscreen"],
        buttonClass: data['steps']['review']["buttonclass"],
        sound: this.state.data.steps['review']["audio"],
        mainSound: this.state.data.steps['review']["audio"]
      };

      case 'user-agreement':
      if (this.state.currentState === 'review'){
        //trackEvent('Recording', 'Continue-to-submit', this.state.sessionId, 0)
      }
      return {
        teleprompter: data['steps']['user-agreement']["teleprompter"],
        touchscreen: data['steps']['user-agreement']["touchscreen"],
        buttonClass: data['steps']['user-agreement']["buttonclass"],
        sound: this.state.data.steps['user-agreement']["audio"],
        mainSound: this.state.data.steps['user-agreement']["audio"]
      };

      case 'user-agreement-warning':
        //trackEvent('Submit', 'Disagree', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['user-agreement-warning']["teleprompter"],
        touchscreen: data['steps']['user-agreement-warning']["touchscreen"],
        buttonClass: data['steps']['user-agreement-warning']["buttonclass"],
        sound: this.state.data.steps['user-agreement-warning']["audio"],
        mainSound: this.state.data.steps['user-agreement-warning']["audio"]
      };

      case 'first-name':
      //trackEvent('Submit', 'agree', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['first-name']["teleprompter"],
        touchscreen: data['steps']['first-name']["touchscreen"],
        keyboard: data['steps']['first-name']["keyboard"],
        buttonClass: data['steps']['first-name']["buttonclass"],
        sound: this.state.data.steps['first-name']["audio"],
        mainSound: this.state.data.steps['first-name']["audio"]
      };

      case 'last-name':
      //trackEvent('Submit', this.state.first-name, this.state.sessionId, 0)
      //trackEvent('Submit', 'continue-to-last-name', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['last-name']["teleprompter"],
        touchscreen: data['steps']['last-name']["touchscreen"],
        keyboard: data['steps']['last-name']["keyboard"],
        buttonClass: data['steps']['last-name']["buttonclass"],
        sound: this.state.data.steps['last-name']["audio"],
        mainSound: this.state.data.steps['last-name']["audio"]
      };

      case 'email':
      //trackEvent('Submit', this.state.last-name, this.state.sessionId, 0)
      //trackEvent('Submit', 'continue-to-email', this.state.sessionId, 0)
      return {
        teleprompter: data['steps']['email']["teleprompter"],
        touchscreen: data['steps']['email']["touchscreen"],
        keyboard: data['steps']['email']["keyboard"],
        buttonClass: data['steps']['email']["buttonclass"],
        sound: this.state.data.steps['email']["audio"],
        mainSound: this.state.data.steps['email']["audio"]
      };

      case 'location':
      //trackEvent('Submit', this.state.email, this.state.sessionId, 0)
      //trackEvent('Submit', 'continue-to-location', this.state.sessionId, 0)

      return {
        teleprompter: data['steps']['location']["teleprompter"],
        touchscreen: data['steps']['location']["touchscreen"],
        keyboard: data['steps']['location']["keyboard"],
        buttonClass: data['steps']['location']["buttonclass"],
        sound: this.state.data.steps['location']["audio"],
        mainSound: this.state.data.steps['location']["audio"]
      };

      case 'age':
      //trackEvent('Submit', this.state.location, this.state.sessionId, 0)
      //trackEvent('Submit', 'continue-to-age', this.state.sessionId, 0))
      return {
        teleprompter: data['steps']['age']["teleprompter"],
        touchscreen: data['steps']['age']["touchscreen"],
        keyboard: data['steps']['age']["keyboard"],
        buttonClass: data['steps']['age']["buttonclass"],
        sound: this.state.data.steps['age']["audio"],
        mainSound: this.state.data.steps['age']["audio"]
      };

      case 'end':
      //trackEvent('Submit', this.state.age, this.state.sessionId, 0)
      this.submitData();
      return {
        teleprompter: data['steps']['end']["teleprompter"],
        touchscreen: data['steps']['end']["touchscreen"],
        buttonClass: data['steps']['end']["buttonclass"],
        sound: this.state.data.steps['end']["audio"],
        mainSound: this.state.data.steps['end']["audio"]
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
    //trackEvent('Session', 'Language-select', this.state.sessionId, name)
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
        //trackEvent('Questions', 'Continue-to-record', this.state.sessionId, 0)
        this.setState({
          currentState: 'record-intro-1'

        })
      } else{
        //trackEvent('Questions', 'Questions - '+this.state.question.english, this.state.sessionId, 0)
        //trackEvent('Questions', this.state.answer, this.state.sessionId, 0)
        const counter = this.state.counter + 1;
        const questionId = this.state.nextQuestionId;
        var prevArray = this.state.prevQuestionArray.slice();
        prevArray.push(this.state.questionId);
        console.log(quizQuestions[questionId].question.audio);
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
          nextQuestionId: null,
          sound: quizQuestions[questionId].question.audio,
          mainSound: quizQuestions[questionId].question.audio
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
          nextQuestionId: null,
          sound: quizQuestions[questionId].question.audio,
          mainSound: quizQuestions[questionId].question.audio
        });
    }.bind(this), 1000);


  }

  emailValidation() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  doNothing() {
    console.log('please choose an answer');
    //trackEvent('Questions', 'Questions - no answer - '+this.state.question.english, this.state.sessionId, 0)
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
    } else if (this.state.answer){
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
        <ReflectingButton class="back-button" language={this.state.language} buttonData={this.state.data.buttons['retake-video']} onClicked={this.recordAgain} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
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
        <ReflectingButton class="disagree-button-small" language={this.state.language} buttonData={this.state.data.buttons['disagree']} onClicked={this.userDisagree} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
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
      //trackEvent('Session', 'Eyes-free mode on', this.state.sessionId, 0)
      this.setState({
        eyesFree: true,
        language: 'english'
      });
    }else{
      this.setState({ eyesFree: false });
      //trackEvent('Session', 'Eyes-free mode off', this.state.sessionId, 0)
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



  setUserAnswer(answerObj) {
    if (this.state.questionId === 3) {
      if (answerObj.type === "Yes, let’s start recording."){
        this.setState({
          answer: answerObj,
          remembrance: true
        });
      } else {
        this.setState({
          answer: answerObj,
          remembrance: false
        });
      }

    } else if (this.state.questionId === 4) {
      this.setState({
        answer: answerObj,
        prompt: answerObj
      });
    } else{
      this.setState({
        answer: answerObj,
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

  handleAnswerHover(audio) {
    console.log("button pressed");
    this.setState({
      sound: audio,

    });
    //this.setUserAnswer(event.currentTarget.value);
    //this.setNext(event.currentTarget.getAttribute('nextquestionid'));
  }

  handleAnswerSelected(answerObj, next) {
    console.log("answer Selected");
    this.setUserAnswer(answerObj);
    console.log("next question:" + next)
    this.setNext(next);
    this.setAudio(Chime);
  }

  setAudio(audio){
    console.log(audio);
    this.clearAudioTimeouts();
    this.setState({
      sound: audio,

    });
  }

  //necessary?
  handleEyesFreeHover(event) {
    this.setAudio(event.target.value);
  }
  //necessary?
  handleSelectEyesFreeHover(event) {
    this.setAudio(event.target.value);
  }
  //necessary?
  handleSelectEyesFreeRelease(event) {
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
          onAnswerHover={this.handleAnswerHover}
          onEyesFreeRelease={this.handleEyesFreeRelease}
          eyesFree={this.state.eyesFree}
          audioFunc={this.setAudio}
        />
      );
    }
  }

  renderPrompt() {
    if(this.state.prompt && (this.state.currentState === 'recording')){
      return (
        <h3 className="prompt">{this.state.prompt.content[this.state.language]}</h3>
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
      //should be json data
      let fadeArray = data['steps']['record-intro-1']["instructions"][this.state.language];
      if (this.state.remembrance){
        fadeArray = fadeArray.splice(-1,1);
      }
      return (
        <Fade delay={1500} loop={false}
        duration={5400}
        endDelay={5000}
          class='prompt'
            array={fadeArray}
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


  handleMainAudioFinish(sound) {
    this.clearAudioTimeouts();
    if (this.state.currentState !== "recording") {
      if(this.state.currentState === "questions"){
        if (this.state.questionId !== 0 && this.state.mainSound === this.state.data.steps[this.state.currentState].audio){
          this.finishTimeout = setTimeout(function () {
            //reference main audio for sound rendering
            this.setState({ sound:  this.state.mainSound});
          }.bind(this), 4000);
        } else if (sound === this.state.data.steps['questions'].audio && this.questionId === 0){ //play question audio after main audio for question 0
              this.setState({
                sound:  quizQuestions[0].question.audio,
                mainSound: quizQuestions[0].question.audio
              });
        } else if (this.state.mainSound  === quizQuestions[0].question.audio){
          this.finishTimeout = setTimeout(function () {
            //reference main audio for sound rendering
            this.setState({ sound:  this.state.mainSound});
          }.bind(this), 4000);
        }
      } else {
        this.finishTimeout = setTimeout(function () {
          //reference main audio for sound rendering
          this.setState({ sound:  this.state.mainSound});
        }.bind(this), 4000);
      }

    } else if (this.state.prompt && sound === this.state.mainSound) {
      this.finishTimeout = setTimeout(function () {
        //reference main audio for sound rendering
        this.setState({ sound:  this.state.prompt.audio});
      }.bind(this), 1000);
    }

  }

  handleMainAudioStop(sound) {
    this.clearAudioTimeouts();
    if (this.state.currentState != "recording") {
      if (this.state.sound === ""){
        this.stopTimeout = setTimeout(function () {
          //reference main audio for sound rendering
          this.setState({ sound:  this.state.mainSound});
        }.bind(this), 4000);
      }
      //needed?
      // else if (this.state.currentState === "questions" &&  sound === this.state.data.steps['questions'].audio &&  this.questionId === 0){ //play question audio after main audio for question 0
      //         this.setState({
      //           sound:  quizQuestions[0].question.audio,
      //           mainSound: quizQuestions[0].question.audio
      //         });
      // }
      // else if (this.state.currentState === "questions" &&  this.state.mainSound  === quizQuestions[0].question.audio){
      //   this.stopTimeout = setTimeout(function () {
      //     //reference main audio for sound rendering
      //     this.setState({ sound:  this.state.mainSound});
      //   }.bind(this), 4000);
      // }
    }
  }

  clearAudioTimeouts() {
    clearTimeout(this.stopTimeout);
    clearTimeout(this.finishTimeout);
  }



  renderMainAudio(sound) {
    if (this.state.currentState === 'attract' || this.state.currentState === 'welcome' || (this.state.sound && this.state.eyesFree)) {

      if(sound.length > 0){
        return (
          <Sound
        url={window.location.origin + sound}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={() => this.handleMainAudioFinish(sound)}
        onStop={() => this.handleMainAudioStop(sound)}
      />
        )
      }
    }
  }

  onFirstNameInputChanged = (data) => {
    // if (this.state.eyesFree){
    //   this.setState({ eyesfreefirstname: this.state.eyesfreefirstname });
    // } else {
    //   this.setState({ firstname: this.state.firstname });
    // }
    this.setState({ firstname: data });

  }

  changeKeyboardInput(char){
    console.log("char");
    let oldString = this.state.eyesfreefirstname;
    this.setState({ eyesfreefirstname: oldString + char});
  }
  renderFirstNameKeyboard(keyboardInput, eyesfree) {
    if(this.state.currentState === 'first-name'){
      let value = this.state.firstname;
      if (eyesfree) {
        value = this.state.eyesfreefirstname;
      }
      console.log(this.state.data.keyboards[this.state.language]);
      return(

        <div>
        <InputSuggestion class='suggestion' content={data['steps']['first-name']['suggestion'][this.state.language]}  input={this.state.firstname}/>
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.firstname} layout={this.state.data.keyboards[this.state.language]} onChange={this.onFirstNameInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
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
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.lastname} layout={data['keyboards'][this.state.language]} onChange={this.onLastNameInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
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
      <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.email} layout={data['keyboards'][this.state.language]} onChange={this.onEmailInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
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
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.location} layout={data['keyboards'][this.state.language]} onChange={this.onLocationInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
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


         <div id="touchscreen" className="mirrored">
         <div id="fadewrap" className={this.state.touchscreenClass}>
         {this.renderAttract(currentState)}
         {this.renderFirstNameKeyboard(keyboardInput, this.state.eyesFree)}
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



        <div id="teleprompter" className="mirrored flipped">
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
