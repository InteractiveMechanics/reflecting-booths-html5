import React from 'react';
import PropTypes from 'prop-types';

  function Home(props) {
    return (
        <button className={props.class} onClick={props.onClicked}> <h4>Home</h4> </button>
    );
  }

  Home.propTypes = {
    onClicked: PropTypes.func.isRequired,
    class: PropTypes.string.isRequired
  };

  export default Home;
