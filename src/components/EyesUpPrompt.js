import React from 'react';
import PropTypes from 'prop-types';


  function EyesUpPrompt(props) {



    return (
      <div className= "eyes-up">
      <h1>{props.content}</h1>
      </div>

    );
  }

  EyesUpPrompt.propTypes = {
    content: PropTypes.string.isRequired
  };

  export default EyesUpPrompt;
