import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import selected from '../Assets/icon-selected.png';
import deselected from '../Assets/icon-deselected.png';

function AnswerOptionYesNo(props) {
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
    height:'200px'
  };

  let optionClass = "answerOption " + optionTextSize;
  let icon = deselected;
  if (answerObject === props.answer){
    optionClass = "answerOption active " + optionTextSize;
    icon = selected;
  }

  if (props.eyesFree) {
    return (
      <Hammer onTap={false} onDoubleTap={() => props.onYesNoSelected(answerObject)}   options={options}>
        <div className={optionClass} style={heightStyle} onMouseLeave={props.onEyesFreeRelease} onMouseOver={() => props.onAnswerHover(props.audioFile)}>
          <img alt={icon} src={icon}/>
          {answerObject[props.language]}
        </div>

      </Hammer>
    )
  } else {
    return (
      <Hammer onTap={() => props.onYesNoSelected(answerObject)} onDoubleTap={false} options={options}>
        <div className={optionClass} style={heightStyle}>
          <img alt={icon} src={icon}/>
          {answerObject[props.language]}
        </div>

      </Hammer>
    )
  }
}

AnswerOptionYesNo.propTypes = {
  language: PropTypes.string.isRequired,
  eyesFree: PropTypes.bool.isRequired,
  audioFunc: PropTypes.func.isRequired,
  audioFile: PropTypes.string.isRequired,
  answerObject: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  onYesNoSelected: PropTypes.func.isRequired,
  onAnswerHover: PropTypes.func.isRequired
};

export default AnswerOptionYesNo;
