import React, { Component } from 'react';
import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz';
import QuestionCount from '../components/QuestionCount';
import Next from '../components/Next';
import Result from '../components/Result';
import update from 'immutability-helper';

import { states } from '../components/States.js';

export const About = (props) => {
  return(
    <div onClick={() => props.next(states.QUESTIONS)}>
    <h3>welcome to the</h3>
    <h2>Recording Booth</h2>
    <p>Tap anywhere to begin</p>
  </div>

  );
}

export class UiSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      errors: []
    };
    this._onChange = this._onChange.bind(this);
    // this._validate = this._validate.bind(this);
    this._next = this._next.bind(this);
  }

  _onChange(e, { value }) {
    this.setState({
      value: value,
      errors: []
    });
  }

  // _validate(e) {
  //   e.preventDefault();
  //   let value = this.state.value;
  //   if (value === 'car') {
  //     this.props.next(states.CAR);
  //   } else if (value === 'boat') {
  //     this.props.next(states.BOAT);
  //   } else {
  //     this.setState({
  //       errors: ['Please choose a vehicle type']
  //     });
  //   }
  // }

  _back() {
    this.props.back(states.WELCOME)
  }
  _next() {
    this.props.next(states.ABOUT)
  }

  render() {
    return(
        // { this.state.errors.length > 0 &&
        // <Message negative>
        //   <p>{this.state.errors.join('. ')}</p>
        // </Message>
        // }
        <div>
          <div>
            <h2>eyes-free</h2>
            <div onClick={states.LANGUAGE_SELECT}>Language</div>

            <div onClick={this._next}>Next</div>
          </div>
        </div>
    );
  }
}

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      make: null,
      model: null,
      value: null,
      length: null,
      errors: []
    }
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
    this._back = this._back.bind(this);
  }

  _back(e) {
    e.preventDefault();
    this.props.back(states.UI_SETTINGS);
  }

  _onChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  _validate(e) {
    e.preventDefault();
    // You can add your validation logic here

    this.props.saveForm({
      type: this.props.type,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    });

    this.props.next(this.props.nextState);
  }

  render() {
    return(
      <p>baseform</p>
      // <Form>
      //   { this.state.errors.length > 0 &&
      //   <Message negative>
      //     <p>{this.state.errors.join('. ')}</p>
      //   </Message>
      //   }
      //   <h2>{this.props.type} details:</h2>
      //   <Form.Group widths='equal'>
      //     <Form.Input
      //       name='make'
      //       value={this.state.make}
      //       onChange={this._onChange}
      //       label='Make'
      //       placeholder='Make'/>
      //     <Form.Input
      //       name='model'
      //       value={this.state.model}
      //       onChange={this._onChange}
      //       label='Model'
      //       placeholder='Model'/>
      //   </Form.Group>
      //   <Form.Group widths='equal'>
      //     <Form.Input
      //       name='year'
      //       value={this.state.year}
      //       onChange={this._onChange}
      //       label='Year'
      //       placeholder='Year'/>
      //     {this.props.type === 'Boat' &&
      //       <Form.Input
      //         name='length'
      //         value={this.state.length}
      //         onChange={this._onChange}
      //         label='Length'
      //         placeholder='Length'/>
      //     }
      //   </Form.Group>
      //   <Grid>
      //     <Grid.Column floated='left' width={5}>
      //       <Button secondary onClick={this._back}>Back</Button>
      //     </Grid.Column>
      //     <Grid.Column floated='right' width={5}>
      //       <Button primary onClick={this._validate}>Next</Button>
      //     </Grid.Column>
      //   </Grid>
      // </Form>
    );
  }
}

