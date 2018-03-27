import React from 'react';
import PropTypes from 'prop-types';

function InputSuggestion(props) {


if (props.input.length == 0){
  return (
    <input value={props.content} className="suggestion" type="text" disabled/>
  )
} else{
  return null
}
}

InputSuggestion.propTypes = {
  content: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,

};

export default InputSuggestion;
