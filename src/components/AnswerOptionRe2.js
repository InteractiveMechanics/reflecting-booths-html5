import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import selected from '../Assets/icon-selected.png';
import deselected from '../Assets/icon-deselected.png';


class AnswerOption extends Component {
    constructor(props) {
      super(props);
      this.state = {

        changeInput: props.changeInputFunc,
        language: props.language,
        eyesFree: props.eyesFree,
        audioFunc: props.audioFunc,
        audioFile: props.audioFile,
        answerType: props.answerType,
        answerContent: props.answerContent,
        answer: props.answer,
        onAnswerSelected: props.onAnswerSelected,
        onAnswerHover: props.onAnswerHover,
        content: props.content,
        heightStyle: props.heightStyle,
        nextQuestionId: props.nextQuestionId
      };
      //this.appendToInput = this.appendToInput.bind(this);
    }

    render(){
      var options = {
          touchAction:'compute',
          recognizers: {
              tap: {
                enable: true
              },
              press: {
                  time: 600,
                  threshold: 100
              }
          }
      };
      //same as above
      if (this.state.eyesFree){
        options = {
            touchAction:'compute',
            recognizers: {
                tap: {
                    enable: false
                },
                press: {
                    time: 600,
                    threshold: 100
                }
            }
        };
      }

      let content = this.state.content[this.state.language];
      let optionTextSize = '';
      let heightStyle = {
        height:this.state.heightStyle+"px"
      };

      if(content.length>50){
        optionTextSize = "option-size-2";
      }



      let optionClass = "answerOption " + optionTextSize;
      if (this.state.answerContent === this.state.answer){
        optionClass = "answerOption active " + optionTextSize;
      }

      let icon = deselected;
      if (this.state.answerContent === this.state.answer) {
        icon = selected;
      }


      if (this.state.eyesFree) {
        //attach event listeners to each key
        var button = ReactDOM.findDOMNode(this);
        console.log(button);
        button.onmouseover = () => this.state.audioFunc(this.state.audioFile); //set audio to url to play
        button.onmouseleave = () => this.state.audioFunc(""); //set audio to empty string to stop
        return (
          <Hammer onTap={false} onDoubleTap={() => this.state.onAnswerSelected(this.state.content['english'], this.state.nextQuestionId)}  onPressUp={this.state.onEyesFreeRelease}  options={options}>
            <div className={optionClass} style={heightStyle}>
              <img src={icon}/>
              {content}
            </div>

          </Hammer>
        )
      } else {
        return (
          <Hammer onTap={() => this.state.onAnswerSelected(this.state.content['english'], this.state.nextQuestionId)} onDoubleTap={false} options={options}>
            <div className={optionClass} style={heightStyle}>
              <img src={icon}/>
              {content}
            </div>

          </Hammer>
        )
      }
    }

}

AnswerOption.propTypes = {
  language: PropTypes.string.isRequired,
  eyesFree: PropTypes.bool.isRequired,
  audioFunc: PropTypes.func.isRequired,
  audioFile: PropTypes.string.isRequired,
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onAnswerHover: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  heightStyle: PropTypes.string.isRequired,
  nextQuestionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default AnswerOption;
