import React from 'react';
import PropTypes from 'prop-types';

  function AnswerOption(props) {
    let content = props.content[props.language];
    let optionTextSize = '';
    let heightStyle = {
      height:props.heightStyle+"px"
    };

    if(content.length>30){
      optionTextSize = "option-size-2";
    }

    let optionClass = "answerOption " + optionTextSize;
    if (props.answerContent === props.answer){
      optionClass = "answerOption active " + optionTextSize;
    }

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
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {content}
        </label>
      </li>
    );
  }

  AnswerOption.propTypes = {
    language: PropTypes.string.isRequired,
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
