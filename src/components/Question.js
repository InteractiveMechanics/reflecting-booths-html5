import React from 'react';
import PropTypes from 'prop-types';

  function Question(props) {
    return (
      <h2 className="question">{props.content[props.language]}</h2>
    );
  }

  Question.propTypes = {
    language: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
  };

  export default Question;
