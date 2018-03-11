import React from 'react';
import PropTypes from 'prop-types';

  function RecordAgain(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>{props.textContent}</h4> </button>
    );
  }

  RecordAgain.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired
  };

  export default RecordAgain;
