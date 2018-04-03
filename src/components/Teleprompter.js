import React from 'react';
import PropTypes from 'prop-types';
import attractVideo from '../Assets/Video/AttractScreen_v01.mp4';
import recordVideo from '../Assets/Video/RecordingInstructions_v02.mp4';

function Teleprompter(props) {
  let videoFile;
  let heading;
  let paragraph;
  let contentClass = "content";
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
    contentClass = "content tele-center";
  }

  let content = <div className={contentClass}>
    {heading}
    {paragraph}
  </div>

  if (!heading && !paragraph){
    content = null;
  }


  return (
    <div className="wrapper">
      {content}
    {videoFile}
  </div>);
}

Teleprompter.propTypes = {
  content: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default Teleprompter;
