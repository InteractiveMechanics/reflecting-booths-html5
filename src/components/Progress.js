import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: props.currentState,
      currentLanguage: props.language
    };
  }


  componentDidMount() {
  }


  render() {
    var homeStyle = 'light-line';
    var aboutStyle = 'light-line';
    var questionsStyle = 'light-line';
    var recordStyle = 'light-line';
    var submitStyle = 'light-line';
    var homeFill = 'rgba(255,255,255,0.5)';
    var aboutFill = 'rgba(255,255,255,0.5)';
    var questionsFill = 'rgba(255,255,255,0.5)';
    var recordFill = 'rgba(255,255,255,0.5)';
    var submitFill = 'rgba(255,255,255,0.5)';

    // if (props.currentState === 'home'){
    //   homeFill = 'rgba(255,255,255,1)';
    // }
    // if (props.currentState === 'about'){
    //   aboutFill = 'rgba(255,255,255,1)';
    // }
    // if (props.currentState === 'questions'){
    //   questionsFill = 'rgba(255,255,255,1)';
    // }
    // if (props.currentState === 'record'){
    //   recordFill = 'rgba(255,255,255,1)';
    // }
    // if (props.currentState === 'end'){
    //   submitFill = 'rgba(255,255,255,1)';
    // }

    switch (this.props.currentState) {

      case 'attract':
      case 'welcome':
      case 'language':
          homeFill = 'rgba(255,255,255,1)';
          homeStyle = 'white-line';
          break;
      case 'about-1':
      case 'about-2':
          homeFill = 'rgba(33, 177, 231, 1)';
          homeStyle = 'blue-line';
          aboutFill = 'rgba(255,255,255,1)';
          aboutStyle = 'white-line';
          break;
      case 'questions':
      homeFill = 'rgba(33, 177, 231, 1)';
      homeStyle = 'blue-line';
      aboutFill = 'rgba(33, 177, 231, 1)';
      aboutStyle = 'blue-line';
      questionsFill = 'rgba(255,255,255,1)';
      questionsStyle = 'white-line';
          break;
      case 'record-intro-1':
      case 'record-intro-2':
      case 'recording':
      case 'review':
      homeFill = 'rgba(33, 177, 231, 1)';
      homeStyle = 'blue-line';
      aboutFill = 'rgba(33, 177, 231, 1)';
      aboutStyle = 'blue-line';
      questionsFill = 'rgba(33, 177, 231, 1)';
      questionsStyle = 'blue-line';
      recordFill = 'rgba(255,255,255,1)';
      recordStyle = 'white-line';
          break;
      case 'user-agreement':
      case 'user-agreement-warning':
      case 'first-name':
      case 'last-name':
      case 'email':
      case 'location':
      case 'age':
      case 'end':
      homeFill = 'rgba(33, 177, 231, 1)';
      homeStyle = 'blue-line';
      aboutFill = 'rgba(33, 177, 231, 1)';
      aboutStyle = 'blue-line';
      questionsFill = 'rgba(33, 177, 231, 1)';
      questionsStyle = 'blue-line';
      recordFill = 'rgba(33, 177, 231, 1)';
      recordStyle = 'blue-line';
      submitFill = 'rgba(255,255,255,1)';
      submitStyle = 'white-line';
          break;
      default:
    }

    var content = this.props.content;
    var language = this.props.language;

//
  return (
      <ul className="progressbar">
          <li className={homeStyle}><h3>{content.home[language]}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26.4 25.7">
              <g id="progBar-home" transform="translate(-4632.935 1376.255)">
          	    <path id="Path_237" fill={homeFill} d="M4655.3-1350.5h-18.5v-12.5l9.4-7.9l9.1,7.9V-1350.5z M4643.3-1363v8.9h5.5v-8.9H4643.3z"/>
          	    <polygon fill={homeFill} points="4634.9,-1362.7 4632.9,-1365 4646.1,-1376.3 4659.3,-1365 4657.4,-1362.7 4646.1,-1372.3 	"/>
              </g>
            </svg>
          </li>
          <li className={aboutStyle}><h3>{content.about[language]}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-7261 444 24.466 24.466">
                <path id="progBar-about" fill={aboutFill} d="M12.233,0A12.233,12.233,0,1,0,24.466,12.233,12.217,12.217,0,0,0,12.233,0Zm-.408,5.056A2.039,2.039,0,1,1,9.787,7.1,2.019,2.019,0,0,1,11.825,5.056ZM15.658,19.41H8.889v-.734H10.6c.408,0,.326-1.142.326-1.142V13.212a1.829,1.829,0,0,0-1.876-2.12v-.816H13.62v7.177s-.082,1.142.326,1.142h1.713Z" transform="translate(-7261 444)"/>
            </svg>
          </li>
          <li className={questionsStyle}><h3>{content.questions[language]}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-7089 444 24.466 24.466">
              <path id="progBar-questions" fill={questionsFill} d="M2672.233,806.467a12.217,12.217,0,1,1,8.655-3.578A12.157,12.157,0,0,1,2672.233,806.467Zm-2.316-6.425v3.424h3.35v-3.424Zm2.1-11.5c1.746,0,2.875.932,2.875,2.375v.049a2.222,2.222,0,0,1-1.122,1.972,7.25,7.25,0,0,1-3.5.828l-.125.124.5,4.05h2.025l.25-2.025c2.293-.392,5.025-1.585,5.025-5.05v-.049c0-3.083-2.3-5.075-5.85-5.075a7.642,7.642,0,0,0-6.025,2.775l1.875,2A5.417,5.417,0,0,1,2672.016,788.541Z" transform="translate(-9749 -338)"/>
            </svg>
          </li>
          <li className={recordStyle}><h3>{content.record[language]}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-6916 449 30 14.9">
              <path id="progBar-record" fill={recordFill} d="M27.2,2.5,24.3,5.4H22.9V1.7A1.685,1.685,0,0,0,21.2,0H4.8A1.685,1.685,0,0,0,3.1,1.7V3H1.3V1.7H0V7.9H1.3V6.6H3.1v6.6a1.685,1.685,0,0,0,1.7,1.7H21.1a1.685,1.685,0,0,0,1.7-1.7V9.1h1.6l2.7,2.7H30V2.5Z" transform="translate(-6916 449)"/>
            </svg>
          </li>
          <li className={submitStyle}><h3>{content.submit[language]}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-6738 443 24.21 27">
              <path id="progBar-save" fill={submitFill} d="M24.21,24.39V0H0V24.39H8.64V22.14H2.79V5.4H5.94l1.8-1.8h8.64l1.8,1.8h3.15V22.23H15.84v2.25h8.37ZM6.39,15.84H9.27V27H15.3V15.84h2.88L12.33,9.9Z" transform="translate(-6738 443)"/>
            </svg>
          </li>
        </ul>
    )
  }
}

Progress.propTypes = {
  currentState: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default Progress;
