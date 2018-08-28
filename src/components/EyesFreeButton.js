//a button with several classes and accessible options
import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';


  function EyesFreeButton(props) {
    // Hammer options
    var options = {
        touchAction:'compute',
        recognizers: {
            tap: {
              enable: true
            },
            press: {
                time: 600,
                threshold: 100
            }
        }
    };

    if (props.eyesFree){
      options = {
          touchAction:'compute',
          recognizers: {
              tap: {
                  enable: false
              },
              press: {
                  time: 600,
                  threshold: 100
              }
          }
      };
    }
    var content = props.buttonData.text[props.language];
    var audio = props.buttonData.audio;

      return (
        <Hammer  onDoubleTap={props.onClicked} onPress={props.eyesFreeHover} onPressUp={props.eyesFreeRelease}  options={options}>
          <button value={audio} className={props.class}> <h4>{content}</h4><div className="toggle"></div> </button>
        </Hammer>
      )
  }

  EyesFreeButton.propTypes = {
    onClicked: PropTypes.func,
    language: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    buttonData: PropTypes.object.isRequired,
    eyesFree: PropTypes.bool.isRequired,
    eyesFreeHover: PropTypes.func.isRequired,
    eyesFreeRelease: PropTypes.func.isRequired
  };

  export default EyesFreeButton;
