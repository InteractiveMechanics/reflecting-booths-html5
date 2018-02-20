import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Teleprompter from './components/Teleprompter';
import QuestionCount from './components/QuestionCount';
import Next from './components/Next';
import Result from './components/Result';
import update from 'immutability-helper';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
     counter: 0,
     questionId: 1,
     nextQuestionId: 0,
     question: '',
     answerOptions: [],
     answer: '',
     answersCount: {
       Nintendo: 0,
       Microsoft: 0,
       Sony: 0
     },
     result: '',
     teleprompter: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      teleprompter: quizQuestions[0].question
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  setUserAnswer(answer, name) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    console.log(answer, name);

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer,
      nextQuestionId: name
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.nextQuestionId;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[questionId].question,
      answerOptions: quizQuestions[questionId].answers,
      answer: '',
      teleprompter: quizQuestions[questionId].question,
      nextQuestionId: null
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value, event.currentTarget.name);
  }

  handleNext(event) {
    if (this.state.questionId < quizQuestions.length) {
        this.setNextQuestion();
      } else {
        //just timed to show the selection has been made before moving to results
        this.setResults(this.getResults());
      }
  }

  // handleBack(event) {
  //   this.setUserAnswer(event.currentTarget.value);
  // }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);


    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
      return (
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          nextQuestionId= {this.state.nextQuestionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      );
    }

    renderResult() {
      return (
        <Result quizResult={this.state.result} />
      );
    }

    renderTeleprompter() {
      return(
        <Teleprompter content={this.state.teleprompter} />
      )
    }

    renderProgressBar() {
      return(
        <QuestionCount
          counter={this.state.questionId}
          total={quizQuestions.length}
        />
      )
    }


    renderNext() {
      return(
        <Next onClicked={this.handleNext}/>
      )
    }

  render() {
    return (
      <div className="App">

        <div id='touchscreen'>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        {this.renderNext()}
        </div>
        <div id='teleprompter'>

        {this.renderTeleprompter()}
        {this.renderProgressBar()}

        </div>

      </div>
    )
  }
}

export default App;
