import React from 'react';
import PropTypes from 'prop-types';
import attractVideo from '../Assets/Video/AttractScreen_v01.mp4';

function Teleprompter(props) {
  if (props.content.videosrc){
    var videoFile = <video src={attractVideo} autoPlay loop type="video/mp4"/>
  }else{
    var videoFile = null;
  }

  return (
    <div className="content">
      <h1 className="teleprompter">{props.content.heading}</h1>
      <p>{props.content.paragraph}</p>
      {videoFile}
    </div>);
}

Teleprompter.propTypes = {
  content: PropTypes.object.isRequired
};

export default Teleprompter;
