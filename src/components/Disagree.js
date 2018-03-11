import React from 'react';
import PropTypes from 'prop-types';

  function Disagree(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>I Don't Agree</h4> </button>
    );
  }

  Disagree.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Disagree;
