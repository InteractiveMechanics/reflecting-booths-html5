import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import selected from '../Assets/icon-selected.png';
import deselected from '../Assets/icon-deselected.png';

function AnswerOption(props) {
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
  if (props.eyesFree){
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

  let answerObject = props.answerObject;
  let optionTextSize = '';
  let heightStyle = {
    height:props.heightStyle+"px"
  };

  if(answerObject.content[props.language].length>50){
    optionTextSize = "option-size-2";
  }



  let optionClass = "answerOption " + optionTextSize;
  let icon = deselected;
  console.log(answerObject);
  console.log(props.answer);
  if (answerObject === props.answer){
    optionClass = "answerOption active " + optionTextSize;
    icon = selected;
  }

  if (props.eyesFree) {
    return (
      <Hammer onTap={false} onDoubleTap={() => props.onAnswerSelected(answerObject, props.nextQuestionId)}   options={options}>
        <div className={optionClass} style={heightStyle} onMouseLeave={props.onEyesFreeRelease} onMouseOver={() => props.onAnswerHover(props.audioFile)}>
          <img src={icon}/>
          {answerObject.content[props.language]}
        </div>

      </Hammer>
    )
  } else {
    return (
      <Hammer onTap={() => props.onAnswerSelected(answerObject, props.nextQuestionId)} onDoubleTap={false} options={options}>
        <div className={optionClass} style={heightStyle}>
          <img src={icon}/>
          {answerObject.content[props.language]}
        </div>

      </Hammer>
    )
  }
}

AnswerOption.propTypes = {
  language: PropTypes.string.isRequired,
  eyesFree: PropTypes.bool.isRequired,
  audioFunc: PropTypes.func.isRequired,
  audioFile: PropTypes.string.isRequired,
  answerObject: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onAnswerHover: PropTypes.func.isRequired,
  heightStyle: PropTypes.string.isRequired,
  nextQuestionId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default AnswerOption;
