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

  let content = props.content[props.language];
  let optionTextSize = '';
  let heightStyle = {
    height:props.heightStyle+"px"
  };

  if(content.length>50){
    optionTextSize = "option-size-2";
  }



  let optionClass = "answerOption " + optionTextSize;
  if (props.answerContent === props.answer){
    optionClass = "answerOption active " + optionTextSize;
  }

  let icon = deselected;
  if (props.answerContent === props.answer) {
    icon = selected;
  }



  if (props.eyesFree) {
    return (
      <Hammer onTap={false} onDoubleTap={() => props.onAnswerSelected(props.content['english'], props.nextQuestionId)}   options={options}>
        <div className={optionClass} style={heightStyle} onMouseLeave={props.onEyesFreeRelease} onMouseOver={() => props.onAnswerHover(props.audioFile)}>
          <img src={icon}/>
          {content}
        </div>

      </Hammer>
    )
  } else {
    return (
      <Hammer onTap={() => props.onAnswerSelected(props.content['english'], props.nextQuestionId)} onDoubleTap={false} options={options}>
        <div className={optionClass} style={heightStyle}>
          <img src={icon}/>
          {content}
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
