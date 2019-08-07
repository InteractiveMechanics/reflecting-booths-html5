import React from 'react';
import PropTypes from 'prop-types';

function InputSuggestion(props) {


if (props.content){
  return (
    <input value={props.content} className={props.class} type="text" disabled/>
  )
} else{
  return null
}
}

InputSuggestion.propTypes = {
  content: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired
};

export default InputSuggestion;
