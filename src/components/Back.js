import React from 'react';
import PropTypes from 'prop-types';

  function Back(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Back</h4> </button>
    );
  }

  Back.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Back;
