import React from 'react';
import PropTypes from 'prop-types';

  function QuestionNext(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Continue</h4> </button>
    );
  }

  QuestionNext.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default QuestionNext;