class QuestionList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      make: null,
      model: null,
      value: null,
      length: null,
      errors: []
    }
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
    this._back = this._back.bind(this);
  }

    render() {
      return (
          <p>questionlist</p>
      )
    }
  };

  // React.render(<ProperListRender list={[1,2,3,4,5]} />, document.getElementById('proper-list-render1'));
  // React.render(<ProperListRender list={[1,2,3,4,5,6,7,8,9,10]} />, document.getElementById('proper-list-render2'));

  class Question extends Component{
    //   <Form.Field>
    //   <Radio
    //     label={listValue}
    //     value={listValue}
    //     checked={props.state.value === listValue}
    //     onChange={props._onChange}
    //   />
    // </Form.Field>

  }

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
    this.handleNext = this.handleNext.bind(this);
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
    this.setNext(event.currentTarget.getAttribute('nextquestionid'));
    this.setUserAnswer(event.currentTarget.value);
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
    //   return(
    //     <Teleprompter content={this.state.teleprompter} />
    //   )
    // }

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
      <div>
        <div id='touchscreen'>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        {this.renderNext()}
        </div>
        <div id='teleprompter'>

        {this.renderProgressBar()}

        </div>
        </div>
    )
  }
}

export const Record = (props) => {
  return(
    <BaseForm
      type='Boat'
      next={props.next}
      back={props.back}
      saveForm={props.saveForm}
      nextState={states.BOAT_DETAIL}/>
  );
}

export const Submit = (props) => {
  return(
    <BaseForm
      type='Boat'
      next={props.next}
      back={props.back}
      saveForm={props.saveForm}
      nextState={states.BOAT_DETAIL}/>
  );
}

export const SubmissionLocation = (props) => {
  return(
    <BaseForm
      type='Boat'
      next={props.next}
      back={props.back}
      saveForm={props.saveForm}
      nextState={states.BOAT_DETAIL}/>
  );
}

class BaseSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
    this._onChange = this._onChange.bind(this);
    this._validate = this._validate.bind(this);
    this._back = this._back.bind(this);
    this._next = this._next.bind(this);
  }

  _back(e) {
    e.preventDefault();
    this.props.back(states.UI_SETTINGS);
  }

  _next(e) {
    e.preventDefault();
    this.props.next(states.RECORD);
  }

  _onChange(e, { value }) {
    this.setState({value});
  }

  _validate(e) {
    e.preventDefault();
    // You can add your validation logic here

    this.props.saveForm({
      type: this.props.type,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year
    });

    this.props.next(this.props.nextState);
  }

  render() {
    return(
      <p>baseselect</p>
    //   <Grid>
    //     <Grid.Row>
    //   <Form>
    //     <Form.Field>
    //       Selected value: <b>{this.state.value}</b>
    //     </Form.Field>
    //     <QuestionList list={[1,2,3,4,5]} />
    //   </Form>
    // </Grid.Row>
    // <Grid.Row>
    //   <Grid.Column floated='left' width={5}>
    //     <Button primary onClick={this._back}>Back</Button>
    //   </Grid.Column>
    //   <Grid.Column floated='right' width={5}>
    //     <Button primary onClick={this._next}>Next</Button>
    //   </Grid.Column>
    // </Grid.Row>
    // </Grid>

     );
  }
}


export class Confirm extends Component {
  render() {
    /*
     * Here is our final step. In the real world, we would
     * obviously do something more complicated than a javascript
     * alert
     */
    return(
      <p>confirm</p>
      // <Grid>
      //   <Grid.Row>
      //     <p>Your Vehicles:</p>
      //     <List>
      //       {this.props.vehicles.map((i) => {
      //         return(
      //           <List.Item>
      //             <List.Icon name={i.type === 'Boat' ? 'ship' : 'car' } />
      //             <List.Content>{i.year} {i.make} {i.model}</List.Content>
      //           </List.Item>
      //         );
      //       })}
      //     </List>
      //   </Grid.Row>
      //   <Grid.Row>
      //     <Grid.Column floated='left' width={5}>
      //       <Button onClick={() => this.props.next(states.UI_SETTINGS)}>New Recording</Button>
      //     </Grid.Column>
      //     <Grid.Column floated='right' width={5}>
      //       <Button primary onClick={() => alert('Finished!')}>Get quote</Button>
      //     </Grid.Column>
      //   </Grid.Row>
      // </Grid>
    );
  }
}
