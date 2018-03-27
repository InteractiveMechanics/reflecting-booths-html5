import React from 'react';
import PropTypes from 'prop-types';

function InputSuggestion(props) {



  return (
    <input value={props.content} className="suggestion" type="text" disabled/>
  )
}

InputSuggestion.propTypes = {
  content: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
};

export default InputSuggestion;
