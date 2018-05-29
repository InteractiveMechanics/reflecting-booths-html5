import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-virtual-keyboard';


class ReactKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      layout: props.layout,
      eyesFree: props.eyesFree,
      onInputChanged: props.onChange,
      audio: props.audioData,
      audioFunc: props.audioFunc
    };
  }


  componentDidMount() {

    this.keyboard.interface.keyaction.enter = (base) => {
    base.insertText('.com'); // textarea
    // Enter button pressed
    // Accepting content, as an example:
    //return this.keyboard.interface.keyaction.accept(base);
    };


    if (this.state.eyesFree) {

      //attach event listeners to each key
      var buttons = ReactDOM.findDOMNode(this.keyboard).getElementsByTagName('button');
      for (var i = 0; i < buttons.length; i++) {
          let char = buttons[i].getAttribute('data-value');
          let audioUrl = this.state.audio[char];
          //console.log(this.state.audio);
          buttons[i].onmouseover = () => this.state.audioFunc(audioUrl); //set audio to url to play
          buttons[i].onmouseleave = () => this.state.audioFunc(""); //set audio to empty string to stop
    }
  }
}





  onInputAccepted () {
  console.log("accept");
  }

  render() {
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
          updateOnChange: true,
          initialFocus: true,
          display: {
            "bksp" : "\u2190",
            "enter" : ".com"
          }
        }}
        onChange={this.state.onInputChanged}
        ref={k => this.keyboard = k}
      />

    );
  }

}

ReactKeyboard.propTypes = {
  input: PropTypes.string,
  layout: PropTypes.object,
  eyesFree: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  audioData: PropTypes.object.isRequired,
  audioFunc: PropTypes.func.isRequired
};

export default ReactKeyboard;
