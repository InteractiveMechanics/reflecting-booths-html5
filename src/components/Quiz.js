import React from 'react';
import AnswerOption from '../components/AnswerOption';
import PropTypes from 'prop-types';

function Quiz(props) {
  let filteredAnswerOptions = props.answerOptions;
  if(props.questionId === 4){
    filteredAnswerOptions = [];
    for (var i = 0; i < props.answerOptions.length; i++){
      if (props.answerOptions[i].active){
        filteredAnswerOptions.push(props.answerOptions[i]);
      }
    }
    console.log(filteredAnswerOptions);
  }



  function renderAnswerOptions(key) {

    let height = (400/filteredAnswerOptions.length).toString();

    return (
      <AnswerOption
        key={key.content['english']}
        heightStyle={height}
        language={props.language}
        answerObject={key}
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
        {filteredAnswerOptions.map(renderAnswerOptions)}
      </ul>
    </div>
);
}
  Quiz.propTypes = {
    language: PropTypes.string.isRequired,
    answer: PropTypes.object.isRequired,
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
