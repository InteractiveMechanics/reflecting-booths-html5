import React from 'react';
import AnswerOption from '../components/AnswerOption';
import PropTypes from 'prop-types';

function Quiz(props) {
  function renderAnswerOptions(key) {
    //const answerText = key.content[props.language];
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        nextQuestionId={key.nextQuestionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  return (

    <div key={props.questionId}>
      <ul className="answerOptions">
        {props.answerOptions.map(renderAnswerOptions)}
      </ul>
    </div>
);
}
  Quiz.propTypes = {
    //language: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    //counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
  };



  export default Quiz;
