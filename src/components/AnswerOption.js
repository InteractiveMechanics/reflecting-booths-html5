import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

  function AnswerOption(props) {
    //should import from state or global var
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


      if (props.eyesFree) {
        return (

            <li className={optionClass} style={heightStyle}>

              <input
                type="radio"
                className="radioCustomButton"
                name="radioGroup"
                checked={props.answerContent === props.answer}
                id={props.answerType}
                value={props.answerContent}
                onChange={props.onAnswerSelected}
                nextquestionid={props.nextQuestionId}
              />
              <label className="radioCustomLabel" htmlFor={props.answerContent}>
                {content}
              </label>

            </li>

        )
      } else {
        return (
          <Hammer  onTap={props.onAnswerSelected} options={options}>
            <li className={optionClass} style={heightStyle}>
              <input
                type="radio"
                className="radioCustomButton"
                name="radioGroup"
                checked={props.answerContent === props.answer}
                id={props.answerType}
                value={props.answerContent}
                onChange={props.onAnswerSelected}
                nextquestionid={props.nextQuestionId}
              />
              <label className="radioCustomLabel" htmlFor={props.answerType}>
                {content}
              </label>
            </li>
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
    content: PropTypes.object.isRequired,
    heightStyle: PropTypes.string.isRequired,
    nextQuestionId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  export default AnswerOption;
