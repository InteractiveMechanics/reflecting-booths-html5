import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-virtual-keyboard';
import Hammer from 'hammerjs';



class ReactKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      layout: props.layout,
      eyesFree: props.eyesFree,
      onChange: props.onChange,
      audio: props.audioData,
      audioFunc: props.audioFunc,
      eyesFreeOnChange: props.eyesFreeOnChange,
      autoCaps: props.autoCaps
    };
  }




  componentDidMount() {

    this.keyboard.interface.keyaction.enter = (base) => {
    base.insertText('.com'); // textarea
    };

    //remove autospellcheck
    this.input = ReactDOM.findDOMNode(this.keyboard).getElementsByTagName('input');
    this.input[0].setAttribute("spellCheck", "false");

    //below for eyes free
    if (this.state.eyesFree) {

      //attach event listeners to each key
      this.buttons = ReactDOM.findDOMNode(this.keyboard).getElementsByTagName('button');
      this.hammers = [];
      for (var i = 0; i < this.buttons.length; i++) {
          let char = this.buttons[i].getAttribute('data-value');
          let audioUrl = this.state.audio[char];
          this.buttons[i].onmouseover = () => this.state.audioFunc(audioUrl); //set audio to url to play
          this.buttons[i].onmouseleave = () => this.state.audioFunc(""); //set audio to empty string to stop
          this.buttons[i].onmouseup = () => this.state.audioFunc("");
          //add double tap input
          this.hammers[i] = Hammer(this.buttons[i]);
          this.hammers[i].on('doubletap', () => this.state.eyesFreeOnChange(char));
        }
      }

  }


  componentWillUnmount() {
    //remove manually added event listeners
    if (this.state.eyesFree) {
      for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].onmouseover = null;
          this.buttons[i].onmouseleave = null;
          this.buttons[i].onmouseup = null;
          //remove doubletap event listener
          this.hammers[i].off('doubletap');
    }
  }
}






  onInputAccepted() {
  console.log("accept");
  }



  render() {
    let onChangeFunc = this.state.onChange;
    if (this.state.eyesFree) {
    }
    return (
      <Keyboard
        value={this.state.value}
        name='keyboard'
        options={{
          type:"input",
          layout : 'custom',
          customLayout: this.state.layout,
          alwaysOpen: true,
          usePreview: false,
          useWheel: false,
          stickyShift: false,
          appendLocally: true,
          color: "light",
          updateOnChange: false,
          initialFocus: true,
          useCombos: true,
          display: {
            "bksp" : "\u2190",
            "enter" : ".com"
          }
        }}
        onChange={onChangeFunc}
        ref={k => this.keyboard = k}
      />

    );
  }

}

ReactKeyboard.propTypes = {
  input: PropTypes.string,
  layout: PropTypes.object,
  eyesFree: PropTypes.bool,
  eyesFreeOnChange: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  audioData: PropTypes.object.isRequired,
  audioFunc: PropTypes.func.isRequired,
  autoCaps: PropTypes.bool
};

export default ReactKeyboard;
