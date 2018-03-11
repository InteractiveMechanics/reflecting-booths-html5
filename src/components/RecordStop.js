import React from 'react';
import PropTypes from 'prop-types';

  function RecordStop(props) {
    return (
      <div>

        <button className={props.class} onClick={props.onClicked}>  <h4>Touch anywhere to stop recording</h4>  </button>
    </div>

    );
  }

  RecordStop.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default RecordStop;
