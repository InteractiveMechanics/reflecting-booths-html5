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
