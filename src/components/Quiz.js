import React from 'react';
import AnswerOption from '../components/AnswerOptionRe';
import PropTypes from 'prop-types';

function Quiz(props) {
  function renderAnswerOptions(key) {
    //const answerText = key.content[props.language];

    let height = (400/props.answerOptions.length).toString();

    return (
      <AnswerOption
        key={key.content['english']}
        heightStyle={height}
        answerContent={key.content['english']}
        content={key.content}
        language={props.language}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        nextQuestionId={key.nextQuestionId}
        onAnswerSelected={props.onAnswerSelected}
        onAnswerHover={props.onAnswerHover}
        onEyesFreeRelease={props.onEyesFreeRelease}
        eyesFree={props.eyesFree}
        audioFunc={props.audioFunc}
        audioFile={key.audio}
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
    language: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.object.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    onAnswerHover: PropTypes.func.isRequired,
    onEyesFreeRelease: PropTypes.func.isRequired,
    eyesFree: PropTypes.bool.isRequired,
    audioFunc: PropTypes.func.isRequired
  };



  export default Quiz;
