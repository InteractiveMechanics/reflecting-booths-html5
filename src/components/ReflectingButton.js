//a button with several classes and accessible options
import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';


  function ReflectingButton(props) {
    // Hammer options
    var options = {
        touchAction:'compute',
        recognizers: {
            tap: {
                time: 600,
                threshold: 100
            },
            press: {
                time: 600,
                threshold: 100
            }
        }
    };
    var content = props.buttonData.text[props.language];
    var audio = props.buttonData.audio;


    if (props.eyesFree) {
      return (
        <Hammer  onDoubleTap={props.onClicked} onPress={props.eyesFreeHover} onPressUp={props.eyesFreeRelease}  options={options}>
          <button value={audio} className={props.class}> <h4>{content}</h4><div className="toggle"></div> </button>
        </Hammer>
      )
    } else {
      return (
        <Hammer  onTap={props.onClicked} options={options}>
          <button className={props.class}> <h4>{content}</h4><div className="toggle"></div> </button>
        </Hammer>
      )
    }
  }

  ReflectingButton.propTypes = {
    onClicked: PropTypes.func,
    language: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    buttonData: PropTypes.object.isRequired,
    eyesFree: PropTypes.bool.isRequired,
    eyesFreeHover: PropTypes.func.isRequired,
    eyesFreeRelease: PropTypes.func.isRequired
  };

  export default ReflectingButton;
