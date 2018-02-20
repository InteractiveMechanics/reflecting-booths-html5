import React from 'react';

import PropTypes from 'prop-types';

  function Teleprompter(props) {
    return (
      <h1 className="teleprompter">{props.content}</h1>
    );
  }

  Teleprompter.propTypes = {
    content: PropTypes.string.isRequired
  };

  export default Teleprompter;
