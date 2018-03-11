import React from 'react';
import PropTypes from 'prop-types';

  function Agree(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>I Agree</h4> </button>
    );
  }

  Agree.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Agree;
