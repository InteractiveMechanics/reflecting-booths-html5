import React from 'react';
import PropTypes from 'prop-types';

  function RecordButton(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Record</h4> </button>
    );
  }

  RecordButton.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default RecordButton;
