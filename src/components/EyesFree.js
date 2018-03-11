import React from 'react';
import PropTypes from 'prop-types';

  function EyesFree(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Eyes-Free</h4> </button>
    );
  }

  EyesFree.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default EyesFree;
