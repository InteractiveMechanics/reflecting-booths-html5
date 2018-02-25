import React from 'react';

import PropTypes from 'prop-types';


  function Touchscreen(props) {



    return (
      <h1 className="touchscreen">{props.content.text}</h1>

    );
  }

  Touchscreen.propTypes = {
    content: PropTypes.object.isRequired
  };

  export default Touchscreen;
