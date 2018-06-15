import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-virtual-keyboard';
import Hammer from 'hammerjs';
import $ from 'jquery';



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
      changeInput: props.changeInputFunc
    };
    //this.appendToInput = this.appendToInput.bind(this);
  }




  componentDidMount() {

    this.keyboard.interface.keyaction.enter = (base) => {
    base.insertText('.com'); // textarea
    // Enter button pressed
    // Accepting content, as an example:
    //return this.keyboard.interface.keyaction.accept(base);
    };



    if (this.state.eyesFree) {


      //var buttons = ReactDOM.findDOMNode(this.keyboard).getElementsByTagName('button');
      // this.hammers = [];
      var buttons = this.keyboard;

      console.log(buttons);
      for (var i = 0; i < buttons.length; i++) {
          let char = buttons[i].getAttribute('data-value');
          let audioUrl = this.state.audio[char];
          //console.log(this.state.audio);
          // buttons[i].onmouseover = () => this.state.audioFunc(audioUrl); //set audio to url to play
          // buttons[i].onmouseleave = () => this.state.audioFunc(""); //set audio to empty string to stop
          buttons[i].onmouseover = null;
          buttons[i].onmouseleave = null;
          buttons[i].pointerDown = null;
          buttons[i].id = "buttons-" + i;

      }
    }
  //   if (this.state.eyesFree) {
  //
  //     //attach event listeners to each key
  //     var buttons = ReactDOM.findDOMNode(this.keyboard).getElementsByTagName('button');
  //     this.hammers = [];
  //     for (var i = 0; i < buttons.length; i++) {
  //         let char = buttons[i].getAttribute('data-value');
  //         let audioUrl = this.state.audio[char];
  //         //console.log(this.state.audio);
  //         buttons[i].onmouseover = () => this.state.audioFunc(audioUrl); //set audio to url to play
  //         buttons[i].onmouseleave = () => this.state.audioFunc(""); //set audio to empty string to stop
  //         buttons[i].removeEventListener("onclick", null, false);
  //         //buttons[i].removeEventListener("onclick", null, false);
  //         this.hammers[i] = Hammer(buttons[i]);
  //         this.hammers[i].on('doubletap', () => this.state.changeInput(char)
  //          // textarea
  //         // Enter button pressed
  //         // Accepting content, as an example:
  //         //return this.keyboard.interface.keyaction.accept(base);
  //       );   // remove ()
  //   }
  // }
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
  onChange: PropTypes.func.isRequired,
  audioData: PropTypes.object.isRequired,
  audioFunc: PropTypes.func.isRequired
};

export default ReactKeyboard;
