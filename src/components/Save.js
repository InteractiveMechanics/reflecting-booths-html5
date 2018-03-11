import React from 'react';
import PropTypes from 'prop-types';

  function Save(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>No, save video</h4> </button>
    );
  }

  Save.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Save;
