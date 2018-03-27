import React from 'react';
import PropTypes from 'prop-types';
import attractVideo from '../Assets/Video/AttractScreen_v01.mp4';
import recordVideo from '../Assets/Video/RecordingInstructions_v02.mp4';

function Teleprompter(props) {
  var videoFile;
  var heading;
  var paragraph;
  if (props.content.videosrc){
    videoFile = <video width="800" height="600" src={attractVideo} autoPlay loop type="video/mp4"/>
  }else if (props.content.recordvideo){
    videoFile = <video width="800" height="600" src={recordVideo} autoPlay type="video/mp4"/>
  }else{
    videoFile = null;
  };
  if (props.content.heading){
    heading = <h1 className="teleprompter">{props.content.heading[props.language]}</h1>
  } else{
    heading = null
  }
  if (props.content.paragraph){
    paragraph = <p>{props.content.paragraph[props.language]}</p>
  } else{
    paragraph = null
  }

  return (
    <div className="wrapper">
    <div className="content">
      {heading}
      {paragraph}

    </div>
    {videoFile}
  </div>);
}

Teleprompter.propTypes = {
  content: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default Teleprompter;
