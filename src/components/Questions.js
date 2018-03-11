import React, { Component } from 'react';
import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz';
import QuestionCount from '../components/QuestionCount';
import Next from '../components/Next';
import Result from '../components/Result';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export class Questions extends Component{

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
    this.handleQuestionNext = this.handleQuestionNext.bind(this);
    //this._onChange = this._onChange.bind(this);
    //this._validate = this._validate.bind(this);
    //this._back = this._back.bind(this);
  }

  componentWillMount() {
    //const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
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

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer,
    });
  }

  setNext(nextStep) {
    console.log(nextStep);
    if (nextStep === 'record'){
      this.setState({

      })
    } else {
      var nextId = parseInt(nextStep, 10);


      this.setState({
        nextQuestionId: nextId
      });
    }
  }

  setNextQuestion(props) {
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
    props.onNewQuestion;
  }

  handleAnswerSelected(event) {
    this.setNext(event.currentTarget.getAttribute('nextquestionid'));
    this.setUserAnswer(event.currentTarget.value);
  }

  handleQuestionNext(event) {
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

  // getResults() {
  //   const answersCount = this.state.answersCount;
  //   const answersCountKeys = Object.keys(answersCount);
  //   const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
  //   const maxAnswerCount = Math.max.apply(null, answersCountValues);
  //
  //
  //   return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  // }
  //
  // setResults (result) {
  //   if (result.length === 1) {
  //     this.setState({ result: result[0] });
  //   } else {
  //     this.setState({ result: 'Undetermined' });
  //   }
  // }

  renderQuiz() {
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

    renderResult() {
      return (
        <Result quizResult={this.state.result} />
      );
    }

    // renderTeleprompter() {
    //
    // }

    renderProgressBar() {
      return(
        <QuestionCount
          counter={this.state.questionId}
          total={quizQuestions.length}
        />
      )
    }


    renderQuestionNext() {
      return(
        <Next onClicked={this.handleQuestionNext}/>
      )
    }

  render() {
    return (
      <div>
        {this.renderQuiz()}
        {this.renderQuestionNext()}
      </div>
    )
  }
}

Questions.propTypes = {
  content: PropTypes.object.isRequired,
  onNewQuestion: PropTypes.func.isRequired
};
