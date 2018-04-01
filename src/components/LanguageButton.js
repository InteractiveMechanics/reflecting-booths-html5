//a button with several classes and accessible options
import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import Fade from '../components/Fade';


  function LanguageButton(props) {
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
        <button value={audio} className={props.class} onClick={onTapFunc}>
          <Fade loop={true} array={props.array} />
        </button>
    );
  }

  LanguageButton.propTypes = {
    array: PropTypes.array.isRequired,
    onClicked: PropTypes.func,
    language: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    buttonData: PropTypes.object.isRequired,
    eyesFree: PropTypes.bool.isRequired,
    eyesFreeHover: PropTypes.func.isRequired,
    eyesFreeRelease: PropTypes.func.isRequired
  };

  export default LanguageButton;
