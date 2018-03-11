import React from 'react';
import PropTypes from 'prop-types';

  function Delete(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Yes, delete</h4> </button>
    );
  }

  Delete.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Delete;
