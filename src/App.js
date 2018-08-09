import React, { Component } from 'react';
import './App.css';
import './Keyboard.css';
import Teleprompter from './components/Teleprompter';
import LanguageSelect from './components/LanguageSelect';
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
import AnswerOptionYesNo from './components/AnswerOptionYesNo';
const _paq = window._paq;

const quizQuestions = jsonData.questions;






class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: jsonData,
      currentState: 'attract', //change this to skip around
      language: 'english',
      eyesFree: false,
      firstname: '',
      eyesfreefirstname: '',
      lastname: '',
      eyesfreelastname: '',
      email: '',
      eyesfreeemail: '',
      location: '',
      eyesfreelocation: '',
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
      prompt: null,
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
    this.handleYesNo = this.handleYesNo.bind(this);
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
    this.onEyesFreeFirstNameInputChanged = this.onEyesFreeFirstNameInputChanged.bind(this);
    this.onEyesFreeLastNameInputChanged = this.onEyesFreeLastNameInputChanged.bind(this);
    this.onEyesFreeEmailInputChanged = this.onEyesFreeEmailInputChanged.bind(this);
    this.onEyesFreeLocationInputChanged = this.onEyesFreeLocationInputChanged.bind(this);
    //this.renderMainAudio = this.renderMainAudio.bind(this);

    //booth 1 install addresses
    //this.captureIP = "10.0.94.50";
    //this.interactiveIP = "10.0.94.49";

    //dev addresses
    //this.captureIP = "192.168.1.12";
    this.interactiveIP = "192.168.29.126";
    //dev captureIP
    this.captureIP = "10.10.0.53";
  }


  componentWillMount() {
    let startState = this.state.currentState;
    this.getSessionId();
    this.setState({
      touchscreen: jsonData.steps[startState].touchscreen,
      teleprompter: jsonData.steps[startState].teleprompter
    });
    //get uuid?
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
        axios.get("http://"+this.captureIP+":3001/lights/in-use-up");
        break
      case 'OFF':
        console.log('in-use light OFF');
        axios.get("http://"+this.captureIP+":3001/lights/in-use-down");
        break
      default:
      break
    }
  }

  videoLightToggle(value){
    switch(value){
      case 'ON':
        console.log('video light ON');
        axios.get("http://"+this.captureIP+":3001/lights/up");
        break
      case 'OFF':
        console.log('video light OFF');
        axios.get("http://"+this.captureIP+":3001/lights/down");
        break
      default:
      break
    }
  }

  resetAllLights(){
    axios.get("http://"+this.captureIP+":3001/lights/reset");
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
    console.log(string);
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
    axios.get('https://www.uuidgenerator.net/api/version1')
    //axios.put("http://"+this.captureIP+":3000/session")
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
      memoriam = "In Memoriam";
      remembrance = "Remembrance";
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
      const nextGalleryState = jsonData.steps[currentGalleryState][action.type];
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
      answer: {},
      teleprompter: jsonData.steps.attract.teleprompter,
      touchscreen: jsonData.steps.attract.touchscreen,
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
    })
  }



  command(nextState, action) {
    switch (nextState) {
      case 'attract':
      if (this.state.currentState === 'end') {
          _paq.push(['trackEvent', 'Step-End', 'Back-to-home', this.state.sessionId]);

      }
      this.getSessionId();
      this.inUseLightToggle('OFF');
      //_paq.push(category, action, [name], [value])
      return {
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        age: '',
        teleprompter: jsonData.steps.attract.teleprompter,
        touchscreen: jsonData.steps.attract.touchscreen,
        buttonClass: jsonData.steps.attract.buttonclass,
        sound: "",
        inUseLight: false
      };

      case 'welcome':
      // testing uuid generation
      console.log(this.state.sessionId);
      this.inUseLightToggle('ON');
      if (this.state.currentState === 'attract'){
        _paq.push(['trackEvent', 'Screen-Attract', 'Start', this.state.sessionId]);
      }
      if (this.state.currentState === 'about-1'){
        _paq.push(['trackEvent', 'Screen-About-1', 'Back-to-welcome', this.state.sessionId]);
      }


      return {
        teleprompter: jsonData.steps.welcome.teleprompter,
        touchscreen: jsonData.steps.welcome.touchscreen,
        buttonClass: jsonData.steps.welcome.buttonclass,
        sound: jsonData.steps.welcome.audio,
        mainSound: jsonData.steps.welcome.audio,
        inUseLight: true
      };

      case 'language':
      _paq.push(['trackEvent', 'Screen-Welcome', 'Language', this.state.sessionId])
      return {
        teleprompter: jsonData.steps['language']["teleprompter"],
        touchscreen: jsonData.steps['language']["touchscreen"],
        buttonClass: jsonData.steps['language']["buttonclass"],
        sound: this.state.data.steps['language']["audio"],
        mainSound: this.state.data.steps['language']["audio"]
      };

      case 'about-1':
      if (this.state.currentState === 'welcome'){
      _paq.push(['trackEvent', 'Screen-Welcome', 'About-1', this.state.sessionId])
      }
      if (this.state.currentState === 'about-2'){
      _paq.push(['trackEvent', 'Screen-About-2', 'Back-to-About-1', this.state.sessionId])
      }
      return {
        teleprompter: jsonData.steps['about-1']["teleprompter"],
        touchscreen: jsonData.steps['about-1']["touchscreen"],
        buttonClass: jsonData.steps['about-1']["buttonclass"],
        sound: this.state.data.steps['about-1']["audio"],
        mainSound: this.state.data.steps['about-1']["audio"]
      };

      case 'about-2':
      if (this.state.currentState === 'about-1'){
      _paq.push(['trackEvent', 'Screen-About-1', 'About-2', this.state.sessionId])
      }
      if (this.state.currentState === 'questions'){
        _paq.push(['trackEvent', 'Screen-Questions', 'Back-to-About-2', this.state.sessionId])
      }
      return {
        teleprompter: jsonData.steps['about-2']["teleprompter"],
        touchscreen: jsonData.steps['about-2']["touchscreen"],
        buttonClass: jsonData.steps['about-2']["buttonclass"],
        sound: this.state.data.steps['about-2']["audio"],
        mainSound: this.state.data.steps['about-2']["audio"]
      };

      case 'questions':
      if (this.state.currentState === 'about-2'){
        _paq.push(['trackEvent', 'Screen-About-2', 'Continue-to-questions', this.state.sessionId])
      }
      if (this.state.currentState === 'end'){
        this.getSessionId()
        _paq.push(['trackEvent', 'Screen-End', 'Record-another', this.state.sessionId])
      }
      this.clearAudioTimeouts();
      return {
        teleprompter: {
          heading: quizQuestions[0].question.content,
        },
        touchscreen: jsonData.steps['questions']["touchscreen"],
        buttonClass: jsonData.steps['questions']["buttonclass"],
        question: quizQuestions[0].question,
        answer: {},
        prompt: {},
        answerOptions: quizQuestions[0].answers,
        sound: this.state.data.steps['questions']["audio"],
        mainSound:  quizQuestions[0].question.audio,
        prevQuestionArray: [],
        nextQuestionId: 0,
        questionId: 0

      };

      case 'record-intro-1':
      if (this.state.currentState === 'questions'){
        _paq.push(['trackEvent', 'Screen-Questions', 'Continue-to-Record-Intro-1', this.state.sessionId])
      }
      if (this.state.currentState === 'review'){
        _paq.push(['trackEvent', 'Screen-Record-Intro-2', 'Back-to-Record-Intro-1', this.state.sessionId])
      }
      return {
        teleprompter: jsonData.steps['record-intro-1']["teleprompter"],
        touchscreen: jsonData.steps['record-intro-1']["touchscreen"],
        buttonClass: jsonData.steps['record-intro-1']["buttonclass"],
        answer: {},
        sound: this.state.data.steps['record-intro-1']["audio"],
        mainSound: this.state.data.steps['record-intro-1']["audio"]
      };

      case 'record-intro-2':
      if (this.state.currentState === 'record-intro-1'){
        _paq.push(['trackEvent', 'Screen-Record-Intro-1', 'Continue-to-Record-Intro-2', this.state.sessionId])
      }
      if (this.state.currentState === 'review'){
        _paq.push(['trackEvent', 'Screen-Review', 'Retake-video', this.state.sessionId])
      }
      return {
        teleprompter: jsonData.steps['record-intro-2']["teleprompter"],
        touchscreen: jsonData.steps['record-intro-2']["touchscreen"],
        buttonClass: jsonData.steps['record-intro-2']["buttonclass"],
        sound: this.state.data.steps['record-intro-2']["audio"],
        mainSound: this.state.data.steps['record-intro-1']["audio"]
      };

      case 'recording':
      _paq.push(['trackEvent', 'Screen-Recording', 'Recording-started', this.state.sessionId])
      this.startRecording();
      this.videoLightToggle('ON');
      let audio = this.state.data.steps['recording']["audio"];
      if (this.state.remembrance){
        audio = this.state.data.steps['recording'].remembranceAudio;
      }
      return {
        teleprompter: {
        },
        touchscreen: jsonData.steps['recording']["touchscreen"],
        sound: audio,
        mainSound: audio,
        videoLight: true

      };

      case 'review':
      _paq.push(['trackEvent', 'Screen-Review', 'Recording-complete', this.state.sessionId])
      this.stopRecording()
      this.videoLightToggle('OFF');
      return {
        teleprompter: jsonData.steps['review']["teleprompter"],
        touchscreen: jsonData.steps['review']["touchscreen"],
        buttonClass: jsonData.steps['review']["buttonclass"],
        sound: this.state.data.steps['review']["audio"],
        mainSound: this.state.data.steps['review']["audio"]
      };

      case 'user-agreement':
      if (this.state.currentState === 'review'){
        _paq.push(['trackEvent', 'Screen-Review', 'Continue-to-User-Agreement', this.state.sessionId])
      }
      return {
        teleprompter: jsonData.steps['user-agreement']["teleprompter"],
        touchscreen: jsonData.steps['user-agreement']["touchscreen"],
        buttonClass: jsonData.steps['user-agreement']["buttonclass"],
        sound: this.state.data.steps['user-agreement']["audio"],
        mainSound: this.state.data.steps['user-agreement']["audio"]
      };

      case 'user-agreement-warning':
        _paq.push(['trackEvent', 'Screen-Submit-Agreement', 'Disagree', this.state.sessionId])
      return {
        teleprompter: jsonData.steps['user-agreement-warning']["teleprompter"],
        touchscreen: jsonData.steps['user-agreement-warning']["touchscreen"],
        buttonClass: jsonData.steps['user-agreement-warning']["buttonclass"],
        sound: this.state.data.steps['user-agreement-warning']["audio"],
        mainSound: this.state.data.steps['user-agreement-warning']["audio"]
      };

      case 'first-name':
      _paq.push(['trackEvent', 'Screen-Submit-Agreement', 'Agree', this.state.sessionId]);

      return {
        teleprompter: jsonData.steps['first-name']["teleprompter"],
        touchscreen: jsonData.steps['first-name']["touchscreen"],
        keyboard: jsonData.steps['first-name']["keyboard"],
        buttonClass: jsonData.steps['first-name']["buttonclass"],
        sound: this.state.data.steps['first-name']["audio"],
        mainSound: this.state.data.steps['first-name']["audio"]
      };

      case 'last-name':
      _paq.push(['trackEvent', 'Screen-Submit-First-Name', this.state.firstname, this.state.sessionId]);
      _paq.push(['trackEvent', 'Screen-Submit-First-Name', 'continue-to-last-name', this.state.sessionId]);
      return {
        teleprompter: jsonData.steps['last-name']["teleprompter"],
        touchscreen: jsonData.steps['last-name']["touchscreen"],
        keyboard: jsonData.steps['last-name']["keyboard"],
        buttonClass: jsonData.steps['last-name']["buttonclass"],
        sound: this.state.data.steps['last-name']["audio"],
        mainSound: this.state.data.steps['last-name']["audio"]
      };

      case 'email':
      _paq.push(['trackEvent', 'Screen-Submit-Last-Name', this.state.lastname, this.state.sessionId]);
      _paq.push(['trackEvent', 'Screen-Submit-Last-Name', 'continue-to-email', this.state.sessionId]);
      return {
        teleprompter: jsonData.steps['email']["teleprompter"],
        touchscreen: jsonData.steps['email']["touchscreen"],
        keyboard: jsonData.steps['email']["keyboard"],
        buttonClass: jsonData.steps['email']["buttonclass"],
        sound: this.state.data.steps['email']["audio"],
        mainSound: this.state.data.steps['email']["audio"]
      };

      case 'location':
      _paq.push(['trackEvent', 'Screen-Submit-Email', this.state.email, this.state.sessionId])
      _paq.push(['trackEvent', 'Screen-Submit-Email', 'continue-to-location', this.state.sessionId])

      return {
        teleprompter: jsonData.steps['location']["teleprompter"],
        touchscreen: jsonData.steps['location']["touchscreen"],
        keyboard: jsonData.steps['location']["keyboard"],
        buttonClass: jsonData.steps['location']["buttonclass"],
        sound: this.state.data.steps['location']["audio"],
        mainSound: this.state.data.steps['location']["audio"]
      };

      case 'age':
      _paq.push(['trackEvent', 'Screen-Submit-Location', this.state.location, this.state.sessionId]);
      _paq.push(['trackEvent', 'Screen-Submit-Location', 'continue-to-age', this.state.sessionId]);
      let firstname = this.state.firstname;
      let lastname = this.state.lastname;
      let email = this.state.email;
      let location = this.state.location;
      if (this.state.eyesFree){
        console.log('eyes free to normal data');
        firstname = this.state.eyesfreefirstname;
        lastname = this.state.eyesfreelastname;
        email = this.state.eyesfreeemail;
        location = this.state.location;
      }
      return {
        firstname: firstname,
        lastname: lastname,
        email: email,
        location: location,
        teleprompter: jsonData.steps['age']["teleprompter"],
        touchscreen: jsonData.steps['age']["touchscreen"],
        keyboard: jsonData.steps['age']["keyboard"],
        buttonClass: jsonData.steps['age']["buttonclass"],
        sound: this.state.data.steps['age']["audio"],
        mainSound: this.state.data.steps['age']["audio"]
      };

      case 'end':
      _paq.push(['trackEvent', 'Screen-Submit-Age', this.state.age, this.state.sessionId]);
      _paq.push(['trackEvent', 'Screen-Submit-Age', 'continue-to-end', this.state.sessionId]);

      this.submitData();
      return {
        teleprompter: jsonData.steps['end']["teleprompter"],
        touchscreen: jsonData.steps['end']["touchscreen"],
        buttonClass: jsonData.steps['end']["buttonclass"],
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
    _paq.push(['trackEvent', 'Screen-Language', 'Language-select-' + target.value, this.state.sessionId])
    this.setState({
      [name]: value
    });
  }

  renderLanguageSelect(state) {
    if(state === "language"){
      var languages = jsonData.languages;
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
        this.transition({ type: 'record-intro-1' });
      } else{
        _paq.push(['trackEvent', 'Screen-Question-'+this.state.questionId, this.state.answer.content.english, this.state.sessionId]);
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
          answer: {},
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
          answer: {},
          teleprompter: {
            heading: quizQuestions[questionId].question.content,
          },
          nextQuestionId: null,
          sound: quizQuestions[questionId].question.audio,
          mainSound: quizQuestions[questionId].question.audio
        });
    }.bind(this), 1000);


  }

  emailValidation(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  doNothing() {
    //_paq.push(['trackEvent', 'Questions', 'Questions - no answer - '+this.state.question.english, this.state.sessionId, 0])
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
      if ((this.state.firstname.length > 0 && !this.state.eyesFree) || (this.state.eyesfreefirstname.length > 0 && this.state.eyesFree)){

        return(
          <ReflectingButton class="next-button-small" language={this.state.language} buttonData={this.state.data.buttons['next']} onClicked={() => this.transition({ type: 'next' })} eyesFreeHover={this.handleEyesFreeHover} eyesFreeRelease={this.handleEyesFreeRelease} eyesFree={this.state.eyesFree}/>
        )
      } else {
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
      if ( (!this.state.eyesFree && this.emailValidation(this.state.email)) || (this.state.eyesFree && this.emailValidation(this.state.eyesfreeemail)) ){
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
    } else if (jsonData.steps[this.state.currentState].next){

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
    if (jsonData.steps[this.state.currentState].back){
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
      _paq.push(['trackEvent', 'Screen-Welcome', 'Eyes-free mode on', this.state.sessionId])
      this.setState({
        eyesFree: true,
        language: 'english'
      });
    }else{
      this.setState({ eyesFree: false });
      _paq.push(['trackEvent', 'Screen-Welcome', 'Eyes-free mode off', this.state.sessionId])
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
          array={jsonData.steps.attract.touchscreen.text} />
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
    this.setUserAnswer(answerObj);
    this.setNext(next);
    this.setAudio(Chime);
  }

  handleYesNo(answerObj) {
    this.setState({
      age: answerObj.value,
      answer: answerObj
    });
    this.setAudio(Chime);
  }

  setAudio(audio){
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
    this.setAudio('');
  }

  renderAgeSelect(state){
    if(state === "age"){
      return (

        <ul className="answerOptions">
          <AnswerOptionYesNo
            language= {this.state.language}
            eyesFree= {this.state.eyesFree}
            audioFunc= {this.setAudio}
            audioFile= {jsonData.steps.age.touchscreen.ageselect.yes.audio}
            answerObject= {jsonData.steps.age.touchscreen.ageselect.yes}
            answer= {this.state.answer}
            onYesNoSelected= {this.handleYesNo}
            onAnswerHover= {this.handleAnswerHover}
          />
          <AnswerOptionYesNo
            language= {this.state.language}
            eyesFree= {this.state.eyesFree}
            audioFunc= {this.setAudio}
            audioFile= {jsonData.steps.age.touchscreen.ageselect.no.audio}
            answerObject= {jsonData.steps.age.touchscreen.ageselect.no}
            answer= {this.state.answer}
            onYesNoSelected= {this.handleYesNo}
            onAnswerHover= {this.handleAnswerHover}
          />
        </ul>
    );

    }

  }



  renderTimer(state) {
    if(state === "recording"){
      return (
        <Timer language={this.state.language} content={jsonData.steps.recording.timer} seconds={10} stopRecording={this.stopRecording}/>
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
      if (this.state.prompt.content){
        return (
          <h3 className="prompt">{this.state.prompt.content[this.state.language]}</h3>
        );
      }
    }
  }

  renderRemembrance() {
    if(this.state.remembrance && (this.state.currentState === 'recording')){
      return (
        <Fade delay={10000} loop={false}
        duration={5400} stop={true}
          class='prompt'
            array={jsonData.steps.recording.remembranceText[this.state.language]}
        />
      );
    }
  }

  renderProgress(state) {

    if ((state === 'attract') || (state === 'record-intro-1') || (state === 'recording')){

    }else{
      return (
        <Progress content={jsonData.progress} language={this.state.language} currentState={this.state.currentState}/>
      );
    }

  }

  renderInstructions(state) {
    if (state === 'record-intro-1'){
      let fadeArray = jsonData.steps['record-intro-1']["instructions"][this.state.language];
      let endDelay = 5000;
      console.log(fadeArray);
      if (!this.state.remembrance){
        let remembrance = fadeArray.pop();
        endDelay = 0;
        console.log(fadeArray);
      }
      return (
        <Fade delay={1500} loop={false}
        duration={5400}
        endDelay={endDelay}
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
    if (this.state.currentState !== "recording") {
      if (this.state.sound === ""){
        this.stopTimeout = setTimeout(function () {
          //reference main audio for sound rendering
          this.setState({ sound:  this.state.mainSound});
        }.bind(this), 4000);
      }
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
    this.setState({ firstname: data });
  }

  onEyesFreeFirstNameInputChanged(char){
    if (char === 'bksp'){
      let oldString = this.state.eyesfreefirstname;
      let newString = oldString.slice(0, -1);
      this.setState({ eyesfreefirstname: newString});
    } else if (char === 'enter'){
      let oldString = this.state.eyesfreefirstname;
      this.setState({ eyesfreefirstname: oldString + '.com'});
    } else {
      let oldString = this.state.eyesfreefirstname;
      this.setState({ eyesfreefirstname: oldString + char});
    }

  }

  renderFirstNameKeyboard(keyboardInput, eyesfree) {
    if(this.state.currentState === 'first-name'){
      let eyesFreeFirstNameInput = null;
      let eyesFreeClass = null
      if (eyesfree) {
        eyesFreeClass = "eyes-free-keyboard"
        eyesFreeFirstNameInput = <input value={this.state.eyesfreefirstname} className='eyes-free-input' type="text" disabled/>;

      }
      return(

        <div className={eyesFreeClass}>
        <InputSuggestion class='suggestion' content={jsonData.steps['first-name'].suggestion[this.state.language]}  input={this.state.firstname}/>
        {eyesFreeFirstNameInput}
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.firstname} layout={this.state.data.keyboards[this.state.language]} onChange={this.onFirstNameInputChanged} eyesFreeOnChange={this.onEyesFreeFirstNameInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
        </div>
      )
    }
  }

  onLastNameInputChanged = (data) => {
    this.setState({ lastname: data });
  }

  onEyesFreeLastNameInputChanged(char){
    if (char === 'bksp'){
      let oldString = this.state.eyesfreelastname;
      let newString = oldString.slice(0, -1);
      this.setState({ eyesfreelastname: newString});
    } else if (char === 'enter'){
      let oldString = this.state.eyesfreelastname;
      this.setState({ eyesfreelastname: oldString + '.com'});
    } else {
      let oldString = this.state.eyesfreelastname;
      this.setState({ eyesfreelastname: oldString + char});
    }
  }

  renderLastNameKeyboard(keyboardInput, eyesfree) {
    if(this.state.currentState === 'last-name'){
      let eyesFreeLastNameInput = null;
      let eyesFreeClass = null
      if (eyesfree) {
        eyesFreeClass = "eyes-free-keyboard"
        eyesFreeLastNameInput = <input value={this.state.eyesfreelastname} className='eyes-free-input' type="text" disabled/>;

      }
      return(

        <div className={eyesFreeClass}>
        <InputSuggestion class='suggestion' content={jsonData.steps['last-name'].suggestion[this.state.language]}  input={this.state.lastname}/>
        {eyesFreeLastNameInput}
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.lastname} layout={this.state.data.keyboards[this.state.language]} onChange={this.onLastNameInputChanged} eyesFreeOnChange={this.onEyesFreeLastNameInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
        </div>
      )
    }
  }

  //email
  onEmailInputChanged = (data) => {
    this.setState({ email: data });
  }

  onEyesFreeEmailInputChanged(char){
    if (char === 'bksp'){
      let oldString = this.state.eyesfreeemail;
      let newString = oldString.slice(0, -1);
      this.setState({ eyesfreeemail: newString});
    } else if (char === 'enter'){
      let oldString = this.state.eyesfreeemail;
      this.setState({ eyesfreeemail: oldString + '.com'});
    } else {
      let oldString = this.state.eyesfreeemail;
      this.setState({ eyesfreeemail: oldString + char});
    }
  }

  renderEmailKeyboard(keyboardInput, eyesfree) {
    if(this.state.currentState === 'email'){
      let eyesFreeEmailInput = null;
      let eyesFreeClass = null
      if (eyesfree) {
        eyesFreeClass = "eyes-free-keyboard"
        eyesFreeEmailInput = <input value={this.state.eyesfreeemail} className='eyes-free-input' type="text" disabled/>;

      }
      return(

        <div className={eyesFreeClass}>
        <InputSuggestion class='suggestion' content={jsonData.steps['email'].suggestion[this.state.language]}  input={this.state.lastname}/>
        {eyesFreeEmailInput}
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.email} layout={this.state.data.keyboards[this.state.language]} onChange={this.onEmailInputChanged} eyesFreeOnChange={this.onEyesFreeEmailInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
        </div>
      )
    }
  }

  //location
  onLocationInputChanged = (data) => {
    if(!this.state.eyesFree){
      this.handleLocationQuery(data);
    }
  }

  onEyesFreeLocationInputChanged(char){
    if (char === 'bksp'){
      let oldString = this.state.eyesfreelocation;
      let newString = oldString.slice(0, -1);
      this.setState({ eyesfreelocation: newString});
    } else if (char === 'enter'){
      let oldString = this.state.eyesfreelocation;
      this.setState({ eyesfreelocation: oldString + '.com'});
    } else {
      let oldString = this.state.eyesfreelocation;
      this.setState({ eyesfreelocation: oldString + char});
    }
    this.handleLocationQuery(this.state.eyesfreelocation);
  }

  renderLocationKeyboard(keyboardInput, eyesfree) {
    let location = this.state.locationSuggestion;
    let suggestionClass = 'suggestion';
    if(this.state.currentState === 'location'){
      //
      let locationSuggestion = jsonData.steps['location']['suggestion'][this.state.language];
      if ( location ) {
        suggestionClass = 'suggestion suggestion-normal';
        locationSuggestion = location.name+ ', ' + location.admin1_name + ', ' + location.country_name;
      } else {
        suggestionClass = 'suggestion';
        locationSuggestion = jsonData.steps['location']['suggestion'][this.state.language];
      }

      let eyesFreeLocationInput = null;
      let eyesFreeClass = null
      if (eyesfree) {
        eyesFreeClass = "eyes-free-keyboard"
        eyesFreeLocationInput = <input value={this.state.eyesfreelocation} className='eyes-free-input' type="text" disabled/>;

      }
      return(

        <div className={eyesFreeClass}>
        <InputSuggestion class='suggestion' content={locationSuggestion}  input={this.state.location}/>
        {eyesFreeLocationInput}
        <ReactKeyboard eyesFree={this.state.eyesFree} value={this.state.location} layout={this.state.data.keyboards[this.state.language]} onChange={this.onLocationInputChanged} eyesFreeOnChange={this.onEyesFreeLocationInputChanged} audioData={this.state.data.keyboards.keys} audioFunc={this.setAudio}/>
        </div>
      )
    }
  }


  render() {
    const currentState = this.state.currentState;
    const keyboardInput = this.state.firstname;
    const buttonClass = this.state.buttonClass;


    return (
      <div className="ui-app" data-state={currentState}>


         <div id="touchscreen" className="flipped">
         <div id="fadewrap" className={this.state.touchscreenClass}>
         {this.renderAttract(currentState)}
         {this.renderFirstNameKeyboard(keyboardInput, this.state.eyesFree)}
         {this.renderLastNameKeyboard(keyboardInput, this.state.eyesFree)}
         {this.renderEmailKeyboard(keyboardInput, this.state.eyesFree)}
         {this.renderLocationKeyboard(keyboardInput, this.state.eyesFree)}
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



        <div id="teleprompter" className="flipped mirrored">
        <div id="fadewrap" className={this.state.teleprompterClass}>
          {this.renderTeleprompter(this.state.teleprompter)}
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
