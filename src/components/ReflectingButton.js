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


    var onTapFunc = props.onClicked;
    var onDoubleTapFunc = null;
    var onHoverFunc = null;
    var onPressUpFunc = null;


    if (props.eyesFree) {
      onTapFunc = null;
      onDoubleTapFunc = props.onClicked;
      onHoverFunc = props.eyesFreeHover;
      onPressUpFunc = props.eyesFreeRelease;
    }


    return (
      <Hammer  onTap={onTapFunc} onDoubleTap={onDoubleTapFunc} onPress={onHoverFunc} onPressUp={onPressUpFunc}  options={options}>
        <button value={audio} className={props.class}> <h4>{content}</h4> </button>
      </Hammer>
    );
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
