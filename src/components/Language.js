import React from 'react';
import PropTypes from 'prop-types';

  function Language(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Language</h4> </button>
    );
  }

  Language.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Language;
